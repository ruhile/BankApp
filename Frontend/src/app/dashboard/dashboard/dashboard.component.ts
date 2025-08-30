import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  userName = '';
  balance = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const user = this.authService.getUser();
    if (user) {
      this.userName = user.name;
      this.fetchBalance();
    }
  }

  fetchBalance() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders().set('x-auth-token', token);

    this.http.get<any>('http://localhost:5000/api/transactions/me', { headers }).subscribe({
      next: (transactions) => {
        if (transactions.length > 0) {
          // ✅ get last transaction balance
          this.balance = transactions[0].balanceAfter;
        }
      },
      error: (err) => console.error('Error fetching balance:', err)
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }
}
