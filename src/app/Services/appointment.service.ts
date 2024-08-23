import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Appointment} from "../Models/Appointment";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = 'http://localhost:8088/api/appointments';

  constructor(private http: HttpClient) { }

  getAllAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  getAppointmentById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${id}`);
  }

  getAppointmentsByPatientId(patientId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/patient/${patientId}`);
  }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl, appointment);
  }

  updateAppointment(id: number, appointment: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.apiUrl}/${id}`, appointment);
  }

  deleteAppointment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  assignAppointmentToPatient(appointmentId: number, patientId: number): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.apiUrl}/${appointmentId}/assignToPatient/${patientId}`, {});
  }

  createAppointmentWithPatient(patientId: number, appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.apiUrl}/patient/${patientId}`, appointment);
  }


  // Vérifier la disponibilité d'une date pour un rendez-vous
  checkAvailability(patientId: number, date: string, time: string): Observable<boolean> {
    const params = new HttpParams()
      .set('patientId', patientId.toString())
      .set('date', date)
      .set('time', time);

    return this.http.get<boolean>(`${this.apiUrl}/check-availability`, { params });
  }

  // Réserver un rendez-vous à une date spécifique
  reserveAppointment(patientId: number, date: string, time: string, reason: string): Observable<Appointment> {
    const params = new HttpParams()
      .set('patientId', patientId.toString())
      .set('date', date)
      .set('time', time)
      .set('reason', reason);

    return this.http.post<Appointment>(`${this.apiUrl}/reserve`, null, { params });
  }
  getAppointmentsByDate(date: Date): Observable<Appointment[]> {
    // Formater la date en YYYY-MM-DD
    const formattedDate = date.toISOString().split('T')[0];
    return this.http.get<Appointment[]>(`${this.apiUrl}/by-date`, { params: { date: formattedDate } });
  }


}
