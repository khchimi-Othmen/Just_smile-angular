import {Component, Inject, OnInit} from '@angular/core';
import { Appointment } from '../../../Models/Appointment';
import { AppointmentService } from '../../../Services/appointment.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-appointment-add-dialog',
  templateUrl: './appointment-add-dialog.component.html',
  styleUrls: ['./appointment-add-dialog.component.css']
})
export class AppointmentAddDialogComponent implements OnInit {
  appointment: Appointment = new Appointment();

  constructor(
    private appointmentService: AppointmentService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AppointmentAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public patientId: number
  ) {}
  ngOnInit(): void {
    // Initialiser l'heure de début et de fin par défaut à 08:01
    this.appointment.startTime = '08:01';
    this.appointment.endTime = '08:30'; // Vous pouvez changer cette valeur si nécessaire
  }

  onSave(): void {
    // Vérification des champs obligatoires
    if (!this.appointment.date || !this.appointment.startTime || !this.appointment.endTime || !this.appointment.reason) {
      this.snackBar.open('Veuillez remplir tous les champs obligatoires.', 'Fermer', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    // Vérification que startTime < endTime
    if (this.appointment.startTime >= this.appointment.endTime) {
      this.snackBar.open('L\'heure de début doit être inférieure à l\'heure de fin.', 'Fermer', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    // Envoi de la requête si tout est valide
    this.appointmentService.createAppointmentWithPatient(this.patientId, this.appointment).subscribe((result) => {
      if (result) {
        this.dialogRef.close(true);
      } else {
        this.snackBar.open('Ce créneau horaire est déjà réservé.', 'Fermer', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
