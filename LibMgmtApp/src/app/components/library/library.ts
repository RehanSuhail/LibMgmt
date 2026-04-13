import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { LibraryService } from '../../services/library.service';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './library.html',
  styleUrl: './library.css'
})
export class LibraryComponent implements OnInit {

  libraries: any[] = [];

  searchValue: string = '';
  notFound = false;
  loadError = false; 

  constructor(
    private libraryService: LibraryService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLibraries();
  }

  loadLibraries() {
    this.libraryService.getAllLibraries().subscribe({
      next: (data) => {
        this.libraries = data.map(lib => ({
          ...lib,
          showDetails: false
        }));

        this.notFound = false;
        this.loadError = false;   
        this.cd.detectChanges();
      },
      error: (e) => {
        console.error(e);
        this.loadError = true;
        this.libraries = [];
        this.cd.detectChanges();
      }
    });
  }

  // ✅ LIVE SEARCH
  searchLibrary() {
    if (!this.searchValue || this.searchValue.trim() === '') {
      this.loadLibraries();
      return;
    }

    this.libraryService.findLibraryByName(this.searchValue).subscribe({
      next: (data) => {
        this.libraries = data.map(lib => ({
          ...lib,
          showDetails: false
        }));
        this.notFound = false;
        this.loadError = false;
        this.cd.detectChanges();
      },
      error: () => {
        this.notFound = true;
        this.libraries = [];
        this.cd.detectChanges();
      }
    });
  }

  toggleDetails(lib: any) {
    lib.showDetails = !lib.showDetails;
    this.cd.detectChanges();
  }

}
