import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Appointment } from '../../../Models/Appointment';
import { AppointmentService } from '../../../Services/appointment.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../Patient/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  appointments: Appointment[] = [];
  displayedColumns: string[] = ['date', 'time', 'reason', 'patient', 'actions'];
  dataSource = new MatTableDataSource<Appointment>(this.appointments);
  selectedDate: Date | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private appointmentService: AppointmentService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.selectedDate = new Date();
    this.loadAppointments();
  }

  loadAppointments(): void {
    const today = new Date();
    if (this.selectedDate) {
      this.appointmentService.getAppointmentsByDate(this.selectedDate).subscribe(data => {
        this.appointments = data;
        this.dataSource.data = this.appointments;
        this.dataSource.paginator = this.paginator;
      });
    } else {
      this.appointmentService.getAppointmentsByDate(today).subscribe(data => {
        this.appointments = data;
        this.dataSource.data = this.appointments;
        this.dataSource.paginator = this.paginator;
      });
    }
  }

  onDateChange(date: Date | null): void {
    if (date) {
      this.selectedDate = date;
      this.loadAppointments();
    }
  }

  confirmDeleteAppointment(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteAppointment(id);
      }
    });
  }

  deleteAppointment(id: number): void {
    this.appointmentService.deleteAppointment(id).subscribe(() => {
      this.loadAppointments();
    });
  }

  editAppointment(appointmentId: number): void {
    this.router.navigate(['/appointments', appointmentId, 'edit']);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
