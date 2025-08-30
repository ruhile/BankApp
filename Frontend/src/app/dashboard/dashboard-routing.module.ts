import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DebitComponent } from './debit/debit.component';
import { CreditComponent } from './credit/credit.component';
import { TransactionComponent } from './transaction/transaction.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
    {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'credit', component: CreditComponent, canActivate: [AuthGuard]},
      { path: 'debit', component: DebitComponent, canActivate: [AuthGuard] },
      { path: 'transactions', component: TransactionComponent, canActivate: [AuthGuard]
 }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
