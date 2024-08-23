import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Patient} from "../Models/Patient";
import {Payment} from "../Models/Payment";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseUrl = 'http://localhost:8088/api/patients'; // L'URL de base de votre API Spring Boot

  constructor(private http: HttpClient) { }

  // Récupérer tous les patients
  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.baseUrl}`);
  }

  // Récupérer un patient par ID
  getPatientById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.baseUrl}/${id}`);
  }

  // Créer un nouveau patient
  createPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.baseUrl}`, patient);
  }

  // Mettre à jour un patient
  updatePatient(id: number, patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.baseUrl}/${id}`, patient);
  }

  // Supprimer un patient
  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  // Récupérer les paiements d'un patient par son ID
  getPaymentsByPatient(patientId: number): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.baseUrl}/patient/${patientId}`);
  }
}
