import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PatientListComponent} from "./Components/Patient/patient-list/patient-list.component";
import {PatientDetailsComponent} from "./Components/Patient/patient-details/patient-details.component";
import {PatientEditComponent} from "./Components/Patient/patient-edit/patient-edit.component";
import {PatientAddComponent} from "./Components/Patient/patient-add/patient-add.component";
import {PaymentListComponent} from "./Components/Payments/payment-list/payment-list.component";
import {PaymentEditComponent} from "./Components/Payments/payment-edit/payment-edit.component";
import {AppointmentListComponent} from "./Components/Appointments/appointment-list/appointment-list.component";
import {AppointmentEditComponent} from "./Components/Appointments/appointment-edit/appointment-edit.component";
import {DashboardComponent} from "./Components/Dashboard/dashboard/dashboard.component";
import {PurchaseListComponent} from "./Components/Purchases/purchase-list/purchase-list.component";
import {PurchaseEditComponent} from "./Components/Purchases/purchase-edit/purchase-edit.component";
import {PurchaseAddComponent} from "./Components/Purchases/purchase-add/purchase-add.component";
import {NotFoundComponent} from "./Components/Dashboard/not-found/not-found.component";




const routes: Routes = [
  { path: '', redirectTo: 'patients', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'patients', component: PatientListComponent },
  { path: 'patients/:id/details', component: PatientDetailsComponent },
  { path: 'patients/:id/edit', component: PatientEditComponent },
  { path: 'patients/add', component: PatientAddComponent },
  { path: 'payments', component: PaymentListComponent },
  { path: 'payments/:id/edit', component: PaymentEditComponent },
  { path: 'appointments', component: AppointmentListComponent },
  { path: 'appointments/:id/edit', component: AppointmentEditComponent },
  { path: 'purchases', component: PurchaseListComponent },
  { path: 'purchases/:id/edit', component: PurchaseEditComponent },
  { path: 'purchases/add', component: PurchaseAddComponent },
  { path: '**', component: NotFoundComponent }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
