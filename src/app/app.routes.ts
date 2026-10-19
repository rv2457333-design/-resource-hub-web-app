import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home').then((m) => m.HomeComponent),
    title: 'ScholarHub - College Mini Bookstore & Resource Hub'
  },
  {
    path: 'categories',
    loadComponent: () => import('./components/categories/categories').then((m) => m.CategoriesComponent),
    title: 'Subject Categories - ScholarHub'
  },
  {
    path: 'books/:id',
    loadComponent: () => import('./components/book-details/book-details').then((m) => m.BookDetailsComponent),
    title: 'Textbook Details & Syllabus - ScholarHub'
  },
  {
    path: 'about',
    loadComponent: () => import('./components/about-us/about-us').then((m) => m.AboutUsComponent),
    title: 'About Project & Developer Profile - ScholarHub'
  },
  {
    path: 'contact',
    loadComponent: () => import('./components/contact/contact').then((m) => m.ContactComponent),
    title: 'Contact & Student Requests - ScholarHub'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
