import { ChangeDetectionStrategy, Component, inject, OnInit, signal, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, MatIconModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      <!-- Back Navigation Breadcrumb -->
      <nav class="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <a routerLink="/" class="hover:text-indigo-600 transition-colors flex items-center gap-1">
          <mat-icon class="text-xs">arrow_back</mat-icon> Books Catalog
        </a>
        <span>/</span>
        <a routerLink="/categories" class="hover:text-indigo-600 transition-colors">
          {{ book()?.categoryName || 'Subject' }}
        </a>
        <span>/</span>
        <span class="text-slate-800 truncate max-w-xs">{{ book()?.title }}</span>
      </nav>

      @if (isLoading()) {
        <div class="py-24 flex flex-col items-center justify-center text-slate-400 space-y-3">
          <mat-icon class="animate-spin text-3xl text-indigo-600">rotate_right</mat-icon>
          <p class="text-sm font-medium">Loading textbook syllabus & details...</p>
        </div>
      } @else if (book(); as b) {
        
        <!-- Book Details Hero Container -->
        <div class="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            <!-- Left Column: Book Cover Image & Quick Details -->
            <div class="lg:col-span-5 flex flex-col items-center">
              <div class="relative w-full max-w-sm aspect-4/5 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-100 group">
                <img
                  [src]="b.coverImage"
                  [alt]="b.title"
                  referrerpolicy="no-referrer"
                  class="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                />
                
                <!-- Free / Price Badge -->
                <div class="absolute top-4 right-4">
                  @if (b.price === 0) {
                    <span class="px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide rounded-xl bg-emerald-500 text-white shadow-md">
                      Free PDF
                    </span>
                  } @else {
                    <span class="px-3 py-1.5 text-xs font-extrabold rounded-xl bg-amber-500 text-white shadow-md">
                      \${{ b.price }}
                    </span>
                  }
                </div>

                <!-- Academic Seal -->
                <div class="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md rounded-xl p-3 text-white flex items-center justify-between text-xs">
                  <div class="flex items-center gap-1.5">
                    <mat-icon class="text-indigo-400 text-sm">verified</mat-icon>
                    <span class="font-semibold">{{ b.semester }}</span>
                  </div>
                  <span class="text-2xs text-slate-300 font-mono">{{ b.isbn }}</span>
                </div>
              </div>

              <!-- Quick Spec Tags Below Cover -->
              <div class="grid grid-cols-3 gap-2 w-full max-w-sm mt-5">
                <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span class="block text-2xs text-slate-400 font-medium">Pages</span>
                  <span class="text-xs font-bold text-slate-800">{{ b.pages }}</span>
                </div>
                <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span class="block text-2xs text-slate-400 font-medium">Downloads</span>
                  <span class="text-xs font-bold text-slate-800">{{ b.downloads }}</span>
                </div>
                <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span class="block text-2xs text-slate-400 font-medium">Year</span>
                  <span class="text-xs font-bold text-slate-800">{{ b.publishedYear }}</span>
                </div>
              </div>
            </div>

            <!-- Right Column: Title, Author, Bio, Actions -->
            <div class="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div class="space-y-4">
                
                <!-- Category & Edition Badges -->
                <div class="flex flex-wrap items-center gap-2">
                  <span class="px-3 py-1 text-xs font-bold uppercase rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {{ b.categoryName }}
                  </span>
                  <span class="px-3 py-1 text-xs font-medium rounded-lg bg-slate-100 text-slate-600">
                    {{ b.edition }}
                  </span>
                  <span class="px-3 py-1 text-xs font-medium rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {{ b.format }}
                  </span>
                </div>

                <!-- Book Title -->
                <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
                  {{ b.title }}
                </h1>

                <!-- Author & Ratings Strip -->
                <div class="flex flex-wrap items-center gap-4 text-sm text-slate-600 pb-2 border-b border-slate-100">
                  <div class="font-medium text-slate-800 flex items-center gap-1.5">
                    <mat-icon class="text-base text-slate-400">person</mat-icon>
                    <span>{{ b.author }}</span>
                  </div>
                  <span class="text-slate-300">•</span>
                  <div class="flex items-center gap-1 text-amber-500 font-bold">
                    <mat-icon class="text-base text-amber-400">star</mat-icon>
                    <span>{{ b.rating }}</span>
                    <span class="text-slate-400 font-normal">({{ b.reviewCount }} verified student reviews)</span>
                  </div>
                </div>

                <!-- Primary Description -->
                <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {{ b.longDescription }}
                </p>

                <!-- High Yield Topics Pill List -->
                <div>
                  <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Key Modules Covered:</h4>
                  <div class="flex flex-wrap gap-1.5">
                    @for (topic of b.keyTopics; track topic) {
                      <span class="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 text-slate-700 border border-slate-200/60">
                        {{ topic }}
                      </span>
                    }
                  </div>
                </div>

              </div>

              <!-- ACTION BUTTONS: Read Online & Download PDF -->
              <div class="pt-6 border-t border-slate-100 space-y-3">
                <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  
                  <!-- Read Online Action Button -->
                  <button
                    type="button"
                    (click)="bookService.openReader(b)"
                    class="flex-1 py-3 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold text-sm shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer">
                    <mat-icon class="text-base">menu_book</mat-icon>
                    <span>Read Online / Preview</span>
                  </button>

                  <!-- Download PDF Action Button -->
                  <button
                    type="button"
                    (click)="bookService.downloadBook(b)"
                    class="flex-1 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-sm shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer">
                    <mat-icon class="text-base">download</mat-icon>
                    <span>Download PDF Notes</span>
                  </button>

                  <!-- Save / Bookmark Button -->
                  <button
                    type="button"
                    (click)="bookService.toggleBookmark(b.id)"
                    [title]="bookService.isBookmarked(b.id) ? 'Remove from Saved' : 'Save Book'"
                    class="p-3 rounded-xl border border-slate-200 text-slate-700 hover:text-rose-600 hover:bg-rose-50 transition-colors flex items-center justify-center">
                    <mat-icon [class.text-rose-500]="bookService.isBookmarked(b.id)">
                      {{ bookService.isBookmarked(b.id) ? 'bookmark' : 'bookmark_border' }}
                    </mat-icon>
                  </button>

                </div>

                <p class="text-2xs text-slate-400 text-center sm:text-left flex items-center justify-center sm:justify-start gap-1">
                  <mat-icon class="text-xs text-slate-400">lock_open</mat-icon> Verified university open access. Includes lecture extracts, diagrams & solved code.
                </p>
              </div>

            </div>

          </div>
        </div>

        <!-- Detailed Syllabus & Chapter Breakdown -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Chapters List -->
          <div class="lg:col-span-2 space-y-6">
            <div class="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
              <div class="border-b border-slate-100 pb-4">
                <h3 class="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <mat-icon class="text-indigo-600">format_list_bulleted</mat-icon>
                  Syllabus Breakdown & Lecture Notes
                </h3>
                <p class="text-xs text-slate-500 mt-1">Structured modules prepared in line with college curriculum guidelines.</p>
              </div>

              <div class="space-y-4">
                @for (chapter of b.chapters; track chapter.number) {
                  <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div class="flex items-center justify-between">
                      <span class="text-2xs font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                        Module {{ chapter.number }}
                      </span>
                      <button
                        type="button"
                        (click)="bookService.openReader(b)"
                        class="text-xs text-indigo-600 hover:underline font-semibold flex items-center gap-1">
                        Read Module <mat-icon class="text-xs">arrow_forward</mat-icon>
                      </button>
                    </div>
                    <h4 class="text-base font-bold text-slate-900">{{ chapter.title }}</h4>
                    <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">{{ chapter.summary }}</p>
                    
                    @if (chapter.codeSnippet) {
                      <pre class="bg-slate-900 text-emerald-400 p-3 rounded-xl text-2xs sm:text-xs font-mono overflow-x-auto"><code>{{ chapter.codeSnippet }}</code></pre>
                    }
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Right Sidebar: Exam Tips & Quick Revision -->
          <div class="space-y-6">
            <div class="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
              <h3 class="text-lg font-bold text-slate-900 flex items-center gap-2">
                <mat-icon class="text-amber-500">tips_and_updates</mat-icon> High-Yield Exam Notes
              </h3>
              <p class="text-xs text-slate-500">Key theoretical points commonly evaluated in end-semester exams.</p>

              <div class="space-y-3 pt-2">
                @for (tip of b.sampleContent.quickRevisionNotes; track tip; let idx = $index) {
                  <div class="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs text-slate-700 leading-relaxed flex items-start gap-2.5">
                    <span class="w-5 h-5 rounded-full bg-amber-200 text-amber-900 font-bold text-2xs flex items-center justify-center shrink-0">
                      {{ idx + 1 }}
                    </span>
                    <span>{{ tip }}</span>
                  </div>
                }
              </div>
            </div>

            <!-- Share & Cite Card -->
            <div class="bg-indigo-900 text-white rounded-3xl p-6 space-y-3">
              <h4 class="text-sm font-bold flex items-center gap-2">
                <mat-icon class="text-indigo-300">share</mat-icon> Academic Citation
              </h4>
              <p class="text-xs text-indigo-200 font-mono bg-indigo-950/60 p-3 rounded-xl border border-indigo-800">
                {{ b.author }} ({{ b.publishedYear }}). <em>{{ b.title }}</em> ({{ b.edition }}). ScholarHub University Archive.
              </p>
            </div>
          </div>

        </div>

        <!-- Related Books in the Same Discipline -->
        @if (relatedBooks().length > 0) {
          <div class="pt-6 border-t border-slate-200 space-y-6">
            <h3 class="text-xl font-bold text-slate-900 flex items-center gap-2">
              <mat-icon class="text-indigo-600">auto_stories</mat-icon> More in {{ b.categoryName }}
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (rel of relatedBooks(); track rel.id) {
                <div class="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3">
                  <div>
                    <span class="text-2xs font-bold uppercase text-indigo-600">{{ rel.categoryName }}</span>
                    <h4 class="text-sm font-bold text-slate-900 mt-1 line-clamp-2">
                      <a [routerLink]="['/books', rel.id]" (click)="loadBook(rel.id)">{{ rel.title }}</a>
                    </h4>
                    <p class="text-xs text-slate-500 mt-0.5">By {{ rel.author }}</p>
                  </div>
                  <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span class="font-bold text-amber-500 flex items-center gap-1">
                      <mat-icon class="text-xs">star</mat-icon> {{ rel.rating }}
                    </span>
                    <a
                      [routerLink]="['/books', rel.id]"
                      (click)="loadBook(rel.id)"
                      class="text-indigo-600 font-semibold hover:underline">
                      View Book →
                    </a>
                  </div>
                </div>
              }
            </div>
          </div>
        }

      } @else {
        <!-- Not Found State -->
        <div class="py-20 text-center max-w-md mx-auto space-y-4">
          <mat-icon class="text-4xl text-slate-400">error_outline</mat-icon>
          <h2 class="text-xl font-bold text-slate-900">Resource not found</h2>
          <p class="text-xs text-slate-500">The study material or textbook ID requested does not exist in the repository.</p>
          <a routerLink="/" class="inline-block px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs">
            Return to Homepage
          </a>
        </div>
      }

    </div>
  `
})
export class BookDetailsComponent implements OnInit {
  readonly id = input<string>(''); // Angular 21 route param binding
  readonly bookService = inject(BookService);

  readonly book = signal<Book | null>(null);
  readonly relatedBooks = signal<Book[]>([]);
  readonly isLoading = signal<boolean>(true);

  ngOnInit(): void {
    const bookId = this.id();
    if (bookId) {
      this.loadBook(bookId);
    }
  }

  loadBook(bookId: string): void {
    this.isLoading.set(true);
    this.bookService.getBookById(bookId).subscribe((res) => {
      this.isLoading.set(false);
      if (res) {
        this.book.set(res.book);
        this.relatedBooks.set(res.related);
      } else {
        this.book.set(null);
      }
    });
  }
}
