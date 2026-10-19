import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-reader-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule],
  template: `
    @if (bookService.activeReaderBook(); as book) {
      <div class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
        <div class="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
          
          <!-- Modal Header -->
          <div class="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
            <div class="flex items-center gap-3 min-w-0">
              <span class="p-2 rounded-xl bg-indigo-100 text-indigo-700">
                <mat-icon class="text-xl">menu_book</mat-icon>
              </span>
              <div class="min-w-0">
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 text-2xs font-bold uppercase rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {{ book.categoryName }}
                  </span>
                  <span class="text-xs text-slate-500">{{ book.semester }}</span>
                </div>
                <h3 class="text-base sm:text-lg font-bold text-slate-900 truncate">{{ book.title }}</h3>
              </div>
            </div>

            <!-- Header Controls -->
            <div class="flex items-center gap-2 shrink-0">
              <!-- Font Size Toggle -->
              <div class="hidden sm:flex items-center bg-white border border-slate-200 rounded-lg p-0.5 text-xs text-slate-600">
                <button
                  type="button"
                  (click)="fontSize.set('text-sm')"
                  [class.bg-indigo-50]="fontSize() === 'text-sm'"
                  [class.text-indigo-600]="fontSize() === 'text-sm'"
                  class="px-2 py-1 rounded font-medium hover:bg-slate-50">
                  A-
                </button>
                <button
                  type="button"
                  (click)="fontSize.set('text-base')"
                  [class.bg-indigo-50]="fontSize() === 'text-base'"
                  [class.text-indigo-600]="fontSize() === 'text-base'"
                  class="px-2 py-1 rounded font-medium hover:bg-slate-50">
                  A
                </button>
                <button
                  type="button"
                  (click)="fontSize.set('text-lg')"
                  [class.bg-indigo-50]="fontSize() === 'text-lg'"
                  [class.text-indigo-600]="fontSize() === 'text-lg'"
                  class="px-2 py-1 rounded font-medium hover:bg-slate-50">
                  A+
                </button>
              </div>

              <!-- Download Button -->
              <button
                type="button"
                (click)="bookService.downloadBook(book)"
                class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors">
                <mat-icon class="text-sm">download</mat-icon> Download PDF
              </button>

              <!-- Close Button -->
              <button
                type="button"
                (click)="bookService.closeReader()"
                class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors">
                <mat-icon>close</mat-icon>
              </button>
            </div>
          </div>

          <!-- Reader Navigation Tabs -->
          <div class="bg-white border-b border-slate-200 px-5 flex overflow-x-auto gap-2 py-2 text-xs font-medium text-slate-600 scrollbar-none">
            <button
              type="button"
              (click)="activeTab.set('overview')"
              [class.border-indigo-600]="activeTab() === 'overview'"
              [class.text-indigo-600]="activeTab() === 'overview'"
              class="px-3 py-1.5 border-b-2 border-transparent font-semibold hover:text-indigo-600 transition-colors whitespace-nowrap flex items-center gap-1">
              <mat-icon class="text-xs">info</mat-icon> Overview & Syllabus
            </button>
            @for (chap of book.chapters; track chap.number) {
              <button
                type="button"
                (click)="selectChapter(chap.number)"
                [class.border-indigo-600]="activeTab() === 'chap-' + chap.number"
                [class.text-indigo-600]="activeTab() === 'chap-' + chap.number"
                class="px-3 py-1.5 border-b-2 border-transparent font-semibold hover:text-indigo-600 transition-colors whitespace-nowrap flex items-center gap-1">
                <mat-icon class="text-xs">bookmark</mat-icon> Chapter {{ chap.number }}
              </button>
            }
            <button
              type="button"
              (click)="activeTab.set('revision')"
              [class.border-indigo-600]="activeTab() === 'revision'"
              [class.text-indigo-600]="activeTab() === 'revision'"
              class="px-3 py-1.5 border-b-2 border-transparent font-semibold hover:text-indigo-600 transition-colors whitespace-nowrap flex items-center gap-1">
              <mat-icon class="text-xs">quiz</mat-icon> Exam Revision Points
            </button>
          </div>

          <!-- Reader Content Body -->
          <div class="p-5 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-700" [class]="fontSize()">
            
            @if (activeTab() === 'overview') {
              <div class="space-y-6">
                <!-- Academic Synopsis -->
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <h4 class="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <mat-icon class="text-indigo-600">article</mat-icon> Course & Syllabus Alignment
                  </h4>
                  <p class="leading-relaxed text-slate-600">{{ book.longDescription }}</p>
                </div>

                <!-- Key Takeaway Banner -->
                <div class="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 text-indigo-950">
                  <h5 class="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-1 flex items-center gap-1.5">
                    <mat-icon class="text-sm">lightbulb</mat-icon> Core Academic Takeaway
                  </h5>
                  <p class="font-medium">{{ book.sampleContent.keyTakeaway }}</p>
                </div>

                <!-- Core Topics Checklist -->
                <div>
                  <h4 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <mat-icon class="text-emerald-600">checklist</mat-icon> High-Yield Syllabus Modules
                  </h4>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    @for (topic of book.keyTopics; track topic) {
                      <div class="flex items-start gap-2 p-3 rounded-lg bg-slate-50 border border-slate-200/60">
                        <mat-icon class="text-emerald-600 text-sm mt-0.5">check_circle</mat-icon>
                        <span class="text-xs sm:text-sm font-medium text-slate-800">{{ topic }}</span>
                      </div>
                    }
                  </div>
                </div>

                <!-- Book Metadata Quick Card -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div class="p-3 bg-slate-50 rounded-lg text-center border border-slate-200">
                    <div class="text-2xs text-slate-400 font-medium">Author</div>
                    <div class="text-xs font-bold text-slate-800 truncate">{{ book.author }}</div>
                  </div>
                  <div class="p-3 bg-slate-50 rounded-lg text-center border border-slate-200">
                    <div class="text-2xs text-slate-400 font-medium">Pages</div>
                    <div class="text-xs font-bold text-slate-800">{{ book.pages }} Pages</div>
                  </div>
                  <div class="p-3 bg-slate-50 rounded-lg text-center border border-slate-200">
                    <div class="text-2xs text-slate-400 font-medium">Edition</div>
                    <div class="text-xs font-bold text-slate-800 truncate">{{ book.edition }}</div>
                  </div>
                  <div class="p-3 bg-slate-50 rounded-lg text-center border border-slate-200">
                    <div class="text-2xs text-slate-400 font-medium">ISBN</div>
                    <div class="text-xs font-bold text-slate-800">{{ book.isbn }}</div>
                  </div>
                </div>
              </div>
            }

            @for (chap of book.chapters; track chap.number) {
              @if (activeTab() === 'chap-' + chap.number) {
                <div class="space-y-5">
                  <div class="border-b border-slate-200 pb-3">
                    <div class="text-xs font-bold uppercase tracking-wider text-indigo-600">Chapter {{ chap.number }}</div>
                    <h3 class="text-xl font-bold text-slate-900 mt-0.5">{{ chap.title }}</h3>
                  </div>

                  <div class="prose max-w-none text-slate-700 leading-relaxed">
                    <p>{{ chap.summary }}</p>
                  </div>

                  @if (chap.codeSnippet) {
                    <div class="mt-4 rounded-xl overflow-hidden border border-slate-800 shadow-md">
                      <div class="bg-slate-900 px-4 py-2 flex items-center justify-between text-xs text-slate-400 border-b border-slate-800">
                        <span class="flex items-center gap-1.5 font-mono">
                          <i class="fa-solid fa-code text-indigo-400"></i> Code Laboratory Extract
                        </span>
                        <button
                          type="button"
                          (click)="copyCode(chap.codeSnippet)"
                          class="hover:text-white flex items-center gap-1 transition-colors">
                          <mat-icon class="text-xs">content_copy</mat-icon>
                          <span>{{ isCopied() ? 'Copied!' : 'Copy Code' }}</span>
                        </button>
                      </div>
                      <pre class="bg-slate-950 text-emerald-400 p-4 text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed"><code>{{ chap.codeSnippet }}</code></pre>
                    </div>
                  }
                </div>
              }
            }

            @if (activeTab() === 'revision') {
              <div class="space-y-4">
                <div class="border-b border-slate-200 pb-3">
                  <h3 class="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <mat-icon class="text-amber-500">star</mat-icon> High-Yield Exam Revision Summary
                  </h3>
                  <p class="text-xs text-slate-500">Frequently tested principles in semester finals and viva examinations.</p>
                </div>

                <div class="space-y-3">
                  @for (note of book.sampleContent.quickRevisionNotes; track note; let idx = $index) {
                    <div class="flex items-start gap-3 p-4 rounded-xl bg-amber-50/60 border border-amber-200/80">
                      <span class="w-6 h-6 rounded-full bg-amber-200 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {{ idx + 1 }}
                      </span>
                      <p class="text-sm text-slate-800 leading-relaxed font-medium">{{ note }}</p>
                    </div>
                  }
                </div>
              </div>
            }

          </div>

          <!-- Modal Footer -->
          <div class="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div class="text-xs text-slate-500 flex items-center gap-1">
              <mat-icon class="text-sm text-slate-400">lock</mat-icon> Academic Open Access Verified
            </div>
            <div class="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                (click)="bookService.closeReader()"
                class="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors">
                Close Reader
              </button>
              <button
                type="button"
                (click)="bookService.downloadBook(book)"
                class="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors">
                <mat-icon class="text-sm">download</mat-icon> Download Study Pack
              </button>
            </div>
          </div>

        </div>
      </div>
    }
  `
})
export class ReaderModalComponent {
  readonly bookService = inject(BookService);
  readonly activeTab = signal<string>('overview');
  readonly fontSize = signal<string>('text-sm');
  readonly isCopied = signal<boolean>(false);

  selectChapter(num: number): void {
    this.activeTab.set('chap-' + num);
  }

  copyCode(code: string): void {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(code);
      this.isCopied.set(true);
      setTimeout(() => this.isCopied.set(false), 2000);
      this.bookService.showToast('Code snippet copied to clipboard!', 'info');
    }
  }
}
