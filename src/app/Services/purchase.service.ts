import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Purchase} from "../Models/Purchase";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  // private apiUrl = 'http://localhost:8088/api/purchases';  // L'URL de votre API
  private apiUrl = `${environment.apiUrl}/purchases`;

  constructor(private http: HttpClient) { }

  // Récupérer toutes les purchases
  getAllPurchases(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(this.apiUrl);
  }

  // Récupérer une purchase par ID
  getPurchaseById(id: number): Observable<Purchase> {
    return this.http.get<Purchase>(`${this.apiUrl}/${id}`);
  }

  // Créer une nouvelle purchase
  createPurchase(purchase: Purchase): Observable<Purchase> {
    return this.http.post<Purchase>(this.apiUrl, purchase);
  }

  // Mettre à jour une purchase existante
  updatePurchase(id: number, purchase: Purchase): Observable<Purchase> {
    return this.http.put<Purchase>(`${this.apiUrl}/${id}`, purchase);
  }

  // Supprimer une purchase
  deletePurchase(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Méthode pour récupérer les achats par plage de dates
  getPurchasesByDateRange(startDate: string, endDate: string): Observable<Purchase[]> {
    const url = `${this.apiUrl}/byDateRange?startDate=${startDate}&endDate=${endDate}`;
    return this.http.get<Purchase[]>(url);
  }

}
