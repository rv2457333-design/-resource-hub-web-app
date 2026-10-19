import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule],
  template: `
    <footer class="mt-auto bg-slate-900 text-slate-300 border-t border-slate-800">
      <!-- Main Footer Grid -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          <!-- Brand & Mission Column -->
          <div class="lg:col-span-2 space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md">
                <i class="fa-solid fa-graduation-cap text-lg"></i>
              </div>
              <span class="text-2xl font-bold tracking-tight text-white">Scholar<span class="text-indigo-400">Hub</span></span>
            </div>
            <p class="text-sm text-slate-400 leading-relaxed max-w-sm">
              An open-access academic mini bookstore and verified study note repository built for Computer Science & Engineering students. Curated by university researchers and student guilds.
            </p>
            <div class="flex items-center gap-3 pt-2">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white flex items-center justify-center text-slate-300 transition-colors" title="GitHub Repository">
                <i class="fa-brands fa-github"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white flex items-center justify-center text-slate-300 transition-colors" title="LinkedIn Profile">
                <i class="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="mailto:purushottamkumar22238@gmail.com" class="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white flex items-center justify-center text-slate-300 transition-colors" title="Email Developer">
                <i class="fa-solid fa-envelope"></i>
              </a>
            </div>
          </div>

          <!-- Academic Categories Quick Links -->
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-1.5">
              <mat-icon class="text-sm text-indigo-400">category</mat-icon> Core Subjects
            </h4>
            <ul class="space-y-2.5 text-sm">
              <li><a routerLink="/categories" class="hover:text-indigo-400 transition-colors">Data Structures & Algo</a></li>
              <li><a routerLink="/categories" class="hover:text-indigo-400 transition-colors">Modern C++ (CS201)</a></li>
              <li><a routerLink="/categories" class="hover:text-indigo-400 transition-colors">Enterprise Java</a></li>
              <li><a routerLink="/categories" class="hover:text-indigo-400 transition-colors">Full-Stack Web Dev</a></li>
              <li><a routerLink="/categories" class="hover:text-indigo-400 transition-colors">Artificial Intelligence</a></li>
              <li><a routerLink="/categories" class="hover:text-indigo-400 transition-colors">Operating Systems</a></li>
            </ul>
          </div>

          <!-- Project Navigation -->
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-1.5">
              <mat-icon class="text-sm text-indigo-400">explore</mat-icon> Portal
            </h4>
            <ul class="space-y-2.5 text-sm">
              <li><a routerLink="/" class="hover:text-indigo-400 transition-colors">Featured Books</a></li>
              <li><a routerLink="/categories" class="hover:text-indigo-400 transition-colors">Subject Catalog</a></li>
              <li><a routerLink="/about" class="hover:text-indigo-400 transition-colors">Project Architecture</a></li>
              <li><a routerLink="/contact" class="hover:text-indigo-400 transition-colors">Submit Book Request</a></li>
              <li><a routerLink="/about" class="hover:text-indigo-400 transition-colors">Developer Profile</a></li>
            </ul>
          </div>

          <!-- College Project Credentials -->
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-1.5">
              <mat-icon class="text-sm text-indigo-400">verified</mat-icon> College Project
            </h4>
            <div class="text-xs text-slate-400 space-y-2">
              <p><span class="text-slate-200 font-medium">Lead Developer:</span> Purushottam Kumar</p>
              <p><span class="text-slate-200 font-medium">Architecture:</span> Angular 21 (Zoneless) + Express.js Node API</p>
              <p><span class="text-slate-200 font-medium">Styling:</span> Tailwind CSS v4</p>
              <div class="pt-2">
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-2xs font-semibold">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  REST API Online
                </span>
              </div>
            </div>
          </div>

        </div>

        <!-- Bottom Copyright -->
        <div class="mt-12 pt-6 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 ScholarHub Academic Resource Hub. Designed for Academic Demonstration.</p>
          <p class="flex items-center gap-1 text-slate-400">
            Crafted with <mat-icon class="text-xs text-rose-500 inline">favorite</mat-icon> using Angular 21 & Node Express
          </p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
