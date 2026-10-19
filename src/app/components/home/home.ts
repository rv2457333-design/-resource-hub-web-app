import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, MatIconModule],
  template: `
    <div class="space-y-12 sm:space-y-16 pb-16">
      
      <!-- HERO BANNER SECTION -->
      <section class="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 text-white pt-12 pb-16 sm:py-20 lg:py-24">
        <!-- Background Grid Pattern -->
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div class="absolute -top-40 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-20 left-10 w-96 h-96 bg-violet-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-3xl mx-auto text-center space-y-6">
            
            <!-- Academic Project Badge -->
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-semibold backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-300">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Semester 2026 Academic Archive</span>
              <span class="text-indigo-400">•</span>
              <span class="text-slate-300">Open Student Access</span>
            </div>

            <!-- Main Headline -->
            <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Master Your CS Subjects with <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-teal-300">Curated College Notes</span>
            </h1>

            <!-- Subheading -->
            <p class="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
              Explore university-vetted textbooks, lab manuals, and exam revision guides for C++, Java, Data Structures, Python, Web Engineering, and AI.
            </p>

            <!-- Search Box within Hero -->
            <div class="pt-2 max-w-xl mx-auto">
              <div class="relative flex items-center shadow-2xl rounded-2xl bg-white/10 backdrop-blur-md p-1.5 border border-white/15">
                <div class="pl-3.5 text-slate-300 flex items-center pointer-events-none">
                  <mat-icon>search</mat-icon>
                </div>
                <input
                  type="text"
                  [value]="bookService.searchQuery()"
                  (input)="onSearchInput($event)"
                  placeholder="Search by topic (e.g. Trees, Spring Boot, Pointers, SQL)..."
                  class="w-full bg-transparent border-0 px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-hidden"
                />
                @if (bookService.searchQuery()) {
                  <button
                    type="button"
                    (click)="clearSearch()"
                    class="p-1.5 text-slate-400 hover:text-white mr-1">
                    <mat-icon class="text-xs">close</mat-icon>
                  </button>
                }
                <button
                  type="button"
                  (click)="scrollToBooks()"
                  class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white font-semibold text-xs sm:text-sm transition-all shadow-md flex items-center gap-1.5 shrink-0">
                  <span>Browse</span>
                  <mat-icon class="text-sm">arrow_downward</mat-icon>
                </button>
              </div>
            </div>

            <!-- Quick Subject Tags -->
            <div class="flex flex-wrap items-center justify-center gap-2 pt-2 text-2xs sm:text-xs">
              <span class="text-slate-400">Popular:</span>
              <button
                type="button"
                (click)="filterByCategory('dsa')"
                class="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-slate-200 border border-white/10 transition-colors">
                Data Structures
              </button>
              <button
                type="button"
                (click)="filterByCategory('web-dev')"
                class="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-slate-200 border border-white/10 transition-colors">
                Angular & Node
              </button>
              <button
                type="button"
                (click)="filterByCategory('cpp')"
                class="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-slate-200 border border-white/10 transition-colors">
                C++ STL
              </button>
              <button
                type="button"
                (click)="filterByCategory('ai-ml')"
                class="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-slate-200 border border-white/10 transition-colors">
                AI / PyTorch
              </button>
            </div>

          </div>

          <!-- Key Metrics / Stats Strip -->
          <div class="mt-14 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div class="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
              <div class="text-2xl sm:text-3xl font-extrabold text-indigo-400">
                {{ bookService.stats()?.totalBooks ?? 8 }}+
              </div>
              <div class="text-xs text-slate-300 font-medium mt-0.5">Verified Textbooks</div>
            </div>
            <div class="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
              <div class="text-2xl sm:text-3xl font-extrabold text-emerald-400">100%</div>
              <div class="text-xs text-slate-300 font-medium mt-0.5">Free Student Access</div>
            </div>
            <div class="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
              <div class="text-2xl sm:text-3xl font-extrabold text-amber-400">
                {{ formatNumber(bookService.stats()?.totalDownloads ?? 28000) }}+
              </div>
              <div class="text-xs text-slate-300 font-medium mt-0.5">Notes Downloaded</div>
            </div>
            <div class="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
              <div class="text-2xl sm:text-3xl font-extrabold text-rose-400">
                {{ bookService.stats()?.totalCategories ?? 8 }}
              </div>
              <div class="text-xs text-slate-300 font-medium mt-0.5">Core CS Streams</div>
            </div>
          </div>

        </div>
      </section>

      <!-- SUBJECT CATEGORIES CAROUSEL/TEASER -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span class="p-1.5 rounded-lg bg-indigo-100 text-indigo-600">
                <mat-icon class="text-base">category</mat-icon>
              </span>
              Academic Subject Streams
            </h2>
            <p class="text-xs sm:text-sm text-slate-500">Filter books by university computer science discipline</p>
          </div>
          <a routerLink="/categories" class="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group">
            <span>View All Categories</span>
            <mat-icon class="text-sm group-hover:translate-x-0.5 transition-transform">arrow_forward</mat-icon>
          </a>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
          <!-- All Categories Option -->
          <button
            type="button"
            (click)="filterByCategory('all')"
            [class.ring-2]="selectedCategory() === 'all'"
            [class.ring-indigo-600]="selectedCategory() === 'all'"
            [class.bg-indigo-50]="selectedCategory() === 'all'"
            class="p-3 rounded-xl bg-white border border-slate-200 text-center hover:border-indigo-400 hover:shadow-xs transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer">
            <div class="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-indigo-100 text-slate-700 group-hover:text-indigo-600 flex items-center justify-center transition-colors">
              <mat-icon class="text-base">auto_awesome</mat-icon>
            </div>
            <span class="text-xs font-bold text-slate-800 line-clamp-1">All Subjects</span>
          </button>

          @for (cat of bookService.categories(); track cat.id) {
            <button
              type="button"
              (click)="filterByCategory(cat.id)"
              [class.ring-2]="selectedCategory() === cat.id"
              [class.ring-indigo-600]="selectedCategory() === cat.id"
              [class.bg-indigo-50]="selectedCategory() === cat.id"
              class="p-3 rounded-xl bg-white border border-slate-200 text-center hover:border-indigo-400 hover:shadow-xs transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer">
              <div class="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-indigo-100 text-slate-700 group-hover:text-indigo-600 flex items-center justify-center transition-colors">
                <i [class]="cat.icon + ' text-base'"></i>
              </div>
              <span class="text-xs font-bold text-slate-800 line-clamp-1">{{ cat.name }}</span>
            </button>
          }
        </div>
      </section>

      <!-- MAIN BOOKS GRID SECTION -->
      <section id="books-section" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header with Sorting & Results Count -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <h2 class="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span class="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                <mat-icon class="text-base">library_books</mat-icon>
              </span>
              Curated Textbooks & Study Packs
            </h2>
            <p class="text-xs sm:text-sm text-slate-500">
              Showing {{ filteredBooks().length }} academic resource{{ filteredBooks().length === 1 ? '' : 's' }}
              @if (selectedCategory() !== 'all') {
                for <span class="font-semibold text-indigo-600">{{ getCategoryName(selectedCategory()) }}</span>
              }
              @if (bookService.searchQuery()) {
                matching "<span class="font-semibold text-slate-800">{{ bookService.searchQuery() }}</span>"
              }
            </p>
          </div>

          <!-- Sorting Controls -->
          <div class="flex items-center gap-2.5">
            <span class="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <mat-icon class="text-sm">sort</mat-icon> Sort:
            </span>
            <select
              [value]="selectedSort()"
              (change)="onSortChange($event)"
              class="px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:border-indigo-500">
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="downloads">Most Downloaded</option>
              <option value="newest">Latest Edition</option>
              <option value="price-low">Free / Price (Low to High)</option>
            </select>
          </div>
        </div>

        <!-- Books Grid -->
        @if (bookService.isLoading()) {
          <div class="py-20 flex flex-col items-center justify-center text-slate-400 space-y-3">
            <mat-icon class="animate-spin text-3xl text-indigo-600">rotate_right</mat-icon>
            <p class="text-sm font-medium">Fetching academic repository...</p>
          </div>
        } @else if (filteredBooks().length === 0) {
          <!-- Empty State -->
          <div class="py-16 text-center max-w-md mx-auto space-y-4">
            <div class="w-16 h-16 mx-auto rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <mat-icon class="text-3xl">search_off</mat-icon>
            </div>
            <div>
              <h3 class="text-base font-bold text-slate-800">No matching study resources found</h3>
              <p class="text-xs text-slate-500 mt-1">Try adjusting your keywords or clearing the active category filter.</p>
            </div>
            <div class="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                (click)="resetFilters()"
                class="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors">
                Reset All Filters
              </button>
              <button
                type="button"
                (click)="bookService.openAddBookModal()"
                class="px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
                Contribute This Resource
              </button>
            </div>
          </div>
        } @else {
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            @for (book of filteredBooks(); track book.id) {
              <div class="group bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-indigo-300 transition-all duration-200 flex flex-col overflow-hidden">
                
                <!-- Card Media Container -->
                <div class="relative aspect-16/10 bg-slate-100 overflow-hidden">
                  <img
                    [src]="book.coverImage"
                    [alt]="book.title"
                    referrerpolicy="no-referrer"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  <!-- Gradient Overlay -->
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                  <!-- Category Tag -->
                  <div class="absolute top-3 left-3 flex items-center gap-1.5">
                    <span class="px-2.5 py-1 text-2xs font-bold uppercase tracking-wider rounded-lg bg-white/95 text-slate-800 backdrop-blur-xs shadow-xs">
                      {{ book.categoryName }}
                    </span>
                  </div>

                  <!-- Price / Free Badge -->
                  <div class="absolute top-3 right-3">
                    @if (book.price === 0) {
                      <span class="px-2.5 py-1 text-2xs font-extrabold uppercase rounded-lg bg-emerald-500 text-white shadow-xs">
                        Free PDF
                      </span>
                    } @else {
                      <span class="px-2.5 py-1 text-2xs font-extrabold rounded-lg bg-amber-500 text-white shadow-xs">
                        \${{ book.price }}
                      </span>
                    }
                  </div>

                  <!-- Semester Tag at bottom of cover -->
                  <div class="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-2xs font-medium">
                    <span class="flex items-center gap-1">
                      <mat-icon class="text-xs">calendar_today</mat-icon> {{ book.semester }}
                    </span>
                    <span class="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-xs">
                      <mat-icon class="text-xs">file_download</mat-icon> {{ book.downloads }}
                    </span>
                  </div>
                </div>

                <!-- Card Content -->
                <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div class="space-y-2">
                    
                    <!-- Rating & Reviews -->
                    <div class="flex items-center justify-between text-xs">
                      <div class="flex items-center gap-1 text-amber-500 font-bold">
                        <mat-icon class="text-xs text-amber-400">star</mat-icon>
                        <span>{{ book.rating }}</span>
                        <span class="text-slate-400 font-normal">({{ book.reviewCount }})</span>
                      </div>
                      <span class="text-2xs text-slate-500">{{ book.pages }} pages</span>
                    </div>

                    <!-- Book Title -->
                    <h3 class="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                      <a [routerLink]="['/books', book.id]">{{ book.title }}</a>
                    </h3>

                    <!-- Author -->
                    <p class="text-xs text-slate-500 font-medium">By {{ book.author }}</p>

                    <!-- Snippet / Description -->
                    <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {{ book.description }}
                    </p>

                    <!-- Tags -->
                    <div class="flex flex-wrap gap-1 pt-1">
                      @for (tag of book.tags.slice(0, 2); track tag) {
                        <span class="px-2 py-0.5 text-2xs rounded-md bg-slate-100 text-slate-600 font-medium">
                          {{ tag }}
                        </span>
                      }
                    </div>
                  </div>

                  <!-- Action Buttons -->
                  <div class="pt-3 border-t border-slate-100 space-y-2">
                    <div class="grid grid-cols-2 gap-2">
                      <!-- Quick Read Button -->
                      <button
                        type="button"
                        (click)="bookService.openReader(book)"
                        class="px-2.5 py-2 text-xs font-semibold rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors flex items-center justify-center gap-1">
                        <mat-icon class="text-xs">menu_book</mat-icon> Read Online
                      </button>

                      <!-- Download PDF Button -->
                      <button
                        type="button"
                        (click)="bookService.downloadBook(book)"
                        class="px-2.5 py-2 text-xs font-semibold rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors flex items-center justify-center gap-1">
                        <mat-icon class="text-xs">download</mat-icon> PDF Pack
                      </button>
                    </div>

                    <div class="flex items-center gap-2">
                      <a
                        [routerLink]="['/books', book.id]"
                        class="flex-1 text-center py-2 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors">
                        View Full Details & Syllabus
                      </a>

                      <!-- Bookmark button -->
                      <button
                        type="button"
                        (click)="bookService.toggleBookmark(book.id)"
                        [title]="bookService.isBookmarked(book.id) ? 'Remove Bookmark' : 'Save to Library'"
                        class="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors">
                        <mat-icon [class.text-rose-500]="bookService.isBookmarked(book.id)">
                          {{ bookService.isBookmarked(book.id) ? 'bookmark' : 'bookmark_border' }}
                        </mat-icon>
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            }
          </div>
        }
      </section>

      <!-- SAVED / BOOKMARKED LIBRARY SECTION -->
      @if (bookService.savedCount() > 0) {
        <section id="saved-library" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-50/70 via-indigo-50/60 to-slate-50 border border-rose-200/60 shadow-xs">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <span class="p-2 rounded-xl bg-rose-500 text-white shadow-xs">
                  <mat-icon class="text-base">bookmarks</mat-icon>
                </span>
                <div>
                  <h3 class="text-lg sm:text-xl font-bold text-slate-900">Your Saved Study Library</h3>
                  <p class="text-xs text-slate-500">Quick access to bookmarked exam notes and textbooks ({{ bookService.savedCount() }} items)</p>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              @for (savedBook of bookService.savedBooks(); track savedBook.id) {
                <div class="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-3">
                  <div class="min-w-0">
                    <span class="text-2xs font-bold uppercase text-indigo-600">{{ savedBook.categoryName }}</span>
                    <h4 class="text-sm font-bold text-slate-900 truncate">{{ savedBook.title }}</h4>
                    <p class="text-xs text-slate-500 truncate">By {{ savedBook.author }}</p>
                  </div>
                  <div class="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      (click)="bookService.openReader(savedBook)"
                      title="Read Online"
                      class="p-2 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100">
                      <mat-icon class="text-sm">menu_book</mat-icon>
                    </button>
                    <button
                      type="button"
                      (click)="bookService.toggleBookmark(savedBook.id)"
                      title="Remove"
                      class="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50">
                      <mat-icon class="text-sm">close</mat-icon>
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>
        </section>
      }

      <!-- CALL TO ACTION: Contribute College Notes -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div class="relative z-10 space-y-3 max-w-xl text-center md:text-left">
            <span class="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-400/30">
              Community Academic Contribution
            </span>
            <h3 class="text-2xl sm:text-3xl font-extrabold tracking-tight">Have Great Study Notes or Exam Solutions?</h3>
            <p class="text-sm text-slate-300 leading-relaxed">
              Help your peers excel! Upload your semester lecture summaries, lab manuals, or textbook solutions to the ScholarHub open library.
            </p>
          </div>
          <div class="relative z-10 shrink-0 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              (click)="bookService.openAddBookModal()"
              class="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2">
              <mat-icon class="text-sm">add_circle</mat-icon> Contribute Notes
            </button>
            <a
              routerLink="/contact"
              class="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 transition-all flex items-center justify-center gap-2">
              <mat-icon class="text-sm">mail</mat-icon> Request New Subject
            </a>
          </div>
        </div>
      </section>

    </div>
  `
})
export class HomeComponent implements OnInit {
  readonly bookService = inject(BookService);

  readonly selectedCategory = signal<string>('all');
  readonly selectedSort = signal<string>('popular');

  ngOnInit(): void {
    this.bookService.fetchCategories().subscribe();
    this.bookService.fetchStats().subscribe();
    this.bookService.fetchBooks().subscribe();
  }

  filteredBooks(): Book[] {
    return this.bookService.books();
  }

  filterByCategory(catId: string): void {
    this.selectedCategory.set(catId);
    this.bookService.selectedCategory.set(catId);
    this.bookService.fetchBooks({ category: catId, sort: this.selectedSort() }).subscribe();
  }

  onSortChange(event: Event): void {
    const sortVal = (event.target as HTMLSelectElement).value;
    this.selectedSort.set(sortVal);
    this.bookService.selectedSort.set(sortVal);
    this.bookService.fetchBooks({ category: this.selectedCategory(), sort: sortVal }).subscribe();
  }

  onSearchInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.bookService.searchQuery.set(val);
    this.bookService.fetchBooks({ q: val, category: this.selectedCategory() }).subscribe();
  }

  clearSearch(): void {
    this.bookService.searchQuery.set('');
    this.bookService.fetchBooks({ q: '', category: this.selectedCategory() }).subscribe();
  }

  resetFilters(): void {
    this.selectedCategory.set('all');
    this.selectedSort.set('popular');
    this.bookService.searchQuery.set('');
    this.bookService.fetchBooks({ category: 'all', q: '', sort: 'popular' }).subscribe();
  }

  scrollToBooks(): void {
    const el = document.getElementById('books-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getCategoryName(id: string): string {
    const found = this.bookService.categories().find((c) => c.id === id);
    return found ? found.name : id;
  }

  formatNumber(val: number): string {
    return new Intl.NumberFormat('en-US').format(val);
  }
}
