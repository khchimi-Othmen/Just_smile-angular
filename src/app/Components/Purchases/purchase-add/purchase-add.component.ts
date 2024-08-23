import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Purchase } from '../../../Models/Purchase';
import { PurchaseService } from '../../../Services/purchase.service';

@Component({
  selector: 'app-purchase-add',
  templateUrl: './purchase-add.component.html',
  styleUrls: ['./purchase-add.component.css']
})
export class PurchaseAddComponent {

  purchase: Purchase = new Purchase();

  constructor(
      private purchaseService: PurchaseService,
      private router: Router
  ) {}

  addPurchase(): void {
    this.purchaseService.createPurchase(this.purchase).subscribe(() => {
      this.router.navigate(['/purchases']); // Retourner à la liste après l'ajout
    });
  }
}
