import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';  
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent implements OnInit {   
  loginForm!: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute   
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    const msg = this.route.snapshot.queryParamMap.get('message');
    if (msg === 'sessionExpired') {
      this.errorMessage = 'Your session has expired. Please login again.';
    }
  }

  login() {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;

    if (username === 'admin' && password === 'admin123') {
      this.authService.login();
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Invalid credentials';
    }
  }
}
