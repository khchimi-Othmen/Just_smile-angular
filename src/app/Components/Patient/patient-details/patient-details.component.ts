import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patient } from "../../../Models/Patient";
import { PatientService } from "../../../Services/patient.service";

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  patient: Patient = new Patient();
  patientDetails: { label: string, value: any }[] = [];

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.patientService.getPatientById(id).subscribe(data => {
      this.patient = data;
      this.populatePatientDetails();
    });
  }

  private populatePatientDetails(): void {
    this.patientDetails = [
      { label: 'Nom', value: this.patient.nom },
      { label: 'Prénom', value: this.patient.prenom },
      { label: 'Date de Naissance', value: this.patient.dateNaissance ? new Date(this.patient.dateNaissance).toLocaleDateString() : '' },
      { label: 'Sexe', value: this.patient.sexe === 'M' ? 'Masculin' : 'Féminin' },
      { label: 'Adresse', value: this.patient.adresse },
      { label: 'Téléphone', value: this.patient.telephone },
      { label: 'Email', value: this.patient.email },
      { label: 'Date d\'Inscription', value: this.patient.dateInscription ? new Date(this.patient.dateInscription).toLocaleDateString() : '' }
    ];
  }
}
