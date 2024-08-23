import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../../Services/payment.service';
import { Payment } from '../../../Models/Payment';

@Component({
  selector: 'app-payment-edit',
  templateUrl: './payment-edit.component.html',
  styleUrls: ['./payment-edit.component.css']
})
export class PaymentEditComponent implements OnInit {

  payment: Payment = new Payment();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.paymentService.getPaymentById(id).subscribe(data => {
      this.payment = data;
    });
  }

  updatePayment(): void {
    if (this.payment && this.payment.paymentId) {
      this.paymentService.updatePayment(this.payment.paymentId, this.payment).subscribe(() => {
        this.router.navigate(['/payments']); // Retourner à la liste après la mise à jour
      });
    }
  }
}
