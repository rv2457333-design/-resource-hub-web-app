import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      <!-- Page Header -->
      <div class="max-w-3xl space-y-3">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
          <mat-icon class="text-xs">contact_support</mat-icon> Student Support & Resource Inquiries
        </div>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Request Study Material or Contact the Team
        </h1>
        <p class="text-base text-slate-600 leading-relaxed">
          Need lecture notes for a specific semester subject? Found an erratum in our code samples? Get in touch with our college project team.
        </p>
      </div>

      <!-- Main Form & Info Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        <!-- Contact Form Column -->
        <div class="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs">
          
          <h2 class="text-xl font-bold text-slate-900 mb-1">Submit Inquiry or Book Request</h2>
          <p class="text-xs text-slate-500 mb-6">All requests are reviewed by academic peer moderators.</p>

          <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-4">
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Name -->
              <div>
                <label for="contact-name" class="block text-xs font-semibold text-slate-700 mb-1">
                  Your Full Name <span class="text-rose-500">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  formControlName="name"
                  placeholder="e.g., Purushottam Kumar"
                  class="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-hidden"
                />
                @if (contactForm.get('name')?.touched && contactForm.get('name')?.hasError('required')) {
                  <p class="text-2xs text-rose-500 mt-1">Please enter your name.</p>
                }
              </div>

              <!-- Email -->
              <div>
                <label for="contact-email" class="block text-xs font-semibold text-slate-700 mb-1">
                  College / Personal Email <span class="text-rose-500">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  formControlName="email"
                  placeholder="name@college.edu"
                  class="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-hidden"
                />
                @if (contactForm.get('email')?.touched && (contactForm.get('email')?.hasError('required') || contactForm.get('email')?.hasError('email'))) {
                  <p class="text-2xs text-rose-500 mt-1">Please enter a valid email address.</p>
                }
              </div>
            </div>

            <!-- Request Type & Subject -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="contact-type" class="block text-xs font-semibold text-slate-700 mb-1">Inquiry Type</label>
                <select
                  id="contact-type"
                  formControlName="type"
                  class="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-hidden bg-white">
                  <option value="Study Material Request">Study Material / Book Request</option>
                  <option value="Erratum / Bug in Code">Erratum in Lecture Note / Code</option>
                  <option value="Contributor Inquiry">Join as Student Contributor</option>
                  <option value="General Feedback">General College Project Feedback</option>
                </select>
              </div>

              <div>
                <label for="contact-subject" class="block text-xs font-semibold text-slate-700 mb-1">Subject Header</label>
                <input
                  id="contact-subject"
                  type="text"
                  formControlName="subject"
                  placeholder="e.g., Request for Cloud Computing (CS402) notes"
                  class="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-hidden"
                />
              </div>
            </div>

            <!-- Message Area -->
            <div>
              <label for="contact-msg" class="block text-xs font-semibold text-slate-700 mb-1">
                Detailed Message <span class="text-rose-500">*</span>
              </label>
              <textarea
                id="contact-msg"
                formControlName="message"
                rows="4"
                placeholder="Mention specific textbook titles, author, syllabus chapters, or university course code..."
                class="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-hidden"></textarea>
              @if (contactForm.get('message')?.touched && contactForm.get('message')?.hasError('required')) {
                <p class="text-2xs text-rose-500 mt-1">Message content is required.</p>
              }
            </div>

            <!-- Submit Button -->
            <div class="pt-2">
              <button
                type="submit"
                [disabled]="contactForm.invalid || isSubmitting()"
                class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold text-sm shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer">
                @if (isSubmitting()) {
                  <mat-icon class="animate-spin text-sm">refresh</mat-icon> Sending Request...
                } @else {
                  <mat-icon class="text-sm">send</mat-icon> Send Inquiry to ScholarHub
                }
              </button>
            </div>

          </form>

        </div>

        <!-- Info / FAQ Column -->
        <div class="lg:col-span-5 space-y-6">
          
          <!-- Contact Card -->
          <div class="p-6 rounded-3xl bg-slate-900 text-white space-y-4">
            <h3 class="text-lg font-bold flex items-center gap-2">
              <mat-icon class="text-indigo-400">school</mat-icon> Project Coordination Office
            </h3>
            <p class="text-xs text-slate-300 leading-relaxed">
              ScholarHub is monitored by student project architects. We typically review study material requests and pull requests within 24–48 hours.
            </p>
            <div class="space-y-2 pt-2 text-xs">
              <div class="flex items-center gap-2 text-slate-300">
                <mat-icon class="text-sm text-indigo-400">mail</mat-icon>
                <span>purushottamkumar22238&#64;gmail.com</span>
              </div>
              <div class="flex items-center gap-2 text-slate-300">
                <mat-icon class="text-sm text-indigo-400">location_on</mat-icon>
                <span>Department of Computer Science & Engineering</span>
              </div>
            </div>
          </div>

          <!-- Quick FAQ Accordion Items -->
          <div class="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
              <mat-icon class="text-indigo-600">quiz</mat-icon> Frequently Asked Questions
            </h3>

            <div class="space-y-3 text-xs">
              <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <h4 class="font-bold text-slate-800 mb-1">Are all materials free for students?</h4>
                <p class="text-slate-600 leading-relaxed">
                  Yes, open-access textbooks, community lecture summaries, and university past papers can be read online and downloaded without charge.
                </p>
              </div>

              <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <h4 class="font-bold text-slate-800 mb-1">How can I upload my own class notes?</h4>
                <p class="text-slate-600 leading-relaxed">
                  Click the <strong>Contribute Note</strong> button in the navigation header to open the quick submission dialog.
                </p>
              </div>

              <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <h4 class="font-bold text-slate-800 mb-1">Can I test the backend REST API directly?</h4>
                <p class="text-slate-600 leading-relaxed">
                  Yes! The Express backend exposes endpoints at <code class="font-mono text-indigo-600 bg-indigo-50 px-1 py-0.5 rounded">/api/books</code>, <code class="font-mono text-indigo-600 bg-indigo-50 px-1 py-0.5 rounded">/api/categories</code>, and <code class="font-mono text-indigo-600 bg-indigo-50 px-1 py-0.5 rounded">/api/stats</code>.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  `
})
export class ContactComponent {
  readonly bookService = inject(BookService);
  readonly isSubmitting = signal(false);

  readonly contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    type: new FormControl('Study Material Request'),
    subject: new FormControl(''),
    message: new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    const val = this.contactForm.value;

    this.bookService.submitContact({
      name: val.name || '',
      email: val.email || '',
      type: val.type || 'General Inquiry',
      subject: val.subject || 'Student Request',
      message: val.message || ''
    }).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.contactForm.reset({
          name: '',
          email: '',
          type: 'Study Material Request',
          subject: '',
          message: ''
        });
      },
      error: () => {
        this.isSubmitting.set(false);
      }
    });
  }
}
