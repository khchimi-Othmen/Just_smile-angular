import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {FinancialSummary} from "../Models/FinancialSummary";
import {Payment} from "../Models/Payment";

@Injectable({
  providedIn: 'root'
})
export class FinancialSummaryService {

  // private apiUrl = `${environment.apiUrl}/financial-summaries`;
  private apiUrl = 'http://localhost:8088/api/financial-summaries';

  constructor(private http: HttpClient) { }

  getSummaryForDay(date: string): Observable<FinancialSummary> {
    return this.http.get<FinancialSummary>(`${this.apiUrl}/day/${date}`);
  }

  getSummaryForWeek(date: string): Observable<FinancialSummary> {
    return this.http.get<FinancialSummary>(`${this.apiUrl}/week/${date}`);
  }

  getSummaryForMonth(date: string): Observable<FinancialSummary> {
    return this.http.get<FinancialSummary>(`${this.apiUrl}/month/${date}`);
  }
  getSummaryForPeriod(startDateTime: string, endDateTime: string): Observable<FinancialSummary> {
    return this.http.get<FinancialSummary>(`${this.apiUrl}/period`, {
      params: {
        startDateTime: startDateTime,
        endDateTime: endDateTime
      }
    });
  }

}
