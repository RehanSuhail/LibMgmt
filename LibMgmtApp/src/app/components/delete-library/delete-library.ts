import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LibraryService } from '../../services/library.service';
import { BookService } from '../../services/book.service';
import { Library } from '../../models/library.model';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-delete-library',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-library.html'
})
export class DeleteLibraryComponent implements OnInit {

  id!: number;
  library!: Library;

  booksInLibrary: Book[] = [];   

  constructor(
    private route: ActivatedRoute,
    private service: LibraryService,
    private bookService: BookService,   
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadLibrary();
    this.loadBooks();   
  }

  loadLibrary() {
    this.service.getLibraryById(this.id).subscribe({
      next: (data) => {
        this.library = data;
        this.cd.detectChanges();
      },
      error: () => alert("Library not found")
    });
  }

  loadBooks() {
    this.bookService.getAllBooks().subscribe({
      next: (data) => {
        this.booksInLibrary = data.filter(b => b.libraryId === this.id);
        this.cd.detectChanges();
      },
      error: () => alert("Failed to load books")
    });
  }

  confirmDelete() {
    this.service.deleteLibrary(this.id).subscribe({
      next: () => {
        alert("Library deleted successfully");
        this.router.navigate(['/libraries']);
      },
      error: () => alert("Delete failed")
    });
  }

  cancel() {
    this.router.navigate(['/libraries']);
  }
}
