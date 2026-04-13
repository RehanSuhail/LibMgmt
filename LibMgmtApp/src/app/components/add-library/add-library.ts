import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LibraryService } from '../../services/library.service';
import { Library } from '../../models/library.model';

@Component({
  selector: 'app-add-library',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-library.html'
})
export class AddLibraryComponent implements OnInit {

  library: Library = {
    libraryId: 0,
    name: '',
    address: '',
    maximumCapacity: 0
  };

  libraries: Library[] = [];
  isDuplicate: boolean = false;

  constructor(
    private service: LibraryService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.service.getAllLibraries().subscribe(data => {
      this.libraries = data;
    });
  }

  saveLibrary() {
    if (!this.isFormValid()) return;

    this.service.addLibrary(this.library).subscribe(() => {
      alert("Library added successfully");
      this.cd.detectChanges();
      this.router.navigate(['/libraries']);
    });
  }

  cancel() {
    this.router.navigate(['/libraries']);
  }

  isFormValid(): boolean {
    const isValid =
      this.library.name.trim() !== '' &&
      this.library.address.trim() !== '' &&
      this.library.maximumCapacity >= 1;

    if (this.library.name.trim() !== '' && this.library.address.trim() !== '') {
      this.isDuplicate = this.libraries.some(lib =>
        lib.name.toLowerCase() === this.library.name.trim().toLowerCase() &&
        lib.address.toLowerCase() === this.library.address.trim().toLowerCase()
      );
    } else {
      this.isDuplicate = false; 
    }

    return isValid && !this.isDuplicate;
  }
}
