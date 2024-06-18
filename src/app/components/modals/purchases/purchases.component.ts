import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import * as d3 from "d3";
import {Subscription} from "rxjs";
import {AnalyticsService} from "../../../_services/analytics.service";

@Component({
    selector: 'app-purchases',
    templateUrl: './purchases.component.html',
    styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit, OnDestroy {

    private svg: any;
    private width = 928;
    private height = 230;
    private marginTop = 20;
    private marginRight = 20;
    private marginBottom = 30;
    private marginLeft = 30;
    public data!: { totalQuantity: number, totalMoneySpent: number, week: number, year: number }[];
    private purchaseSubscription!: Subscription;

    constructor(
        private el: ElementRef,
        private analyticsService: AnalyticsService
    ) {
    }

    ngOnInit(): void {
        this.purchaseSubscription = this.analyticsService.purchases$.subscribe((res: any) => {
            // Assuming `res` is the array of data objects
            this.data = res;

            // Sort data first by week, then by year
            this.data.sort((a, b) => {
                if (a.week !== b.week) {
                    return a.week - b.week;
                } else {
                    return a.year - b.year;
                }
            });

            console.log(this.data); // Check sorted data in console

            // Remove existing SVG if it exists
            d3.select(this.el.nativeElement).select('svg').remove();
            this.createChart();
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

        const x = d3.scaleLinear()
            .domain(d3.extent(this.data, d => d.week) as [number, number])
            .range([this.marginLeft, this.width - this.marginRight]);

        const yProfit = d3.scaleLinear()
            .domain([0, d3.max(this.data, d => d.totalMoneySpent) as number]).nice()
            .range([this.height - this.marginBottom, this.marginTop]);

        const yQuantity = d3.scaleLinear()
            .domain([0, d3.max(this.data, d => d.totalQuantity) as number]).nice()
            .range([this.height - this.marginBottom, this.marginTop]);

        this.svg = d3.select(this.el.nativeElement).append('svg')
            .attr('width', '100%')
            .attr('height', this.height)
            .attr('viewBox', `0 0 ${this.width} ${this.height}`)
            .attr('style', 'max-width: 100%; height: auto; overflow: visible; font: 10px sans-serif;');

        const line = d3.line<{ week: number, totalMoneySpent: number }>()
            .x(d => x(d.week))
            .y(d => yProfit(d.totalMoneySpent));

        const line1 = d3.line<{ week: number, totalQuantity: number }>()
            .x(d => x(d.week))
            .y(d => yQuantity(d.totalQuantity));

        // Aggiungi la linea per il profitto totale
        this.svg.append('path')
            .datum(this.data)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 1.5)
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .attr('d', line);

        // Aggiungi punti lungo la linea del profitto totale
        this.svg.selectAll('.dot-profit')
            .data(this.data)
            .enter().append('circle')
            .attr('class', 'dot-profit')
            .attr('cx', (d: any) => x(d.week))
            .attr('cy', (d: any) => yProfit(d.totalMoneySpent))
            .attr('r', 3)
            .attr('fill', 'steelblue');

        // Aggiungi la linea per la quantità totale
        this.svg.append('path')
            .datum(this.data)
            .attr('fill', 'none')
            .attr('stroke', 'green')
            .attr('stroke-width', 1.5)
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .attr('d', line1);

        // Aggiungi punti lungo la linea della quantità totale
        this.svg.selectAll('.dot-quantity')
            .data(this.data)
            .enter().append('circle')
            .attr('class', 'dot-quantity')
            .attr('cx', (d: any) => x(d.week))
            .attr('cy', (d:any) => yQuantity(d.totalQuantity))
            .attr('r', 3)
            .attr('fill', 'green');

        // Aggiungi asse x
        this.svg.append('g')
            .attr('transform', `translate(0,${this.height - this.marginBottom})`)
            .call(d3.axisBottom(x).ticks(this.data.length).tickFormat(d3.format('d')).tickSizeOuter(0));

        // Aggiungi asse y per il profitto
        this.svg.append('g')
            .attr('transform', `translate(${this.marginLeft},0)`)
            .call(d3.axisLeft(yProfit))
            .call((g: any) => g.select('.domain').remove())
            .call((g: any) => g.selectAll('.tick line').clone()
                .attr('x2', this.width - this.marginLeft - this.marginRight)
                .attr('stroke-opacity', 0.1))
            .append('text')
            .attr('x', -this.marginLeft)
            .attr('y', 10)
            .attr('fill', 'currentColor')
            .attr('text-anchor', 'start')
            .text('↑ Total Profit ($)');


        // Aggiungi asse y per la quantità
        this.svg.append('g')
            .attr('transform', `translate(${this.width - this.marginRight},0)`)
            .call(d3.axisRight(yQuantity))
            .call((g: any) => g.select('.domain').remove())
            .call((g: any) => g.selectAll('.tick line').clone()
                .attr('x2', this.marginLeft)
                .attr('stroke-opacity', 0.1))
            .append('text')
            .attr('x', this.width - this.marginRight)
            .attr('y', 10)
            .attr('fill', 'currentColor')
            .attr('text-anchor', 'end')
            .text('↑ Total Quantity');

    }

    private pointermoved(event: MouseEvent, dot: any, x: any, y: any): void {
        const [xm, ym] = d3.pointer(event);

        // Gestione per il grafico della linea totalProfit
        const iProfit = d3.leastIndex(this.data, d => Math.hypot(x(d.week) - xm, y(d.totalMoneySpent) - ym));
        const dProfit = this.data[iProfit!];
        dot.attr('transform', `translate(${x(dProfit.week)},${y(dProfit.totalMoneySpent)})`);
        dot.select('text').text(`Profit: $${d3.format(',.2f')(dProfit.totalMoneySpent)}`); // Formatta il profitto con due decimali

        // Gestione per il grafico della linea totalQuantity
        const iQuantity = d3.leastIndex(this.data, d => Math.hypot(x(d.week) - xm, y(d.totalQuantity) - ym));
        const dQuantity = this.data[iQuantity!];
        // Mostra entrambe le linee nello stesso punto
        // Aggiungi un secondo punto o testo a `dot` per il grafico totalQuantity
        // Esegui il render dello stesso punto del grafico totalProfit

        // Aggiungi qui la logica per il grafico totalQuantity
        // Formatta la quantità se necessario

        // Esegui il rendering combinato dei due punti, se necessario
        dot.attr('transform', `translate(${x(dProfit.week)},${y(dProfit.totalMoneySpent)})`);
        dot.select('text').text(`Money Spent: $${d3.format(',.2f')(dProfit.totalMoneySpent)} | Quantity: ${dQuantity.totalQuantity}`);
        this.svg.property('value', dProfit).dispatch('input', {bubbles: true});
    }


    private pointerentered(dot: any): void {
        dot.attr('display', null);
    }

    private pointerleft(dot: any): void {
        dot.attr('display', 'none');
        this.svg.node().value = null;
        this.svg.dispatch('input', {bubbles: true});
    }
}
