import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { LibraryService } from '../../services/library.service';
import { Book } from '../../models/book.model';
import { Library } from '../../models/library.model';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-book.html'
})
export class EditBookComponent implements OnInit {

  id!: number;

  book: Book = {
    bookId: 0,
    title: '',
    author: '',
    category: '',
    price: 0,
    libraryId: 0
  };

  libraries: Library[] = [];
  isDuplicate: boolean = false;

  isDirty: boolean = false;  

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

  loadLibraries() {
    this.libraryService.getAllLibraries().subscribe({
      next: (data) => {
        this.libraries = data;
        this.cd.detectChanges();
      },
      error: () => alert("Failed to load libraries")
    });
  }

  loadBook() {
    this.bookService.getBookById(this.id).subscribe({
      next: (data) => {
        this.book = data;
        this.cd.detectChanges();
      },
      error: () => alert("Book not found")
    });
  }

  updateBook() {
  this.bookService.updateBook(this.id, this.book).subscribe({
    next: () => {
      alert("Book updated successfully");
      this.router.navigate(['/books']);
    },
    error: (err) => {
      if (err.status === 409) {
        this.isDuplicate = true;
      } else {
        alert("Update failed");
      }
    }
  });
}


  cancel() {
    this.router.navigate(['/books']);
  }
}
