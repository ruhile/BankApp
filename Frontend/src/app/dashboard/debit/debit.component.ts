import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-debit',
  templateUrl: './debit.component.html',
  styleUrls: ['./debit.component.css']
})
export class DebitComponent {
  debitForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.debitForm = this.fb.group({
      debitAmount: ['', [Validators.required, Validators.min(1)]],  // ✅ match HTML
      note: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.debitForm.valid) {
      const debitAmount = this.debitForm.value.debitAmount;   // ✅ match HTML
      const note = this.debitForm.value.note;

      // ✅ Read token from localStorage
      const token = localStorage.getItem('token');

      if (!token) {
        this.message = 'You are not logged in!';
        return;
      }

      const headers = new HttpHeaders().set('x-auth-token', token);

      // ✅ Call backend debit API
      this.http.post<any>(
        'http://localhost:5000/api/transactions/debit',
        { amount: debitAmount, note },    // backend expects "amount"
        { headers }
      ).subscribe({
        next: (res) => {
          console.log('Debit successful:', res);
          this.message = `Debited ₹${debitAmount}. New balance: ₹${res.balance}`;
        },
        error: (err) => {
          console.error('Debit failed:', err);
          this.message = err.error?.msg || 'Transaction failed';
        }
      });
    }
  }
}
