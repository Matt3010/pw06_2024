import { Component, Input } from '@angular/core';
import { AcquistiService } from '../../_services/acquisti.service';
import { AnalyticsService } from '../../_services/analytics.service';
import { CategoryService } from '../../_services/category.service';
import { ItemService } from '../../_services/item.service';
import { OrderService } from '../../_services/order.service';
import { FornitoriService } from '../../_services/fornitori.service';

@Component({
    selector: 'app-exportation',
    templateUrl: './exportation.component.html',
    styleUrls: ['./exportation.component.scss']
})
export class ExportationComponent {

    @Input() options: any = null;

    constructor(
        private acquistiService: AcquistiService,
        private analyticsService: AnalyticsService,
        private categoryService: CategoryService,
        private fornitoriService: FornitoriService,
        private itemService: ItemService,
        private orderService: OrderService,
    ) {}

    choosenToExport: { entity: string, items: any[] }[] = [];

    exportable_entities: any[] = [
        {
            title: 'Purchases',
            items: this.acquistiService.purchases$
        },
        {
            title: 'Sales',
            items: this.analyticsService.sales$
        },
        {
            title: 'Purchases',
            items: this.analyticsService.purchases$
        },
        {
            title: 'Categories',
            items: this.categoryService.categories$
        },
        {
            title: 'Suppliers',
            items: this.fornitoriService.suppliers$
        },
        {
            title: 'Items',
            items: this.itemService.items$
        },
        {
            title: 'Orders',
            items: this.orderService.orders$
        }
    ];

    push(item: any, entity: string, selected: boolean) {
        if (selected) {
            this.choosenToExport.push({ entity: entity, items: [item] });
        } else if (!selected) {
            this.choosenToExport = this.choosenToExport.filter(i =>
                i.entity !== entity || !this.deepEqual(i, { entity: entity, items: [item] })
            );
        }
        console.log(this.choosenToExport);
    }

    deepEqual(obj1: any, obj2: any): boolean {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }

    exportCSV() {
        const csvData = this.generateCSVData();

        // Create a Blob object for the CSV content
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

        // Generate a unique file name
        const currentDate = new Date().toISOString().slice(0, 10);
        const fileName = `exported_data_${currentDate}.csv`;

        // Create a link element, hide it, direct download
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.error('Download is not supported on this browser.');
        }
    }

    generateCSVData(): string {
        let csv = '';

        // Headers
        for (let i = 0; i < this.exportable_entities.length; i++) {
            csv += `"${this.exportable_entities[i].title}"`;
            if (i < this.exportable_entities.length - 1) {
                csv += ',';
            }
        }
        csv += '\n';

        // Data rows
        const maxItems = this.getMaxItemsCount();

        for (let j = 0; j < maxItems; j++) {
            for (let k = 0; k < this.exportable_entities.length; k++) {
                const items = this.exportable_entities[k].items.getValue(); // Assuming items is an Observable
                const item = items[j] || {}; // Handle case where items[j] might be undefined

                if (item) {
                    csv += `"${JSON.stringify(item)}"`;
                }

                if (k < this.exportable_entities.length - 1) {
                    csv += ',';
                }
            }
            csv += '\n';
        }

        return csv;
    }

    getMaxItemsCount(): number {
        let maxCount = 0;

        for (const entity of this.exportable_entities) {
            const items = entity.items.getValue(); // Assuming items is an Observable
            if (items.length > maxCount) {
                maxCount = items.length;
            }
        }

        return maxCount;
    }
}
