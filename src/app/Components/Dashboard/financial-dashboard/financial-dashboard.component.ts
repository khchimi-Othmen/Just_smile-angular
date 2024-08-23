import { Component, OnInit } from '@angular/core';
import {ChartData, ChartOptions} from "chart.js";
import {FinancialSummaryService} from "../../../Services/financial-summary.service";

@Component({
  selector: 'app-financial-dashboard',
  templateUrl: './financial-dashboard.component.html',
  styleUrls: ['./financial-dashboard.component.css']
})
export class FinancialDashboardComponent implements OnInit {
  startDate: string = new Date().toISOString().split('T')[0];
  endDate: string = new Date().toISOString().split('T')[0];
  lineChartData!: ChartData<'line'>;

  chartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.dataset.label + ': ' + context.raw + ' TND';
          }
        }
      }
    }
  };

  constructor(private financialSummaryService: FinancialSummaryService) { }

  ngOnInit(): void {
    this.updateChart();
  }

  onStartDateChange(event: any): void {
    this.startDate = new Date(Date.UTC(
        event.value.getFullYear(),
        event.value.getMonth(),
        event.value.getDate()
    )).toISOString();
    this.updateChart();
  }

  onEndDateChange(event: any): void {
    this.endDate = new Date(Date.UTC(
        event.value.getFullYear(),
        event.value.getMonth(),
        event.value.getDate()
    )).toISOString();
    this.updateChart();
  }


  private updateChart(): void {
    this.financialSummaryService.getSummaryForPeriod(this.startDate, this.endDate).subscribe(
        (data) => {
          console.log(data);  // Pour vérifier les données reçues
          this.lineChartData = {
            labels: ['Revenus', 'Dépenses', 'Total Net'],
            datasets: [{
              label: 'Résumé Financier',
              data: [data.totalIncome, data.totalOutcome, data.netTotal],
              borderColor: '#4caf50',
              backgroundColor: 'rgba(76, 175, 80, 0.1)',
            }]
          };
        },
        (error) => console.error('Erreur lors de la récupération du résumé financier de la période', error)
    );
  }
}
