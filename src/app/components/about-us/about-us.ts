import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about-us',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      <!-- HERO / MISSION HEADER -->
      <div class="text-center max-w-3xl mx-auto space-y-4">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
          <mat-icon class="text-xs">school</mat-icon> Academic Capstone Project Showcase
        </div>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Democratizing Computer Science Education with <span class="text-indigo-600">Open Academic Resources</span>
        </h1>
        <p class="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          ScholarHub was engineered as a high-performance, full-stack college resource portal designed to bridge the gap between heavy university syllabi and accessible, high-yield study materials.
        </p>
      </div>

      <!-- MISSION & CORE OBJECTIVES -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div class="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
          <div class="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl">
            <mat-icon>menu_book</mat-icon>
          </div>
          <h3 class="text-lg font-bold text-slate-900">Curated Syllabi</h3>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Every textbook and lecture summary matches official university course codes (CS101 to CS401), ensuring students study exactly what is tested.
          </p>
        </div>

        <div class="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
          <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
            <mat-icon>savings</mat-icon>
          </div>
          <h3 class="text-lg font-bold text-slate-900">Zero Cost Barrier</h3>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Textbooks often cost hundreds of dollars. ScholarHub highlights open-access editions and high-yield student notes completely free.
          </p>
        </div>

        <div class="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
          <div class="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl">
            <mat-icon>code</mat-icon>
          </div>
          <h3 class="text-lg font-bold text-slate-900">Interactive Code Labs</h3>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Includes runnable pseudocode, C++ STL snippets, Java patterns, and Python notebooks inside an integrated online reader.
          </p>
        </div>

      </div>

      <!-- TARGET AUDIENCE SECTION -->
      <div class="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 space-y-8">
        <div class="max-w-2xl">
          <span class="text-xs font-bold uppercase tracking-wider text-indigo-400">Who We Serve</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold mt-1">Engineered for the Modern Academic Ecosystem</h2>
          <p class="text-sm text-slate-300 mt-2">
            Tailored to solve specific pain points across student cohorts, teaching assistants, and university research labs.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div class="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <mat-icon class="text-base">person</mat-icon> CS Undergraduates
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">
              Facing semester midterms, lab evaluations, and gate exams with structured revision notes and solved question banks.
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <mat-icon class="text-base">groups</mat-icon> Self-Taught Coders
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">
              Seeking rigorous academic foundations in algorithms, operating systems, and database internals without college tuition costs.
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div class="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <mat-icon class="text-base">co_present</mat-icon> Professors & TAs
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">
              Looking for a clean platform to publish verified laboratory guides and syllabus reference books for their enrolled sections.
            </p>
          </div>
        </div>
      </div>

      <!-- DEVELOPER PROFILE SECTION -->
      <div class="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-xs space-y-8">
        <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          
          <!-- Avatar / Profile Badge -->
          <div class="relative shrink-0">
            <div class="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-600 p-1 shadow-xl">
              <div class="w-full h-full bg-slate-900 rounded-2xl flex flex-col items-center justify-center text-white">
                <i class="fa-solid fa-user-graduate text-4xl sm:text-5xl text-indigo-400 mb-2"></i>
                <span class="text-2xs uppercase tracking-wider font-bold text-slate-300">Lead Architect</span>
              </div>
            </div>
            <div class="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-emerald-500 text-white text-2xs font-extrabold shadow-md flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span> Available
            </div>
          </div>

          <!-- Bio & Credentials -->
          <div class="space-y-4 text-center md:text-left flex-1">
            <div class="space-y-1">
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold">
                <mat-icon class="text-xs">badge</mat-icon> Student Engineer & Creator
              </div>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900">Purushottam Kumar</h2>
              <p class="text-sm font-semibold text-slate-500">Computer Science & Full-Stack Web Development</p>
            </div>

            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
              Passionate about designing scalable, accessible web architectures and academic tools. ScholarHub was designed and developed as a complete end-to-end full-stack demonstration for academic presentation and college viva evaluation.
            </p>

            <!-- Action & Contact Links -->
            <div class="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <a 
                routerLink="/"
                class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-2 transition-colors">
                <mat-icon class="text-sm">library_books</mat-icon> Browse All Textbooks
              </a>
              <a 
                routerLink="/contact"
                class="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-2 transition-colors">
                <mat-icon class="text-sm">mail</mat-icon> Contact Purushottam
              </a>
              <a 
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors">
                <i class="fa-brands fa-github"></i> GitHub Profile
              </a>
              <a 
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                class="px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center gap-2 transition-colors">
                <i class="fa-brands fa-linkedin"></i> LinkedIn
              </a>
            </div>

          </div>

        </div>

        <!-- Academic Viva & Technical Highlights -->
        <div class="pt-8 border-t border-slate-100">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Core Technology Stack & Architecture</h4>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div class="text-xs font-bold text-slate-900">Frontend Layer</div>
              <p class="text-2xs text-slate-500 mt-0.5">Angular 21 (Zoneless, Signals, OnPush)</p>
            </div>
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div class="text-xs font-bold text-slate-900">Styling & UI</div>
              <p class="text-2xs text-slate-500 mt-0.5">Tailwind CSS v4 + Material & FontAwesome</p>
            </div>
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div class="text-xs font-bold text-slate-900">Backend API</div>
              <p class="text-2xs text-slate-500 mt-0.5">Express 5 + Node.js (SSR Integration)</p>
            </div>
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div class="text-xs font-bold text-slate-900">Data & Endpoints</div>
              <p class="text-2xs text-slate-500 mt-0.5">RESTful JSON Engine + CORS</p>
            </div>
          </div>
        </div>
      </div>

      <!-- COLLEGE SUBMISSION DIRECTORY & LOCAL SETUP GUIDE -->
      <div class="p-8 sm:p-10 rounded-3xl bg-slate-900 text-slate-200 space-y-6">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-indigo-400">Project Deliverables</span>
          <h3 class="text-xl sm:text-2xl font-bold text-white mt-1">Project Directory Structure & Local Setup Commands</h3>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Included in the project documentation for submission and viva presentation.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Directory Architecture Box -->
          <div class="bg-slate-950 p-5 rounded-2xl border border-slate-800 font-mono text-2xs leading-relaxed text-slate-300 overflow-x-auto">
            <div class="text-indigo-400 font-bold mb-2">📁 SCHOLARHUB ARCHITECTURE TREE</div>
            <pre class="whitespace-pre">scholarhub/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── navbar/         # Header, brand & search
│   │   │   ├── footer/         # Credentials & links
│   │   │   ├── home/           # Hero, filter & book grid
│   │   │   ├── categories/     # FontAwesome subject cards
│   │   │   ├── book-details/   # Syllabus, reader & PDF
│   │   │   ├── about-us/       # Mission & Dev Profile
│   │   │   ├── contact/        # Study request reactive form
│   │   │   ├── add-book/       # Note contribution modal
│   │   │   └── reader-modal/   # Interactive note viewer
│   │   ├── models/             # book.model.ts interfaces
│   │   ├── services/           # book.service.ts (HTTP/Signals)
│   │   ├── app.routes.ts       # Modular standalone routes
│   │   └── app.config.ts       # zoneless & HTTP providers
│   ├── server.ts               # Express 5 REST API & Mock DB
│   └── index.html              # Shell, meta & typography
└── package.json</pre>
          </div>

          <!-- Local Setup Command Guide -->
          <div class="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 text-xs font-mono">
            <div class="text-emerald-400 font-bold">💻 STEP-BY-STEP SETUP COMMANDS</div>
            
            <div class="space-y-1">
              <span class="text-slate-400">1. Clone repository & install dependencies:</span>
              <div class="bg-slate-900 px-3 py-1.5 rounded-lg text-emerald-300">npm install</div>
            </div>

            <div class="space-y-1">
              <span class="text-slate-400">2. Launch Full-Stack Angular & Express Server:</span>
              <div class="bg-slate-900 px-3 py-1.5 rounded-lg text-emerald-300">npm run dev</div>
            </div>

            <div class="space-y-1">
              <span class="text-slate-400">3. Test REST API Endpoints via curl:</span>
              <div class="bg-slate-900 px-3 py-1.5 rounded-lg text-emerald-300">curl http://localhost:3000/api/books</div>
              <div class="bg-slate-900 px-3 py-1.5 rounded-lg text-emerald-300">curl http://localhost:3000/api/categories</div>
            </div>

            <div class="space-y-1">
              <span class="text-slate-400">4. Build production distribution bundle:</span>
              <div class="bg-slate-900 px-3 py-1.5 rounded-lg text-emerald-300">npm run build</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  `
})
export class AboutUsComponent {}
