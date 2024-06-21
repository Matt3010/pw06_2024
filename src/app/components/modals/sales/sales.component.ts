import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnalyticsService } from '../../../_services/analytics.service';
import { Subscription } from 'rxjs';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexYAxis, ApexTitleSubtitle, ApexDataLabels, ApexStroke, ApexTooltip, ApexGrid } from 'ng-apexcharts';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis | ApexYAxis[];
    title: ApexTitleSubtitle;
    dataLabels: ApexDataLabels;
    stroke: ApexStroke;
    tooltip: ApexTooltip;
    grid: ApexGrid;
};

@Component({
    selector: 'app-sales',
    templateUrl: './sales.component.html',
    styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit, OnDestroy {
    public chartOptions: Partial<ChartOptions> | any;
    public data!: { totalQuantity: number, totalProfit: number, week: number, year: number }[];
    private salesSubscription!: Subscription;

    constructor(private analyticsService: AnalyticsService) { }

    ngOnInit(): void {
        this.salesSubscription = this.analyticsService.sales$.subscribe((res: any) => {
            if (res) {
                this.data = res;

                // Sort data first by week, then by year
                this.data.sort((a, b) => {
                    if (a.week !== b.week) {
                        return a.week - b.week;
                    } else {
                        return a.year - b.year;
                    }
                });

                this.createChart();
            }
        });
    }

    ngOnDestroy(): void {
        if (this.salesSubscription) {
            this.salesSubscription.unsubscribe();
        }
    }

    private createChart(): void {
        if (!this.data || this.data.length === 0) {
            return;
        }

        const weeks = this.data.map(d => `Week ${d.week}, Year ${d.year}`);
        const totalProfits = this.data.map(d => d.totalProfit);
        const totalQuantities = this.data.map(d => d.totalQuantity);

        this.chartOptions = {
            series: [
                {
                    name: "Total Profit",
                    data: totalProfits
                },
                {
                    name: "Total Quantity",
                    data: totalQuantities
                }
            ],
            chart: {
                height: 350,
                type: 'bar',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            title: {
                text: 'Sales Data',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: weeks,
                title: {
                    text: 'Week'
                }
            },
            yaxis: [
                {
                    title: {
                        text: 'Total Profit ($)'
                    },
                    labels: {
                        formatter: function (val: number) {
                            return val.toFixed(2);
                        }
                    }
                },
                {
                    opposite: true,
                    title: {
                        text: 'Total Quantity'
                    },
                    labels: {
                        formatter: function (val: number) {
                            return val.toFixed(2);
                        }
                    }
                }
            ],
            tooltip: {
                shared: true,
                intersect: false,
                y: {
                    formatter: function (val: any) {
                        return val;
                    }
                }
            }
        };
    }
}
