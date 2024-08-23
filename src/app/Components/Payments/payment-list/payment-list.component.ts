import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Payment } from '../../../Models/Payment';
import { PaymentService } from '../../../Services/payment.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../Patient/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {

  payments: Payment[] = [];
  displayedColumns: string[] = ['montant', 'date', 'patient', 'actions'];
  dataSource = new MatTableDataSource<Payment>(this.payments);
  selectedDate: Date | null = null; // Ajout de la variable pour la date sélectionnée

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
      private paymentService: PaymentService,
      private dialog: MatDialog,
      private router: Router
  ) { }

  ngOnInit(): void {
    // Initialize selectedDate with today's date
    this.selectedDate = new Date();

    // Format today's date as 'YYYY-MM-DD'
    const year = this.selectedDate.getFullYear();
    const month = ('0' + (this.selectedDate.getMonth() + 1)).slice(-2);
    const day = ('0' + this.selectedDate.getDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;

    // Load payments for today's date
    this.loadPayments(formattedDate);
  }


  loadPayments(date?: string): void {
    this.paymentService.getPaymentsForDay(date!).subscribe(data => {
      this.payments = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.dataSource.data = this.payments;
      this.dataSource.paginator = this.paginator;
    });
  }

  onDateChange(date: Date | null): void {
    if (date) {
      this.selectedDate = date;
      this.loadPayments(date.toISOString().split('T')[0]); // Formate automatiquement la date en 'yyyy-MM-dd'
    }
  }






  confirmDeletePayment(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deletePayment(id);
      }
    });
  }

  deletePayment(id: number): void {
    this.paymentService.deletePayment(id).subscribe(() => {
      this.loadPayments(); // Recharger les paiements après suppression
    });
  }

  editPayment(paymentId: number): void {
    this.router.navigate(['/payments', paymentId, 'edit']);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
