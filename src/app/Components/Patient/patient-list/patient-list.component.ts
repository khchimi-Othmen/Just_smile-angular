import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from "../../../Models/Patient";
import { PatientService } from "../../../Services/patient.service";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {PaymentListDialogComponent} from "../../Payments/payment-list-dialog/payment-list-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {PaymentAddDialogComponent} from "../../Payments/payment-add-dialog/payment-add-dialog.component";
import {
  AppointmentListDialogComponent
} from "../../Appointments/appointment-list-dialog/appointment-list-dialog.component";
import {
  AppointmentAddDialogComponent
} from "../../Appointments/appointment-add-dialog/appointment-add-dialog.component";

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  patients: Patient[] = [];
  displayedColumns: string[] = ['nom', 'prenom', 'telephone', 'actions', 'payments', 'appointments'];
  dataSource = new MatTableDataSource<Patient>(this.patients);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private patientService: PatientService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.patientService.getAllPatients().subscribe(data => {
      this.patients = data;
      this.dataSource.data = this.patients;
      this.dataSource.paginator = this.paginator; // Connecter le paginator à la source de données
    });
  }
  confirmDeletePatient(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deletePatient(id);
      }
    });
  }
  deletePatient(id: number): void {
    this.patientService.deletePatient(id).subscribe(() => {
      this.loadPatients();
    });
  }

  editPatient(patientId: number): void {
    this.router.navigate(['/patients', patientId, 'edit']);
  }

  viewDetails(patientId: number): void {
    this.router.navigate(['/patients', patientId, 'details']);
  }
  viewPayments(patientId: number): void {
    const dialogRef = this.dialog.open(PaymentListDialogComponent, {
      width: '500px',
      data: patientId
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  openAddPaymentDialog(patientId: number): void {
    const dialogRef = this.dialog.open(PaymentAddDialogComponent, {
      width: '400px',
      data: patientId
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Rafraîchir la liste des paiements ou faire d'autres actions si nécessaire
      }
    });
  }

  // Ouvrir la boîte de dialogue pour afficher les rendez-vous
  viewAppointments(patientId: number): void {
    const dialogRef = this.dialog.open(AppointmentListDialogComponent, {
      width: '500px',
      data: patientId
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  // Ouvrir la boîte de dialogue pour ajouter un rendez-vous
  openAddAppointmentDialog(patientId: number): void {
    const dialogRef = this.dialog.open(AppointmentAddDialogComponent, {
      width: '400px',
      data: patientId
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Rafraîchir la liste des rendez-vous ou faire d'autres actions si nécessaire
      }
    });
  }
}
