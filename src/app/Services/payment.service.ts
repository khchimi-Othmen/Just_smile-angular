import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {Payment} from "../Models/Payment"; // Assurez-vous que le chemin est correct

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  // private baseUrl = 'http://localhost:8088/api/payments';
  private apiUrl = `${environment.apiUrl}/payments`;

  constructor(private http: HttpClient) { }

  // Récupérer tous les paiements
  getAllPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/all`);
  }
  getPaymentById(paymentId: number): Observable<Payment> {
    const url = `${this.apiUrl}/${paymentId}`;
    return this.http.get<Payment>(url);
  }

  // Récupérer les paiements d'un patient spécifique par son ID
  getPaymentsByPatient(patientId: number): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/patient/${patientId}`);
  }

  // Créer un paiement pour un patient spécifique
  createPaymentWithPatient(patientId: number, payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${this.apiUrl}/create-with-patient/${patientId}`, payment);
  }

  // Mettre à jour un paiement existant par son ID
  updatePayment(paymentId: number, payment: Payment): Observable<Payment> {
    return this.http.put<Payment>(`${this.apiUrl}/${paymentId}`, payment);
  }

  // Supprimer un paiement par son ID
  deletePayment(paymentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${paymentId}`);
  }

  // Nouvelle méthode pour récupérer le total des paiements par patient ID
  getTotalPaymentByPatientId(patientId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total-by-patient/${patientId}`);
  }

  // Nouvelle méthode pour récupérer le total des paiements pour tous les patients
  getTotalPaymentsByPatient(): Observable<Map<string, Object>[]> {
    return this.http.get<Map<string, Object>[]>(`${this.apiUrl}/total-by-patient`);
  }

  getPaymentsForDay(date: string): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/day/${date}`);
  }

  // getPaymentsByDate(date: string): Observable<Payment[]> {
  //   const params = new HttpParams().set('date', date);
  //   return this.http.get<Payment[]>(`${this.baseUrl}/by-date`, { params });
  // }
}
