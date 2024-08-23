import { Component, OnInit } from '@angular/core';
import { FinancialSummary } from '../../../Models/FinancialSummary';
import { FinancialSummaryService } from '../../../Services/financial-summary.service';

@Component({
  selector: 'aapp-financial-summary',
  templateUrl: './financial-summary.component.html',
  styleUrls: ['./financial-summary.component.css']
})
export class FinancialSummaryComponent implements OnInit {

  summaryForDay?: FinancialSummary;
  summaryForWeek?: FinancialSummary;
  summaryForMonth?: FinancialSummary;
  selectedDate: string = new Date().toISOString().split('T')[0];

  constructor(private financialSummaryService: FinancialSummaryService) {}

  ngOnInit(): void {
    this.updateSummaries();
  }

  onDateChange(event: any): void {
    const selectedDate = event.value;
    const adjustedDate = new Date(Date.UTC(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    ));
    this.selectedDate = adjustedDate.toISOString().split('T')[0];
    this.updateSummaries();
  }

  private updateSummaries(): void {
    this.getFinancialSummaryForDay(this.selectedDate);
    this.getFinancialSummaryForWeek(this.selectedDate);
    this.getFinancialSummaryForMonth(this.selectedDate);
  }

  private getFinancialSummaryForDay(date: string): void {
    this.financialSummaryService.getSummaryForDay(date).subscribe(
      (data) => this.summaryForDay = data,
      (error) => console.error('Error fetching financial summary for the day', error)
    );
  }

  private getFinancialSummaryForWeek(date: string): void {
    this.financialSummaryService.getSummaryForWeek(date).subscribe(
      (data) => this.summaryForWeek = data,
      (error) => console.error('Error fetching financial summary for the week', error)
    );
  }

  private getFinancialSummaryForMonth(date: string): void {
    this.financialSummaryService.getSummaryForMonth(date).subscribe(
      (data) => this.summaryForMonth = data,
      (error) => console.error('Error fetching financial summary for the month', error)
    );
  }
}
