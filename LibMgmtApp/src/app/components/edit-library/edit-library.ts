import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LibraryService } from '../../services/library.service';
import { Library } from '../../models/library.model';

@Component({
  selector: 'app-edit-library',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-library.html'
})
export class EditLibraryComponent implements OnInit {

  library: Library = {
    libraryId: 0,
    name: '',
    address: '',
    maximumCapacity: 0
  };

  libraries: Library[] = [];   
  isDuplicate: boolean = false;

  id!: number;
  isDirty: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private service: LibraryService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadLibrary();

    this.service.getAllLibraries().subscribe(data => {
      this.libraries = data;
    });
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

  checkDuplicate() {
    this.isDuplicate = this.libraries.some(lib =>
      lib.libraryId !== this.id &&
      lib.name.toLowerCase() === this.library.name.trim().toLowerCase() &&
      lib.address.toLowerCase() === this.library.address.trim().toLowerCase()
    );
  }

  updateLibrary() {
    if (this.isDuplicate) return;

    this.service.updateLibrary(this.id, this.library).subscribe({
      next: () => {
        alert("Library updated successfully");
        this.router.navigate(['/libraries']);
      },
      error: () => alert("Update failed")
    });
  }

  cancel() {
    this.router.navigate(['/libraries']);
  }
}
