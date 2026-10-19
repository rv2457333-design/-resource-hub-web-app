import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from './components/navbar/navbar';
import { FooterComponent } from './components/footer/footer';
import { ReaderModalComponent } from './components/reader-modal/reader-modal';
import { AddBookModalComponent } from './components/add-book/add-book';
import { BookService } from './services/book.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterOutlet,
    MatIconModule,
    NavbarComponent,
    FooterComponent,
    ReaderModalComponent,
    AddBookModalComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly bookService = inject(BookService);
}
