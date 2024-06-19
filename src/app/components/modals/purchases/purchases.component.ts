import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { Subscription } from 'rxjs';
import { AnalyticsService } from '../../../_services/analytics.service';

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
    ) { }

    ngOnInit(): void {
        this.purchaseSubscription = this.analyticsService.purchases$.subscribe((res: any) => {
            if (res) {
                this.data = res;
                this.data.sort((a, b) => {
                    if (a.week !== b.week) {
                        return a.week - b.week;
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

        if (this.data.length === 1) {
            this.createBarChart();
        } else {
            this.createLineChart();
        }
    }

    private createLineChart(): void {
        const x = d3.scaleLinear()
            .domain(d3.extent(this.data, d => d.week) as [number, number])
            .range([this.marginLeft, this.width - this.marginRight]);

        const yMoneySpent = d3.scaleLinear()
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

        this.svg.append('g')
            .attr('transform', `translate(0,${this.height - this.marginBottom})`)
            .call(d3.axisBottom(x).ticks(this.data.length).tickFormat(d3.format('d')).tickSizeOuter(0));

        this.svg.append('g')
            .attr('transform', `translate(${this.marginLeft},0)`)
            .call(d3.axisLeft(yMoneySpent))
            .call((g: any) => g.select('.domain').remove())
            .call((g: any) => g.selectAll('.tick line').clone()
                .attr('x2', this.width - this.marginLeft - this.marginRight)
                .attr('stroke-opacity', 0.1))
            .call((g: any) => g.append('text')
                .attr('x', -this.marginLeft)
                .attr('y', 10)
                .attr('fill', 'currentColor')
                .attr('text-anchor', 'start')
                .text('↑ Total Money Spent ($)'));

        this.svg.append('g')
            .attr('transform', `translate(${this.width - this.marginRight},0)`)
            .call(d3.axisRight(yQuantity))
            .call((g: any) => g.select('.domain').remove())
            .call((g: any) => g.selectAll('.tick line').clone()
                .attr('x2', this.marginLeft)
                .attr('stroke-opacity', 0.1))
            .call((g: any) => g.append('text')
                .attr('x', this.width - this.marginRight)
                .attr('y', 10)
                .attr('fill', 'currentColor')
                .attr('text-anchor', 'end')
                .text('↑ Total Quantity'));

        const lineMoneySpent = d3.line<{ week: number, totalMoneySpent: number }>()
            .x(d => x(d.week))
            .y(d => yMoneySpent(d.totalMoneySpent));

        const lineQuantity = d3.line<{ week: number, totalQuantity: number }>()
            .x(d => x(d.week))
            .y(d => yQuantity(d.totalQuantity));

        this.svg.append('path')
            .datum(this.data)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 1.5)
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .attr('d', lineMoneySpent);

        this.svg.append('path')
            .datum(this.data)
            .attr('fill', 'none')
            .attr('stroke', 'green')
            .attr('stroke-width', 1.5)
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .attr('d', lineQuantity);

        const dot = this.svg.append('g')
            .attr('display', 'none');

        dot.append('circle')
            .attr('r', 2.5);

        dot.append('text')
            .attr('text-anchor', 'middle')
            .attr('y', -8);

        this.svg
            .on('pointerenter', () => this.pointerentered(dot))
            .on('pointermove', (event: MouseEvent) => this.pointermoved(event, dot, x, yMoneySpent))
            .on('pointerleave', () => this.pointerleft(dot))
            .on('touchstart', (event: TouchEvent) => event.preventDefault());
    }

    private createBarChart(): void {
        const x = d3.scaleBand()
            .domain(['totalMoneySpent', 'totalQuantity'])
            .range([this.marginLeft, this.width - this.marginRight])
            .padding(0.4);

        const y = d3.scaleLinear()
            .domain([0, d3.max(this.data, d => Math.max(d.totalMoneySpent, d.totalQuantity)) as number])
            .range([this.height - this.marginBottom, this.marginTop]);

        this.svg = d3.select(this.el.nativeElement).append('svg')
            .attr('width', '100%')
            .attr('height', this.height)
            .attr('viewBox', `0 0 ${this.width} ${this.height}`)
            .attr('style', 'max-width: 100%; height: auto; overflow: visible; font: 10px sans-serif;');

        this.svg.append('g')
            .attr('transform', `translate(0,${this.height - this.marginBottom})`)
            .call(d3.axisBottom(x).tickSizeOuter(0));

        this.svg.append('g')
            .attr('transform', `translate(${this.marginLeft},0)`)
            .call(d3.axisLeft(y))
            .call((g: any) => g.select('.domain').remove())
            .call((g: any) => g.selectAll('.tick line').clone()
                .attr('x2', this.width - this.marginLeft - this.marginRight)
                .attr('stroke-opacity', 0.1))
            .call((g: any) => g.append('text')
                .attr('x', -this.marginLeft)
                .attr('y', 10)
                .attr('fill', 'currentColor')
                .attr('text-anchor', 'start')
                .text('↑ Value'));

        const bars = this.svg.selectAll('.bar')
            .data([this.data[0]]);

        bars.enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', (d: any) => x('totalMoneySpent')!)
            .attr('y', (d: any) => y(d.totalMoneySpent))
            .attr('width', x.bandwidth() / 2)
            .attr('height', (d: any) => y(0) - y(d.totalMoneySpent))
            .attr('fill', 'steelblue');

        bars.enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', (d: any) => x('totalQuantity')! + x.bandwidth() / 2)
            .attr('y', (d: any) => y(d.totalQuantity))
            .attr('width', x.bandwidth() / 2)
            .attr('height', (d: any) => y(0) - y(d.totalQuantity))
            .attr('fill', 'green');
    }

    private pointermoved(event: MouseEvent, dot: any, x: any, y: any): void {
        const [xm, ym] = d3.pointer(event);

        const iMoneySpent = d3.leastIndex(this.data, d => Math.hypot(x(d.week) - xm, y(d.totalMoneySpent) - ym));
        const dMoneySpent = this.data[iMoneySpent!];

        const iQuantity = d3.leastIndex(this.data, d => Math.hypot(x(d.week) - xm, y(d.totalQuantity) - ym));
        const dQuantity = this.data[iQuantity!];

        dot.attr('transform', `translate(${x(dMoneySpent.week)},${y(dMoneySpent.totalMoneySpent)})`);
        dot.select('text').text(`Money Spent: $${d3.format(',.2f')(dMoneySpent.totalMoneySpent)} | Quantity: ${dQuantity.totalQuantity}`);
        this.svg.property('value', dMoneySpent).dispatch('input', { bubbles: true });
    }

    private pointerentered(dot: any): void {
        dot.attr('display', null);
    }

    private pointerleft(dot: any): void {
        dot.attr('display', 'none');
        this.svg.node().value = null;
        this.svg.dispatch('input', { bubbles: true });
    }
}
