import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { LibraryService } from '../../services/library.service';
import { Book } from '../../models/book.model';
import { Library } from '../../models/library.model';

@Component({
  selector: 'app-delete-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-book.html'
})
export class DeleteBookComponent implements OnInit {

  id!: number;
  book!: Book;
  libraries: Library[] = [];
  libraryName: string = '';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private libraryService: LibraryService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadLibraries();
    this.loadBook();
  }

  loadBook() {
    this.bookService.getBookById(this.id).subscribe({
      next: (data) => {
        this.book = data;
        this.setLibraryName();
        this.cd.detectChanges();
      },
      error: () => alert("Book not found")
    });
  }

  loadLibraries() {
    this.libraryService.getAllLibraries().subscribe({
      next: (data) => {
        this.libraries = data;
        this.setLibraryName();
        this.cd.detectChanges();
      },
      error: () => alert("Failed to load libraries")
    });
  }

  setLibraryName() {
    if (this.book && this.libraries.length > 0) {
      const lib = this.libraries.find(l => l.libraryId === this.book.libraryId);
      this.libraryName = lib ? lib.name : 'Unknown Library';
    }
  }

  confirmDelete() {
    this.bookService.deleteBook(this.id).subscribe(() => {
      alert("Book deleted successfully");
      this.router.navigate(['/books']);
    });
  }

  cancel() {
    this.router.navigate(['/books']);
  }
}
