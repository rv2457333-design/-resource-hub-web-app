import { Injectable, inject, signal, computed, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, catchError, of, map } from 'rxjs';
import { Book, Category, HubStats, ContactMessage, ApiResponse } from '../models/book.model';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  // Reactive State Signals
  readonly books = signal<Book[]>([]);
  readonly categories = signal<Category[]>([]);
  readonly stats = signal<HubStats | null>(null);
  readonly isLoading = signal<boolean>(false);
  readonly searchQuery = signal<string>('');
  readonly selectedCategory = signal<string>('all');
  readonly selectedSort = signal<string>('popular');

  // Bookmarks / Saved Books
  readonly savedBookIds = signal<string[]>([]);

  // Reader Modal State
  readonly activeReaderBook = signal<Book | null>(null);

  // Contribute Modal State
  readonly isAddBookModalOpen = signal<boolean>(false);

  // Toast System
  readonly toasts = signal<ToastMessage[]>([]);

  // Computed signals
  readonly savedBooks = computed(() => {
    const ids = new Set(this.savedBookIds());
    return this.books().filter((b) => ids.has(b.id));
  });

  readonly savedCount = computed(() => this.savedBookIds().length);

  constructor() {
    this.initSavedBooksFromStorage();
  }

  private initSavedBooksFromStorage(): void {
    if (this.isBrowser) {
      try {
        const stored = localStorage.getItem('scholarhub_saved_books');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            this.savedBookIds.set(parsed);
          }
        }
      } catch (e) {
        console.warn('Could not read saved books from storage', e);
      }
    }
  }

  private syncSavedBooksToStorage(ids: string[]): void {
    if (this.isBrowser) {
      try {
        localStorage.setItem('scholarhub_saved_books', JSON.stringify(ids));
      } catch (e) {
        console.warn('Could not save books to storage', e);
      }
    }
  }

  // Toast methods
  showToast(message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success'): void {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    const newToast: ToastMessage = { id, type, message };
    this.toasts.update((current) => [...current, newToast]);

    if (this.isBrowser) {
      setTimeout(() => {
        this.dismissToast(id);
      }, 4000);
    }
  }

  dismissToast(id: string): void {
    this.toasts.update((current) => current.filter((t) => t.id !== id));
  }

  // Reader Modal
  openReader(book: Book): void {
    this.activeReaderBook.set(book);
  }

  closeReader(): void {
    this.activeReaderBook.set(null);
  }

  // Contribute Modal
  openAddBookModal(): void {
    this.isAddBookModalOpen.set(true);
  }

  closeAddBookModal(): void {
    this.isAddBookModalOpen.set(false);
  }

  // Bookmark Toggle
  toggleBookmark(bookId: string): void {
    const current = this.savedBookIds();
    let updated: string[];
    if (current.includes(bookId)) {
      updated = current.filter((id) => id !== bookId);
      this.showToast('Resource removed from your library', 'info');
    } else {
      updated = [...current, bookId];
      this.showToast('Resource saved to your study library!', 'success');
    }
    this.savedBookIds.set(updated);
    this.syncSavedBooksToStorage(updated);
  }

  isBookmarked(bookId: string): boolean {
    return this.savedBookIds().includes(bookId);
  }

  // API Calls
  fetchCategories(): Observable<Category[]> {
    return this.http.get<ApiResponse<Category[]>>('/api/categories').pipe(
      map((res) => res.data),
      tap((cats) => this.categories.set(cats)),
      catchError((err) => {
        console.error('Error fetching categories:', err);
        return of([]);
      })
    );
  }

  fetchBooks(options?: { category?: string; q?: string; sort?: string; featured?: boolean }): Observable<Book[]> {
    this.isLoading.set(true);
    let params = new HttpParams();

    const cat = options?.category ?? this.selectedCategory();
    if (cat && cat !== 'all') {
      params = params.set('category', cat);
    }

    const query = options?.q ?? this.searchQuery();
    if (query && query.trim()) {
      params = params.set('q', query.trim());
    }

    const sort = options?.sort ?? this.selectedSort();
    if (sort) {
      params = params.set('sort', sort);
    }

    if (options?.featured) {
      params = params.set('featured', 'true');
    }

    return this.http.get<ApiResponse<Book[]>>('/api/books', { params }).pipe(
      map((res) => res.data),
      tap((bookList) => {
        this.books.set(bookList);
        this.isLoading.set(false);
      }),
      catchError((err) => {
        console.error('Error fetching books:', err);
        this.isLoading.set(false);
        return of([]);
      })
    );
  }

  getBookById(id: string): Observable<{ book: Book; related: Book[] } | null> {
    this.isLoading.set(true);
    return this.http.get<ApiResponse<Book>>(`/api/books/${id}`).pipe(
      map((res) => {
        this.isLoading.set(false);
        if (res.success && res.data) {
          return { book: res.data, related: res.related || [] };
        }
        return null;
      }),
      catchError((err) => {
        console.error(`Error fetching book ${id}:`, err);
        this.isLoading.set(false);
        return of(null);
      })
    );
  }

  fetchStats(): Observable<HubStats | null> {
    return this.http.get<ApiResponse<HubStats>>('/api/stats').pipe(
      map((res) => res.data),
      tap((statsData) => this.stats.set(statsData)),
      catchError((err) => {
        console.error('Error fetching stats:', err);
        return of(null);
      })
    );
  }

  downloadBook(book: Book): Observable<{ success: boolean; downloadUrl: string }> {
    return this.http.post<{ success: boolean; downloads: number; downloadUrl: string }>(
      `/api/books/${book.id}/download`,
      {}
    ).pipe(
      tap((res) => {
        // Update local book download counter
        this.books.update((list) =>
          list.map((b) => (b.id === book.id ? { ...b, downloads: res.downloads } : b))
        );
        this.showToast(`Starting PDF download for "${book.title}"...`, 'success');
        
        // Trigger synthetic download simulation file for student convenience
        if (this.isBrowser) {
          this.triggerSamplePdfDownload(book);
        }
      }),
      catchError((err) => {
        console.error('Error downloading book:', err);
        this.showToast('Download service temporarily offline. Please try again.', 'error');
        return of({ success: false, downloadUrl: '' });
      })
    );
  }

  private triggerSamplePdfDownload(book: Book): void {
    const textContent = `==========================================================
SCHOLARHUB ACADEMIC RESOURCE ARCHIVE
College Engineering & Computer Science Department
==========================================================

Title: ${book.title}
Author(s): ${book.author}
Category: ${book.categoryName} (${book.semester})
Edition: ${book.edition}
Pages: ${book.pages} | ISBN: ${book.isbn}
Verified Hub Downloads: ${book.downloads}

----------------------------------------------------------
ACADEMIC OVERVIEW
----------------------------------------------------------
${book.longDescription}

----------------------------------------------------------
CORE SYLLABUS TOPICS
----------------------------------------------------------
${book.keyTopics.map((topic, i) => `  ${i + 1}. ${topic}`).join('\n')}

----------------------------------------------------------
CURATED CHAPTER STUDY EXTRACTS
----------------------------------------------------------
${book.chapters.map(ch => `
CHAPTER ${ch.number}: ${ch.title}
Summary: ${ch.summary}
${ch.codeSnippet ? `Key Code Snippet:\n${ch.codeSnippet}` : ''}
`).join('\n')}

----------------------------------------------------------
QUICK REVISION NOTES & EXAM TIPS
----------------------------------------------------------
${book.sampleContent.quickRevisionNotes.map((note, idx) => `[Point ${idx + 1}] ${note}`).join('\n')}

==========================================================
Downloaded from ScholarHub Mini Bookstore & Resource Hub
For Academic & Educational Reference Only.
==========================================================`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${book.title.replace(/[^a-zA-Z0-9]/g, '_')}_StudyPack.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  addBook(bookData: Partial<Book>): Observable<ApiResponse<Book>> {
    return this.http.post<ApiResponse<Book>>('/api/books', bookData).pipe(
      tap((res) => {
        if (res.success && res.data) {
          this.books.update((list) => [res.data, ...list]);
          this.showToast('Resource published to ScholarHub catalog!', 'success');
          this.fetchCategories().subscribe();
          this.fetchStats().subscribe();
        }
      }),
      catchError((err) => {
        console.error('Error adding book:', err);
        this.showToast('Failed to add resource. Please verify fields.', 'error');
        throw err;
      })
    );
  }

  submitContact(msg: ContactMessage): Observable<ApiResponse<ContactMessage>> {
    return this.http.post<ApiResponse<ContactMessage>>('/api/contact', msg).pipe(
      tap((res) => {
        if (res.success) {
          this.showToast('Inquiry received! The student resource team will review it.', 'success');
        }
      }),
      catchError((err) => {
        console.error('Error submitting contact form:', err);
        this.showToast('Failed to send message. Please try again.', 'error');
        throw err;
      })
    );
  }
}
