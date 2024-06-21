import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {Subscription} from 'rxjs';
import {AnalyticsService} from '../../../_services/analytics.service';
import {ChartOptions} from "../sales/sales.component";

@Component({
    selector: 'app-purchases',
    templateUrl: './purchases.component.html',
    styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit, OnDestroy {

    public chartOptions: Partial<ChartOptions> | any;
    public data!: { totalQuantity: number, totalMoneySpent: number, week: number, year: number }[];
    private purchaseSubscription!: Subscription;

    constructor(
        private el: ElementRef,
        private analyticsService: AnalyticsService
    ) {
    }

    ngOnInit(): void {
        this.purchaseSubscription = this.analyticsService.purchases$.subscribe((res: any) => {
            if (res) {
                this.data = res;
                this.data.sort((a, b) => {
                    if (a.week !== b.week) {
                        return a.week - b.week && a.year - b.year;
                    } else {
                        return a.year - b.year;
                    }
                });

                console.log(this.data); // Check sorted data in console

                d3.select(this.el.nativeElement).select('svg').remove();
                this.createChart();
            }
        });
    }

    ngOnDestroy(): void {
        if (this.purchaseSubscription) {
            this.purchaseSubscription.unsubscribe();
        }
    }

    private createChart(): void {
        if (!this.data || this.data.length === 0) {
            return;
        }

        const weeks = this.data.map(d => `Week ${d.week}, Year ${d.year}`);
        const totalMoneySpent = this.data.map(d => d.totalMoneySpent);
        const totalQuantities = this.data.map(d => d.totalQuantity);

        this.chartOptions = {
            series: [
                {
                    name: "Total Money Spent",
                    data: totalMoneySpent
                },
                {
                    name: "Total Quantity",
                    data: totalQuantities
                }
            ],
            chart: {
                height: 285,
                type: 'line',
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
