import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule],
  template: `
    <header class="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          <!-- Logo & Branding -->
          <a routerLink="/" class="flex items-center gap-3 group focus:outline-hidden">
            <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <i class="fa-solid fa-graduation-cap text-lg sm:text-xl"></i>
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <span class="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">Scholar<span class="text-indigo-600">Hub</span></span>
                <span class="hidden md:inline-flex items-center px-2 py-0.5 text-2xs font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200/60 rounded-full">College Edition</span>
              </div>
              <p class="text-2xs text-slate-500 font-medium hidden sm:block">Academic Mini Bookstore & Resource Hub</p>
            </div>
          </a>

          <!-- Quick Global Search Bar -->
          <div class="hidden md:flex flex-1 max-w-md mx-2">
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <mat-icon class="text-sm">search</mat-icon>
              </div>
              <input
                type="text"
                [value]="bookService.searchQuery()"
                (input)="onSearchInput($event)"
                (keydown.enter)="onSearchEnter()"
                placeholder="Search books, notes, authors, C++, Java, DSA..."
                class="w-full pl-10 pr-9 py-2 text-sm bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder-slate-400 rounded-full border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-hidden transition-all duration-150"
              />
              @if (bookService.searchQuery()) {
                <button
                  type="button"
                  (click)="clearSearch()"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600">
                  <mat-icon class="text-xs">close</mat-icon>
                </button>
              }
            </div>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden lg:flex items-center gap-1 sm:gap-2">
            <a
              routerLink="/"
              routerLinkActive="text-indigo-600 font-semibold bg-indigo-50/70"
              [routerLinkActiveOptions]="{ exact: true }"
              class="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100/70 rounded-lg transition-colors flex items-center gap-1.5">
              <mat-icon class="text-base">home</mat-icon>
              Home
            </a>
            <a
              routerLink="/categories"
              routerLinkActive="text-indigo-600 font-semibold bg-indigo-50/70"
              class="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100/70 rounded-lg transition-colors flex items-center gap-1.5">
              <mat-icon class="text-base">category</mat-icon>
              Categories
            </a>
            <a
              routerLink="/about"
              routerLinkActive="text-indigo-600 font-semibold bg-indigo-50/70"
              class="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100/70 rounded-lg transition-colors flex items-center gap-1.5">
              <mat-icon class="text-base">school</mat-icon>
              About Project
            </a>
            <a
              routerLink="/contact"
              routerLinkActive="text-indigo-600 font-semibold bg-indigo-50/70"
              class="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100/70 rounded-lg transition-colors flex items-center gap-1.5">
              <mat-icon class="text-base">mail</mat-icon>
              Contact
            </a>
          </nav>

          <!-- Right Action Buttons -->
          <div class="flex items-center gap-2 sm:gap-3">
            <!-- Saved / Wishlist Button -->
            <button
              type="button"
              (click)="scrollToSavedOrHome()"
              title="View Saved Resources"
              class="relative p-2 sm:px-3 sm:py-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-indigo-600 transition-colors flex items-center gap-1.5 border border-slate-200/80">
              <mat-icon class="text-rose-500">bookmark</mat-icon>
              <span class="hidden sm:inline text-xs font-semibold">Saved</span>
              @if (bookService.savedCount() > 0) {
                <span class="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-rose-500 rounded-full">
                  {{ bookService.savedCount() }}
                </span>
              }
            </button>

            <!-- Contribute Resource Button -->
            <button
              type="button"
              (click)="bookService.openAddBookModal()"
              class="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 rounded-xl shadow-xs shadow-indigo-600/30 transition-all cursor-pointer">
              <mat-icon class="text-base">add_circle</mat-icon>
              <span class="hidden sm:inline">Contribute Note</span>
              <span class="sm:hidden">Add</span>
            </button>

            <!-- Mobile Hamburger Button -->
            <button
              type="button"
              (click)="isMobileMenuOpen.set(!isMobileMenuOpen())"
              aria-label="Toggle mobile menu"
              class="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-hidden">
              <mat-icon>{{ isMobileMenuOpen() ? 'close' : 'menu' }}</mat-icon>
            </button>
          </div>
        </div>

        <!-- Mobile Search Bar (visible on small screens) -->
        <div class="md:hidden pb-3">
          <div class="relative w-full">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <mat-icon class="text-sm">search</mat-icon>
            </div>
            <input
              type="text"
              [value]="bookService.searchQuery()"
              (input)="onSearchInput($event)"
              (keydown.enter)="onSearchEnter()"
              placeholder="Search books, notes, topics..."
              class="w-full pl-9 pr-8 py-2 text-sm bg-slate-100 text-slate-800 placeholder-slate-400 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        <!-- Mobile Dropdown Navigation -->
        @if (isMobileMenuOpen()) {
          <div class="lg:hidden py-3 px-2 border-t border-slate-200 space-y-1">
            <a
              routerLink="/"
              (click)="isMobileMenuOpen.set(false)"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600">
              <mat-icon>home</mat-icon> Home
            </a>
            <a
              routerLink="/categories"
              (click)="isMobileMenuOpen.set(false)"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600">
              <mat-icon>category</mat-icon> Subject Categories
            </a>
            <a
              routerLink="/about"
              (click)="isMobileMenuOpen.set(false)"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600">
              <mat-icon>school</mat-icon> About Project & Developer
            </a>
            <a
              routerLink="/contact"
              (click)="isMobileMenuOpen.set(false)"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600">
              <mat-icon>mail</mat-icon> Contact & Requests
            </a>
          </div>
        }
      </div>
    </header>
  `
})
export class NavbarComponent {
  readonly bookService = inject(BookService);
  private readonly router = inject(Router);
  readonly isMobileMenuOpen = signal(false);

  onSearchInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.bookService.searchQuery.set(val);
    this.bookService.fetchBooks({ q: val }).subscribe();
  }

  onSearchEnter(): void {
    this.router.navigate(['/'], { queryParams: { q: this.bookService.searchQuery() || null } });
  }

  clearSearch(): void {
    this.bookService.searchQuery.set('');
    this.bookService.fetchBooks({ q: '' }).subscribe();
  }

  scrollToSavedOrHome(): void {
    this.router.navigate(['/'], { fragment: 'saved-library' }).then(() => {
      const el = document.getElementById('saved-library');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}
