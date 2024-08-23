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
    console.log('AppointmentListComponent initialized, selectedDate:', this.selectedDate);
    this.loadAppointments();
  }


  loadAppointments(): void {
    const today = new Date();
    console.log('Loading appointments for date:', this.selectedDate || today);

    if (this.selectedDate) {
      this.appointmentService.getAppointmentsByDate(this.selectedDate).subscribe(data => {
        console.log('Appointments received:', data);
        this.appointments = data;
        this.dataSource.data = this.appointments;
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.error('Error loading appointments:', error);
      });
    } else {
      this.appointmentService.getAppointmentsByDate(today).subscribe(data => {
        console.log('Appointments received:', data);
        this.appointments = data;
        this.dataSource.data = this.appointments;
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.error('Error loading appointments:', error);
      });
    }
  }


  onDateChange(date: Date | null): void {
    if (date) {
      const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      this.selectedDate = utcDate;
      console.log('Date changed, new selectedDate:', this.selectedDate);
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
    console.log('Filter applied, filter value:', filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
