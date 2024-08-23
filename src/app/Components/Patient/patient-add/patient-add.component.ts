import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Patient} from "../../../Models/Patient";
import {PatientService} from "../../../Services/patient.service";


@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.css']
})
export class PatientAddComponent {

  patient: Patient = new Patient();

  constructor(
    private patientService: PatientService,
    private router: Router
  ) {}

  addPatient(): void {
    this.patientService.createPatient(this.patient).subscribe(() => {
      this.router.navigate(['/patients']); // Retourner à la liste après l'ajout
    });
  }
}
