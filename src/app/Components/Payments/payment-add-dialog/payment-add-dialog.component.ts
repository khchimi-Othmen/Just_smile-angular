import {Component, Inject, OnInit} from '@angular/core';
import {Payment} from "../../../Models/Payment";
import {PaymentService} from "../../../Services/payment.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-payment-add-dialog',
  templateUrl: './payment-add-dialog.component.html',
  styleUrls: ['./payment-add-dialog.component.css']
})
export class PaymentAddDialogComponent {
  payment: Payment = new Payment();

  constructor(
    private paymentService: PaymentService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PaymentAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public patientId: number
  ) {}

  onSave(): void {
    if (!this.payment.amount || !this.payment.date) {
      this.snackBar.open('Veuillez remplir tous les champs obligatoires.', 'Fermer', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.paymentService.createPaymentWithPatient(this.patientId, this.payment).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
