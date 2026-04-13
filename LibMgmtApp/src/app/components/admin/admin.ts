import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class AdminComponent {

  constructor(private router: Router) {}

  goToLibraries() {
    this.router.navigate(['/libraries']);
  }

  goToBooks() {
    this.router.navigate(['/books']);
  }
}
