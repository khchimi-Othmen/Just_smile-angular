import { Component, OnInit } from '@angular/core';
import { FinancialSummaryService } from '../../../Services/financial-summary.service';
import { ChartOptions, ChartData } from 'chart.js';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    chartOptions: ChartOptions<'bar'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return context.dataset.label + ': ' + context.raw + ' TND'; // Changement en TND
                    }
                }
            }
        }
    };

    dayChartData!: ChartData<'bar'>;
    weekChartData!: ChartData<'bar'>;
    monthChartData!: ChartData<'bar'>;

    selectedDate: string = new Date().toISOString().split('T')[0];

    constructor(private financialSummaryService: FinancialSummaryService) { }

    ngOnInit(): void {
        this.updateCharts();
    }

    onDateChange(event: any): void {
        const selectedDate = event.value;
        const adjustedDate = new Date(Date.UTC(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate()
        ));
        this.selectedDate = adjustedDate.toISOString().split('T')[0];
        this.updateCharts();
    }

    private updateCharts(): void {
        this.getFinancialSummaryForDay(this.selectedDate);
        this.getFinancialSummaryForWeek(this.selectedDate);
        this.getFinancialSummaryForMonth(this.selectedDate);
    }

    private getFinancialSummaryForDay(date: string): void {
        this.financialSummaryService.getSummaryForDay(date).subscribe(
            (data) => {
                this.dayChartData = {
                    labels: ['Revenus', 'Dépenses', 'Total Net'], // Labels en français
                    datasets: [{
                        label: 'Résumé Financier Journalier', // Titre en français
                        data: [data.totalIncome, data.totalOutcome, data.netTotal],
                        backgroundColor: ['#4caf50', '#f44336', '#2196f3'],
                    }]
                };
            },
            (error) => console.error('Erreur lors de la récupération du résumé financier du jour', error) // Message d'erreur en français
        );
    }

    private getFinancialSummaryForWeek(date: string): void {
        this.financialSummaryService.getSummaryForWeek(date).subscribe(
            (data) => {
                this.weekChartData = {
                    labels: ['Revenus', 'Dépenses', 'Total Net'], // Labels en français
                    datasets: [{
                        label: 'Résumé Financier Hebdomadaire', // Titre en français
                        data: [data.totalIncome, data.totalOutcome, data.netTotal],
                        backgroundColor: ['#4caf50', '#f44336', '#2196f3'],
                    }]
                };
            },
            (error) => console.error('Erreur lors de la récupération du résumé financier de la semaine', error) // Message d'erreur en français
        );
    }

    private getFinancialSummaryForMonth(date: string): void {
        this.financialSummaryService.getSummaryForMonth(date).subscribe(
            (data) => {
                this.monthChartData = {
                    labels: ['Revenus', 'Dépenses', 'Total Net'], // Labels en français
                    datasets: [{
                        label: 'Résumé Financier Mensuel', // Titre en français
                        data: [data.totalIncome, data.totalOutcome, data.netTotal],
                        backgroundColor: ['#4caf50', '#f44336', '#2196f3'],
                    }]
                };
            },
            (error) => console.error('Erreur lors de la récupération du résumé financier du mois', error) // Message d'erreur en français
        );
    }
}
