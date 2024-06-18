import {Component, Input} from '@angular/core';
import {ComponentInjectorService} from "../../../_utils/component-injector.service";
import {AuthService} from "../../../_services/auth.service";
import {AcquistiService} from "../../../_services/acquisti.service";

@Component({
    selector: 'app-invoice-details',
    templateUrl: './invoice-details.component.html',
    styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent {

    @Input() options: any;


    constructor(
        public injectoreComponent: ComponentInjectorService,
        public authService: AuthService,
        private purchaseService: AcquistiService,
    ) {
    }

    calculateTotalInvoicePrice(): number {
        let total: number = 0;
        this.options.item.items.forEach((i: any) => {
            total += (i.unitPrice * i.quantity)
        })
        return total;
    }

    modifyOperation(item: any, operator: string = '+', field: string) {

        if (item.quantity <= 1 && operator === '-') {
            this.removeItem(item);
        }

        const index = this.options.item.items.findIndex((i: any) => i === item);

        if (index !== -1) {
            const operations: { [key: string]: (a: number, b: number) => number } = {
                '+': (a, b) => a + b,
                '-': (a, b) => a - b,
                '*': (a, b) => a * b,
                '/': (a, b) => a / b
            };

            const operation = operations[operator];

            if (operation) {
                const currentValue = this.options.item.items[index][field];
                const newValue = operation(currentValue, 1);
                if (newValue >= 0) {
                    this.options.item.items[index][field] = newValue;
                } else if (operator === '+') {
                    this.options.item.items[index][field] = newValue; // In questo caso, newValue è sempre >= 0
                } else {
                    this.options.item.items[index][field] = 0;
                }
            } else {
                throw new Error(`Unsupported operator: ${operator}`);
            }
        } else {
            throw new Error('Item not found');
        }

        console.log(this.options)

        this.purchaseService.patchPurchase({...this.options.item, supplierId: this.options.item.supplierId.id});
    }

    removeItem(item: any) {
        this.options.item.items = this.options.item.items.filter((i: any) => i !== item);
        this.purchaseService.patchPurchase({...this.options.item, supplierId: this.options.item.supplierId.id});
    }


}
