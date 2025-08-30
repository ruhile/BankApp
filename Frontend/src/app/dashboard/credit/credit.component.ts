import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent {
  creditForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.creditForm = this.fb.group({
      creditAmount: ['', [Validators.required, Validators.min(1)]],
      note: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.creditForm.valid) {
      const creditAmount = this.creditForm.value.creditAmount;
      const note = this.creditForm.value.note;

      // ✅ Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        this.message = 'You are not logged in!';
        return;
      }

      const headers = new HttpHeaders().set('x-auth-token', token);

      // ✅ Call backend credit API
      this.http.post<any>(
        'http://localhost:5000/api/transactions/credit',
        { amount: creditAmount, note },
        { headers }
      ).subscribe({
        next: (res) => {
          console.log('Credit successful:', res);
          this.message = `Credited ₹${creditAmount}. New balance: ₹${res.balance}`;
        },
        error: (err) => {
          console.error('Credit failed:', err);
          this.message = err.error?.msg || 'Transaction failed';
        }
      });
    }
  }
}
