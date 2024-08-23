import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseService } from '../../../Services/purchase.service';
import { Purchase } from '../../../Models/Purchase';

@Component({
  selector: 'app-purchase-edit',
  templateUrl: './purchase-edit.component.html',
  styleUrls: ['./purchase-edit.component.css']
})
export class PurchaseEditComponent implements OnInit {

  purchase: Purchase = new Purchase();

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private purchaseService: PurchaseService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.purchaseService.getPurchaseById(id).subscribe(data => {
      this.purchase = data;
    });
  }

  updatePurchase(): void {
    if (this.purchase && this.purchase.purchaseId) {
      this.purchaseService.updatePurchase(this.purchase.purchaseId, this.purchase).subscribe(() => {
        this.router.navigate(['/purchases']); // Retourner à la liste après la mise à jour
      });
    }
  }
}
