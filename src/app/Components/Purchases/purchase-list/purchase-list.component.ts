// purchase-list.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Purchase } from "../../../Models/Purchase";
import { PurchaseService } from "../../../Services/purchase.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "../../Patient/confirm-dialog/confirm-dialog.component";
import { Router } from "@angular/router";

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css']
})
export class PurchaseListComponent implements OnInit {

  purchases: Purchase[] = [];
  displayedColumns: string[] = ['description', 'amount', 'date', 'actions'];
  dataSource = new MatTableDataSource<Purchase>(this.purchases);
  selectedMonth: Date | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private purchaseService: PurchaseService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.selectedMonth = new Date();
    this.loadPurchases();
  }

  loadPurchases(): void {
    if (this.selectedMonth) {
      const startOfMonth = new Date(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth(), 1).toISOString();
      const endOfMonth = new Date(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth() + 1, 0, 23, 59, 59).toISOString();

      this.purchaseService.getPurchasesByDateRange(startOfMonth, endOfMonth).subscribe(data => {
        this.purchases = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        this.dataSource.data = this.purchases;
        this.dataSource.paginator = this.paginator;
      });
    } else {
      this.purchaseService.getAllPurchases().subscribe(data => {
        this.purchases = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        this.dataSource.data = this.purchases;
        this.dataSource.paginator = this.paginator;
      });
    }
  }

  onMonthChange(date: Date | null): void {
    if (date) {
      this.selectedMonth = date;
      this.loadPurchases();
    }
  }

  confirmDeletePurchase(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deletePurchase(id);
      }
    });
  }

  deletePurchase(id: number): void {
    this.purchaseService.deletePurchase(id).subscribe(() => {
      this.loadPurchases();
    });
  }

  editPurchase(purchaseId: number): void {
    this.router.navigate(['/purchases', purchaseId, 'edit']);
  }
}
