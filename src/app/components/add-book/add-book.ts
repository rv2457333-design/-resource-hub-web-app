import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-add-book-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  template: `
    @if (bookService.isAddBookModalOpen()) {
      <div class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
        <div class="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          <!-- Header -->
          <div class="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <span class="p-2 rounded-xl bg-indigo-100 text-indigo-700">
                <mat-icon class="text-xl">upload_file</mat-icon>
              </span>
              <div>
                <h3 class="text-base sm:text-lg font-bold text-slate-900">Contribute Study Material</h3>
                <p class="text-xs text-slate-500">Publish notes or textbooks to the ScholarHub college library</p>
              </div>
            </div>
            <button
              type="button"
              (click)="bookService.closeAddBookModal()"
              class="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors">
              <mat-icon>close</mat-icon>
            </button>
          </div>

          <!-- Form Body -->
          <form [formGroup]="bookForm" (ngSubmit)="onSubmit()" class="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            
            <!-- Book Title -->
            <div>
              <label for="book-title" class="block text-xs font-semibold text-slate-700 mb-1">
                Resource Title <span class="text-rose-500">*</span>
              </label>
              <input
                id="book-title"
                type="text"
                formControlName="title"
                placeholder="e.g., Computer Networks: Top-Down Approach Notes"
                class="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-hidden"
              />
              @if (bookForm.get('title')?.touched && bookForm.get('title')?.hasError('required')) {
                <p class="text-2xs text-rose-500 mt-1">Resource title is required.</p>
              }
            </div>

            <!-- Author / Faculty -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="book-author" class="block text-xs font-semibold text-slate-700 mb-1">
                  Author / Professor / Faculty <span class="text-rose-500">*</span>
                </label>
                <input
                  id="book-author"
                  type="text"
                  formControlName="author"
                  placeholder="e.g., Prof. Kurose & Ross"
                  class="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-hidden"
                />
                @if (bookForm.get('author')?.touched && bookForm.get('author')?.hasError('required')) {
                  <p class="text-2xs text-rose-500 mt-1">Author name is required.</p>
                }
              </div>

              <!-- Subject Category -->
              <div>
                <label for="book-category" class="block text-xs font-semibold text-slate-700 mb-1">
                  Subject Category <span class="text-rose-500">*</span>
                </label>
                <select
                  id="book-category"
                  formControlName="categoryId"
                  class="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-hidden bg-white">
                  <option value="" disabled>Select subject category</option>
                  @for (cat of bookService.categories(); track cat.id) {
                    <option [value]="cat.id">{{ cat.name }} ({{ cat.courseCode }})</option>
                  }
                </select>
                @if (bookForm.get('categoryId')?.touched && bookForm.get('categoryId')?.hasError('required')) {
                  <p class="text-2xs text-rose-500 mt-1">Please select a category.</p>
                }
              </div>
            </div>

            <!-- Semester & Edition -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label for="book-semester" class="block text-xs font-semibold text-slate-700 mb-1">Semester / Year</label>
                <input
                  id="book-semester"
                  type="text"
                  formControlName="semester"
                  placeholder="e.g., Semester 4"
                  class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-hidden"
                />
              </div>

              <div>
                <label for="book-pages" class="block text-xs font-semibold text-slate-700 mb-1">Estimated Pages</label>
                <input
                  id="book-pages"
                  type="number"
                  formControlName="pages"
                  placeholder="280"
                  class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-hidden"
                />
              </div>

              <div>
                <label for="book-price" class="block text-xs font-semibold text-slate-700 mb-1">Price ($0 = Free)</label>
                <input
                  id="book-price"
                  type="number"
                  formControlName="price"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-hidden"
                />
              </div>
            </div>

            <!-- Format -->
            <div>
              <label for="book-format" class="block text-xs font-semibold text-slate-700 mb-1">Resource Format</label>
              <select
                id="book-format"
                formControlName="format"
                class="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-hidden bg-white">
                <option value="PDF Notes + Solved Code">PDF Notes + Solved Code</option>
                <option value="Complete Textbook Notes">Complete Textbook Notes</option>
                <option value="Interactive Lab Manual">Interactive Lab Manual</option>
                <option value="Syllabus Revision Cheatsheet">Syllabus Revision Cheatsheet</option>
              </select>
            </div>

            <!-- Description -->
            <div>
              <label for="book-desc" class="block text-xs font-semibold text-slate-700 mb-1">
                Summary & Academic Syllabus Description <span class="text-rose-500">*</span>
              </label>
              <textarea
                id="book-desc"
                formControlName="description"
                rows="3"
                placeholder="Explain the coverage of this material (e.g., OSI model, TCP flow control, sockets, university lab questions)..."
                class="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-hidden"></textarea>
              @if (bookForm.get('description')?.touched && bookForm.get('description')?.hasError('required')) {
                <p class="text-2xs text-rose-500 mt-1">Description is required.</p>
              }
            </div>

            <!-- Key Topics (comma separated) -->
            <div>
              <label for="book-topics" class="block text-xs font-semibold text-slate-700 mb-1">Key Topics (comma separated)</label>
              <input
                id="book-topics"
                type="text"
                formControlName="topicsRaw"
                placeholder="e.g., TCP vs UDP, Congestion Control, Subnetting, Socket Programming"
                class="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-hidden"
              />
            </div>

            <!-- Submit Button -->
            <div class="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                (click)="bookService.closeAddBookModal()"
                class="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors">
                Cancel
              </button>
              <button
                type="submit"
                [disabled]="bookForm.invalid || isSubmitting()"
                class="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold shadow-xs shadow-indigo-600/30 transition-all cursor-pointer">
                @if (isSubmitting()) {
                  <mat-icon class="animate-spin text-sm">refresh</mat-icon> Publishing...
                } @else {
                  <mat-icon class="text-sm">publish</mat-icon> Publish Resource
                }
              </button>
            </div>
          </form>

        </div>
      </div>
    }
  `
})
export class AddBookModalComponent {
  readonly bookService = inject(BookService);
  readonly isSubmitting = signal(false);

  readonly bookForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    author: new FormControl('', [Validators.required]),
    categoryId: new FormControl('dsa', [Validators.required]),
    semester: new FormControl('Semester 3 & 4'),
    pages: new FormControl(280, [Validators.min(10)]),
    price: new FormControl(0, [Validators.min(0)]),
    format: new FormControl('PDF Notes + Solved Code'),
    description: new FormControl('', [Validators.required, Validators.minLength(15)]),
    topicsRaw: new FormControl('')
  });

  onSubmit(): void {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    const formVal = this.bookForm.value;

    const topics = formVal.topicsRaw
      ? formVal.topicsRaw.split(',').map((t: string) => t.trim()).filter(Boolean)
      : ['Fundamental Concepts', 'University Lab Notes', 'Solved Exam Questions'];

    this.bookService.addBook({
      title: formVal.title || '',
      author: formVal.author || '',
      categoryId: formVal.categoryId || 'dsa',
      description: formVal.description || '',
      semester: formVal.semester || 'Undergraduate',
      pages: Number(formVal.pages) || 250,
      price: Number(formVal.price) || 0,
      format: formVal.format || 'PDF Notes + Solved Code',
      keyTopics: topics,
      tags: [topics[0] || 'Computer Science', 'College Study Pack']
    }).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.bookForm.reset({
          title: '',
          author: '',
          categoryId: 'dsa',
          semester: 'Semester 3 & 4',
          pages: 280,
          price: 0,
          format: 'PDF Notes + Solved Code',
          description: '',
          topicsRaw: ''
        });
        this.bookService.closeAddBookModal();
      },
      error: () => {
        this.isSubmitting.set(false);
      }
    });
  }
}
