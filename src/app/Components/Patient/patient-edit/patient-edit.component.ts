import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Patient} from "../../../Models/Patient";
import {PatientService} from "../../../Services/patient.service";


@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css']
})
export class PatientEditComponent implements OnInit {

  // patient: Patient | null = null;
  patient: Patient = new Patient();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.patientService.getPatientById(id).subscribe(data => {
      this.patient = data;
    });
  }

  updatePatient(): void {
    if (this.patient && this.patient.patientId) {
      this.patientService.updatePatient(this.patient.patientId, this.patient).subscribe(() => {
        this.router.navigate(['/patients']); // Retourner à la liste après la mise à jour
      });
    }
  }
}
