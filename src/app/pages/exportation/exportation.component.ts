import { Component, Input } from '@angular/core';
import { AcquistiService } from '../../_services/acquisti.service';
import { AnalyticsService } from '../../_services/analytics.service';
import { CategoryService } from '../../_services/category.service';
import { ItemService } from '../../_services/item.service';
import { OrderService } from '../../_services/order.service';
import { FornitoriService } from '../../_services/fornitori.service';
import * as XLSX from 'xlsx';

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
            title: 'Sales',
            items: [] // Placeholder, will be populated with observable data later
        },
        {
            title: 'Purchases',
            items: [] // Placeholder, will be populated with observable data later
        },
        {
            title: 'Categories',
            items: [] // Placeholder, will be populated with observable data later
        },
        {
            title: 'Suppliers',
            items: [] // Placeholder, will be populated with observable data later
        },
        {
            title: 'Items',
            items: [] // Placeholder, will be populated with observable data later
        },
        {
            title: 'Orders',
            items: [] // Placeholder, will be populated with observable data later
        }
    ];

    ngOnInit() {
        this.exportable_entities[0].items = this.acquistiService.purchases$;
        this.exportable_entities[1].items = this.analyticsService.sales$;
        this.exportable_entities[2].items = this.analyticsService.purchases$;
        this.exportable_entities[3].items = this.categoryService.categories$;
        this.exportable_entities[4].items = this.fornitoriService.suppliers$;
        this.exportable_entities[5].items = this.itemService.items$;
        this.exportable_entities[6].items = this.orderService.orders$;
    }

    push(item: any, entity: string, selected: boolean) {
        if (selected) {
            this.choosenToExport.push({ entity: entity, items: [item.value] });
        } else if (!selected) {
            this.choosenToExport = this.choosenToExport.filter(i =>
                i.entity !== entity || !this.deepEqual(i, { entity: entity, items: [item.value] })
            );
        }
        console.log(this.choosenToExport);
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

    exportToXLSX() {
        const csvData = this.generateCSVData();

        // Parse CSV data
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(this.csvToArray(csvData));
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Exported Data');

        // Generate a unique file name
        const currentDate = new Date().toISOString().slice(0, 10);
        const fileName = `exported_data_${currentDate}.xlsx`;

        // Save the workbook
        XLSX.writeFile(workbook, fileName);
    }

    generateCSVData(): string {
        let csv = '';

        // Headers
        csv += '"Entity","Attribute","Value"\n';

        for (const entity of this.choosenToExport) {
            const entityTitle = entity.entity;
            const items = entity.items;

            if (Array.isArray(items) && items.length > 0 && typeof items[0] === 'object') {
                const headers = this.extractHeaders(items[0]);
                for (const header of headers) {
                    for (let j = 0; j < items.length; j++) {
                        const item = items[j] || {};
                        const value = this.getFieldValue(item, header);

                        // Check if value is an array, convert it to string
                        const formattedValue = this.formatValue(value);

                        csv += `"${entityTitle}","${header}","${formattedValue}"\n`;
                    }
                }
            } else {
                for (let j = 0; j < items.length; j++) {
                    // Check if items[j] is an array, convert it to string
                    const formattedValue = this.formatValue(items[j]);

                    csv += `"${entityTitle}","-","${formattedValue}"\n`;
                }
            }
        }

        return csv;
    }

    formatValue(value: any): string {
        if (Array.isArray(value)) {
            return JSON.stringify(value, null, 2); // Convert array to string with pretty formatting
        } else {
            return value || '-';
        }
    }

    private extractHeaders(obj: any): string[] {
        const headers: string[] = [];
        this.extractHeadersRecursive(obj, '', headers);
        return headers;
    }

    private extractHeadersRecursive(obj: any, currentPath: string, headers: string[]) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const fullPath = currentPath === '' ? key : `${currentPath}.${key}`;
                if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                    this.extractHeadersRecursive(obj[key], fullPath, headers);
                } else {
                    headers.push(fullPath);
                }
            }
        }
    }

    private getFieldValue(obj: any, path: string): any {
        const keys = path.split('.');
        let value = obj;
        for (const key of keys) {
            if (value && value.hasOwnProperty(key)) {
                value = value[key];
            } else {
                return '';
            }
        }
        return value;
    }

    getMaxItemsCount(): number {
        let maxCount = 0;

        for (const entity of this.choosenToExport) {
            const items = entity.items; // Assuming items is an Observable
            if (items.length > maxCount) {
                maxCount = items.length;
            }
        }

        return maxCount;
    }

    private csvToArray(csvData: string): any[][] {
        const lines = csvData.split('\n');
        const result: any[][] = [];
        lines.forEach(line => {
            const row = line.split(',');
            result.push(row);
        });
        return result;
    }

    deepEqual(obj1: any, obj2: any): boolean {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }
}
