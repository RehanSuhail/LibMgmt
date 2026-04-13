import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { LibraryService } from '../../services/library.service';
import { Book } from '../../models/book.model';
import { Library } from '../../models/library.model';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-book.html'
})
export class AddBookComponent implements OnInit {

  book: Book = {
    bookId: 0,
    title: '',
    author: '',
    category: '',
    price: 0,
    libraryId: 0
  };

  libraries: Library[] = [];
  books: Book[] = [];
  isDuplicate: boolean = false;

  constructor(
    private bookService: BookService,
    private libraryService: LibraryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLibraries();

    this.bookService.getAllBooks().subscribe(data => {
      this.books = data;
    });
  }

  loadLibraries() {
    this.libraryService.getAllLibraries().subscribe({
      next: (data) => this.libraries = data,
      error: () => alert("Failed to load libraries")
    });
  }

  saveBook() {
    if (!this.isFormValid()) return; 

    this.bookService.addBook(this.book).subscribe({
      next: () => {
        alert("Book added successfully");
        this.router.navigate(['/books']);
      },
      error: (err) => {
        if (err.status === 409) {
          this.isDuplicate = true; 
        } else {
          alert("Failed to add book");
        }
      }
    });
  }

  cancel() {
    this.router.navigate(['/books']);
  }

  isFormValid(): boolean {
    const isValid =
      this.book.title.trim() !== '' &&
      this.book.author.trim() !== '' &&
      this.book.category.trim() !== '' &&
      this.book.price > 0 &&
      this.book.libraryId !== 0;

    if (
      this.book.title.trim() === '' ||
      this.book.author.trim() === '' ||
      this.book.category.trim() === '' ||
      this.book.libraryId === 0
    ) {
      this.isDuplicate = false;
    }

    return isValid && !this.isDuplicate;
  }
}
