import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentService } from '../../../Services/payment.service';
import { Payment } from "../../../Models/Payment";

@Component({
  selector: 'app-payment-list-dialog',
  templateUrl: './payment-list-dialog.component.html',
  styleUrls: ['./payment-list-dialog.component.css']
})
export class PaymentListDialogComponent implements OnInit {
  payments: Payment[] = [];
  totalPayment: number = 0; // Nouvelle propriété pour le total des paiements

  constructor(
    private paymentService: PaymentService,
    public dialogRef: MatDialogRef<PaymentListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public patientId: number
  ) {}

  ngOnInit(): void {
    this.loadPayments();
    this.loadTotalPayment();
  }

  loadPayments(): void {
    this.paymentService.getPaymentsByPatient(this.patientId).subscribe(data => {
      this.payments = data;
    });
  }

  loadTotalPayment(): void {
    this.paymentService.getTotalPaymentByPatientId(this.patientId).subscribe(total => {
      this.totalPayment = total;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
