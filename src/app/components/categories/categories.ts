import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { BookService } from '../../services/book.service';
import { Category } from '../../models/book.model';

@Component({
  selector: 'app-categories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      
      <!-- Page Header -->
      <div class="max-w-3xl space-y-3">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
          <mat-icon class="text-xs">school</mat-icon> Academic Curriculum Catalog
        </div>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Subject Categories & Core Streams
        </h1>
        <p class="text-base text-slate-600 leading-relaxed">
          Browse specialized textbooks, lecture summaries, and university past papers organized by official Computer Science & Engineering course codes.
        </p>
      </div>

      <!-- Categories Grid with Rich FontAwesome Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        @for (category of bookService.categories(); track category.id) {
          <div 
            role="button"
            tabindex="0"
            (keydown.enter)="selectCategory(category)"
            (click)="selectCategory(category)"
            class="group bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-xl hover:border-indigo-300 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between cursor-pointer relative overflow-hidden">
            
            <!-- Top Gradient Accent Bar -->
            <div [class]="'absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ' + category.color"></div>

            <div class="space-y-4">
              <!-- Icon & Course Code Badge -->
              <div class="flex items-center justify-between">
                <div [class]="'w-14 h-14 rounded-2xl bg-gradient-to-br ' + category.color + ' text-white flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform duration-200'">
                  <i [class]="category.icon"></i>
                </div>
                <span class="px-2.5 py-1 text-2xs font-bold uppercase rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                  {{ category.courseCode }}
                </span>
              </div>

              <!-- Title & Book Count -->
              <div>
                <h3 class="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {{ category.name }}
                </h3>
                <p class="text-xs text-indigo-600 font-semibold mt-0.5">
                  {{ category.bookCount || 0 }} Curated Study Resource{{ category.bookCount === 1 ? '' : 's' }}
                </p>
              </div>

              <!-- Description -->
              <p class="text-xs text-slate-600 leading-relaxed">
                {{ category.description }}
              </p>
            </div>

            <!-- Footer Action Button -->
            <div class="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-indigo-600">
              <span>Explore Books & Notes</span>
              <mat-icon class="text-sm group-hover:translate-x-1 transition-transform">arrow_forward</mat-icon>
            </div>

          </div>
        }
      </div>

      <!-- Quick Semester Curriculum Guide -->
      <div class="p-8 rounded-3xl bg-slate-900 text-white space-y-6">
        <div class="max-w-2xl">
          <span class="text-xs font-bold uppercase tracking-wider text-indigo-400">Semester Roadmap</span>
          <h2 class="text-2xl font-bold mt-1">Recommended Sequence for Computer Science Cohorts</h2>
          <p class="text-xs sm:text-sm text-slate-300 mt-1">
            Follow this academic path to build strong foundations from low-level systems up to modern cloud architectures.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div class="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
            <span class="text-2xs font-extrabold uppercase text-indigo-400">Year 1 • Sem 1 & 2</span>
            <h4 class="font-bold text-slate-100 text-sm mt-1">Foundational Logic</h4>
            <p class="text-xs text-slate-400 mt-1">Python basics, C++ programming constructs, discrete math, and pointers.</p>
          </div>
          <div class="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
            <span class="text-2xs font-extrabold uppercase text-indigo-400">Year 2 • Sem 3 & 4</span>
            <h4 class="font-bold text-slate-100 text-sm mt-1">Core Data & Systems</h4>
            <p class="text-xs text-slate-400 mt-1">Data Structures & Algorithms, Java OOP, Operating Systems, DBMS & SQL.</p>
          </div>
          <div class="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
            <span class="text-2xs font-extrabold uppercase text-indigo-400">Year 3 • Sem 5 & 6</span>
            <h4 class="font-bold text-slate-100 text-sm mt-1">Modern Web & Networking</h4>
            <p class="text-xs text-slate-400 mt-1">Full-stack Web (Angular + Node), Computer Networks, and Cloud Computing.</p>
          </div>
          <div class="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
            <span class="text-2xs font-extrabold uppercase text-indigo-400">Year 4 • Sem 7 & 8</span>
            <h4 class="font-bold text-slate-100 text-sm mt-1">Advanced Specializations</h4>
            <p class="text-xs text-slate-400 mt-1">Deep Learning, Distributed Systems, Compiler Design, and Capstone Project.</p>
          </div>
        </div>
      </div>

    </div>
  `
})
export class CategoriesComponent implements OnInit {
  readonly bookService = inject(BookService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.bookService.fetchCategories().subscribe();
  }

  selectCategory(category: Category): void {
    this.bookService.selectedCategory.set(category.id);
    this.router.navigate(['/'], { queryParams: { category: category.id } });
  }
}
