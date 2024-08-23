import { Component, OnInit } from '@angular/core';
import {ChartData, ChartOptions} from "chart.js";
import {FinancialSummaryService} from "../../../Services/financial-summary.service";

@Component({
  selector: 'app-financial-summary-curve',
  templateUrl: './financial-summary-curve.component.html',
  styleUrls: ['./financial-summary-curve.component.css']
})
export class FinancialSummaryCurveComponent implements OnInit {
  chartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.dataset.label + ': ' + context.raw + ' TND';
          }
        }
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'MMM DD'
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value + ' TND';
          }
        }
      }
    }
  };

  chartData!: ChartData<'line'>;

  constructor(private financialSummaryService: FinancialSummaryService) { }

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData(): void {
    const startDate = '2024-01-01';  // Exemple de date de début
    const endDate = '2024-12-31';    // Exemple de date de fin

    this.financialSummaryService.getSummaryForPeriod(startDate, endDate).subscribe(
        (data) => {
          if (data && data.payments && data.purchases) {
            this.chartData = {
              labels: data.payments.map(payment => new Date(payment.date)), // Convertion des dates en objets Date
              datasets: [
                {
                  label: 'Revenus',
                  data: data.payments.map(payment => payment.amount),
                  borderColor: '#4caf50',
                  fill: false,
                  tension: 0.4 // Rend la ligne courbée
                },
                {
                  label: 'Dépenses',
                  data: data.purchases.map(purchase => purchase.amount),
                  borderColor: '#f44336',
                  fill: false,
                  tension: 0.4 // Rend la ligne courbée
                }
              ]
            };
          } else {
            console.error('Les données financières sont incomplètes ou non définies.');
          }
        },
        (error) => console.error('Erreur lors de la récupération des données financières', error)
    );
  }
}
