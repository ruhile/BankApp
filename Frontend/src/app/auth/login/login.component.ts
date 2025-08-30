import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      accountNumber: ['', Validators.required],
      password: ['', Validators.required]
    });
  }ngOnInit(): void {
  const token = localStorage.getItem('token');
  if (token) {
    this.router.navigate(['/dashboard']);  // auto redirect if already logged in
  }
}


  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
      this.authService.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          // ✅ Save token and user details from backend
          this.authService.saveAuthData(res.token, res.user);
          alert('valid credentials.');
          // ✅ Redirect to dashboard
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Login failed:', err);
          alert('Invalid credentials, please try again.');
        }
      });
    }
  }
}
