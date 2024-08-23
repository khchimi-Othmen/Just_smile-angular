import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../../../Services/appointment.service';
import { Appointment } from '../../../Models/Appointment';

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.css']
})
export class AppointmentEditComponent implements OnInit {

  appointment: Appointment = new Appointment();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.appointmentService.getAppointmentById(id).subscribe(data => {
      this.appointment = data;
    });
  }

  updateAppointment(): void {
    if (this.appointment && this.appointment.appointmentId) {
      this.appointmentService.updateAppointment(this.appointment.appointmentId,this.appointment).subscribe(() => {
        this.router.navigate(['/appointments']); // Retour à la liste après la mise à jour
      });
    }
  }
}
