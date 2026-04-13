import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { LibraryService } from '../../services/library.service';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './book.html'
})
export class BookComponent implements OnInit {

  books: any[] = [];
  groupedBooks: any[] = [];
  libraries: any[] = [];

  searchValue: string = '';
  notFound = false;
  loadError = false;

  constructor(
    private bookService: BookService,
    private libraryService: LibraryService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLibraries();
  }

  loadLibraries() {
    this.libraryService.getAllLibraries().subscribe({
      next: (libs) => {
        this.libraries = libs;
        this.loadError = false;
        this.loadBooks();
      },
      error: (e) => {
        console.error(e);
        this.loadError = true;
        this.books = [];
        this.groupedBooks = [];
        this.cd.detectChanges();
      }
    });
  }

  loadBooks() {
    this.bookService.getAllBooks().subscribe({
      next: (data) => {

        this.books = data
          .sort((a, b) => b.bookId - a.bookId)
          .map(book => ({
            ...book,
            showDetails: false,
            libraryName: this.getLibraryName(book.libraryId)
          }));

        this.groupBooksByLibrary();
        this.loadError = false;
        this.cd.detectChanges();
      },
      error: (e) => {
        console.error(e);
        this.loadError = true;
        this.books = [];
        this.groupedBooks = [];
        this.cd.detectChanges();
      }
    });
  }

  groupBooksByLibrary() {
    const grouped: any = {};

    this.books.forEach(book => {
      if (!grouped[book.libraryName]) {
        grouped[book.libraryName] = [];
      }
      grouped[book.libraryName].push(book);
    });

    this.groupedBooks = Object.keys(grouped).map(libName => ({
      libraryName: libName,
      books: grouped[libName]
    }));
  }

  getLibraryName(libraryId: number): string {
    const lib = this.libraries.find(l => l.libraryId === libraryId);
    return lib ? lib.name : 'Unknown Library';
  }

  searchBook() {
    if (!this.searchValue) {
      this.loadBooks();
      return;
    }

    this.bookService.findBookByName(this.searchValue).subscribe({
      next: (data) => {
        this.books = data.map(book => ({
          ...book,
          showDetails: false,
          libraryName: this.getLibraryName(book.libraryId)
        }));

        this.groupBooksByLibrary();
        this.notFound = false;
        this.loadError = false;
        this.cd.detectChanges();
      },
      error: () => {
        this.notFound = true;
        this.books = [];
        this.groupedBooks = [];
        this.cd.detectChanges();
      }
    });
  }

  toggleDetails(book: any) {
    book.showDetails = !book.showDetails;
    this.cd.detectChanges();
  }

  deleteBook(id: number) {
    if (confirm("Are you sure you want to delete this book?")) {
      this.bookService.deleteBook(id).subscribe(() => {
        alert("Deleted successfully");

        this.books = this.books.filter(b => b.bookId !== id);
        this.groupBooksByLibrary();
        this.cd.detectChanges();
      });
    }
  }

}
