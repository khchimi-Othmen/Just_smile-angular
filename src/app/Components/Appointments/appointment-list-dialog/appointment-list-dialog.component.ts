import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppointmentService } from '../../../Services/appointment.service';
import { Appointment } from "../../../Models/Appointment";

@Component({
  selector: 'app-appointment-list-dialog',
  templateUrl: './appointment-list-dialog.component.html',
  styleUrls: ['./appointment-list-dialog.component.css']
})
export class AppointmentListDialogComponent implements OnInit {
  appointments: Appointment[] = [];

  constructor(
    private appointmentService: AppointmentService,
    public dialogRef: MatDialogRef<AppointmentListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public patientId: number
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService.getAppointmentsByPatientId(this.patientId).subscribe(data => {
      this.appointments = data;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
