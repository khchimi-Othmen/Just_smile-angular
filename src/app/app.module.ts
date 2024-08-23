import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {PatientListComponent} from "./Components/Patient/patient-list/patient-list.component";
import { PatientDetailsComponent } from './Components/Patient/patient-details/patient-details.component';
import { PatientEditComponent } from './Components/Patient/patient-edit/patient-edit.component';
import { PatientAddComponent } from './Components/Patient/patient-add/patient-add.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { PaymentListDialogComponent } from './Components/Payments/payment-list-dialog/payment-list-dialog.component';
import { ConfirmDialogComponent } from './Components/Patient/confirm-dialog/confirm-dialog.component';
import { PaymentListComponent } from './Components/Payments/payment-list/payment-list.component';
import { PaymentEditComponent } from './Components/Payments/payment-edit/payment-edit.component';
import { PaymentAddDialogComponent } from './Components/Payments/payment-add-dialog/payment-add-dialog.component';
import { AppointmentListDialogComponent } from './Components/Appointments/appointment-list-dialog/appointment-list-dialog.component';
import { AppointmentAddDialogComponent } from './Components/Appointments/appointment-add-dialog/appointment-add-dialog.component';
import { AppointmentListComponent } from './Components/Appointments/appointment-list/appointment-list.component';
import { AppointmentEditComponent } from './Components/Appointments/appointment-edit/appointment-edit.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { DashboardComponent } from './Components/Dashboard/dashboard/dashboard.component';
import { PurchaseListComponent } from './Components/Purchases/purchase-list/purchase-list.component';
import { PurchaseEditComponent } from './Components/Purchases/purchase-edit/purchase-edit.component';
import { PurchaseAddComponent } from './Components/Purchases/purchase-add/purchase-add.component';
import { FinancialSummaryComponent } from './Components/Financial/financial-summary/financial-summary.component';
import {NgChartsModule} from "ng2-charts";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { FinancialDashboardComponent } from './Components/Dashboard/financial-dashboard/financial-dashboard.component';
import { FinancialSummaryCurveComponent } from './Components/Dashboard/financial-summary-curve/financial-summary-curve.component';
import { NotFoundComponent } from './Components/Dashboard/not-found/not-found.component';




@NgModule({
  declarations: [
    AppComponent,
    PatientListComponent,
    PatientDetailsComponent,
    PatientEditComponent,
    PatientAddComponent,
    PaymentListDialogComponent,
    ConfirmDialogComponent,
    PaymentListComponent,
    PaymentEditComponent,
    PaymentAddDialogComponent,
    AppointmentListDialogComponent,
    AppointmentAddDialogComponent,
    AppointmentListComponent,
    AppointmentEditComponent,
    DashboardComponent,
    PurchaseListComponent,
    PurchaseEditComponent,
    PurchaseAddComponent,
    FinancialSummaryComponent,
    FinancialDashboardComponent,
    FinancialSummaryCurveComponent,
    NotFoundComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    NgChartsModule,
    MatTabsModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

