import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private fb: FormBuilder, private authService: AuthService,    private router: Router) {}

  registerForm = this.fb.group({
    name: ['', Validators.required],
    accountNumber: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          alert('Registration successful');
          console.log(res);
          console.log(this.registerForm.value);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard']); // ✅ Redirect here      
        },
        error: (err) => {
          alert(err.error.msg || 'Registration failed');
          console.error(err);
        }
      });
    }
  }
}