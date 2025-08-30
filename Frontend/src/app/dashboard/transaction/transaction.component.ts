import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {

  transactions: any[] = [];

  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    this.fetchTransactions();
  }

  fetchTransactions(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('User not logged in');
      return;
    }

    const headers = new HttpHeaders().set('x-auth-token', token);

    // ✅ fetch from backend, not JSON server
    this.http.get<any[]>('http://localhost:5000/api/transactions/me', { headers }).subscribe({
      next: (data) => {
        this.transactions = data;
        console.log('Transactions fetched successfully', this.transactions);
      },
      error: (err) => {
        console.error('Error fetching transactions:', err);
      }
    });
  }
}
