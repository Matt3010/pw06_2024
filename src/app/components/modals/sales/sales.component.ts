import { Component, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { AnalyticsService } from '../../../_services/analytics.service';

@Component({
    selector: 'app-sales',
    templateUrl: './sales.component.html',
    styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

    private svg: any;
    private width = 928;
    private height = 300;
    private marginTop = 20;
    private marginRight = 20;
    private marginBottom = 30;
    private marginLeft = 30;
    private data!: { totalQuantity: number, totalProfit: number, week: number, year: number }[];

    constructor(
        private el: ElementRef,
        private analyticsService: AnalyticsService
    ) { }

    ngOnInit(): void {
        this.analyticsService.sales$.subscribe((res: any) => {
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
            this.createChart();
        });
    }

    private createChart(): void {
        if (!this.data || this.data.length === 0) {
            return;
        }

        d3.select(this.el.nativeElement).select('svg').remove();

        const x = d3.scaleLinear()
            .domain(d3.extent(this.data, d => d.week) as [number, number])
            .range([this.marginLeft, this.width - this.marginRight]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(this.data, d => d.totalProfit) as number]).nice()
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
                .text('↑ Total Profit ($)'));

        const line = d3.line<{ week: number, totalProfit: number }>()
            .x(d => x(d.week))
            .y(d => y(d.totalProfit));

        const line1 = d3.line<{ week: number, totalQuantity: number }>()
            .x(d => x(d.week))
            .y(d => y(d.totalQuantity));

        this.svg.append('path')
            .datum(this.data)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 1.5)
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .attr('d', line);

        this.svg.append('path')
            .datum(this.data)
            .attr('fill', 'none')
            .attr('stroke', 'green')
            .attr('stroke-width', 1.5)
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .attr('d', line1);

        const dot = this.svg.append('g')
            .attr('display', 'none');

        dot.append('circle')
            .attr('r', 2.5);

        dot.append('text')
            .attr('text-anchor', 'middle')
            .attr('y', -8);

        this.svg
            .on('pointerenter', () => this.pointerentered(dot))
            .on('pointermove', (event: MouseEvent) => this.pointermoved(event, dot, x, y))
            .on('pointerleave', () => this.pointerleft(dot))
            .on('touchstart', (event: TouchEvent) => event.preventDefault());
    }

    private pointermoved(event: MouseEvent, dot: any, x: any, y: any): void {
        const [xm, ym] = d3.pointer(event);
        const i = d3.leastIndex(this.data, d => Math.hypot(x(d.week) - xm, y(d.totalProfit) - ym));
        const d = this.data[i!];
        dot.attr('transform', `translate(${x(d.week)},${y(d.totalProfit)})`);
        dot.select('text').text(`$${d.totalProfit.toFixed(2)}`);
        this.svg.property('value', d).dispatch('input', { bubbles: true });
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
