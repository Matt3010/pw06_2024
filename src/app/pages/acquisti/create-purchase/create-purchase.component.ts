import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ComponentInjectorService} from "../../../_utils/component-injector.service";
import {Supplier} from "../../../../@data/item";
import {FornitoriService} from "../../../_services/fornitori.service";
import {AcquistiService} from "../../../_services/acquisti.service";
import {ItemService} from "../../../_services/item.service";

@Component({
    selector: 'app-create-purchase',
    templateUrl: './create-purchase.component.html',
    styleUrls: ['./create-purchase.component.scss']
})
export class CreatePurchaseComponent {

    suppliers$ = this.supplierService.suppliers$;
    purchasableItems$ = this.itemService.items$
    itemSelected: any = null;
    quantity: number = 0;
    unitPrice: number = 0;

    items: any[] = [];

    createForm: FormGroup = new FormGroup({
        supplierId: new FormControl('', [Validators.required]),
        invoiceDate: new FormControl(this.formatDate(new Date()), [Validators.required]),
        invoiceNumber: new FormControl('', [Validators.required]),
    });

    constructor(
        private supplierService: FornitoriService,
        private itemService: ItemService,
        private purchaseService: AcquistiService,
        private injectorService: ComponentInjectorService,
    ) {
    }

    create() {

        const body = {
            supplierId: this.createForm.controls['supplierId'].value,
            invoiceDate: this.createForm.controls['invoiceDate'].value,
            invoiceNumber: this.createForm.controls['invoiceNumber'].value,
            items: this.items,
        }

        this.purchaseService.createNewPurchase({...body});
        this.injectorService.destroyComponent();
    }


    private formatDate(date: any) {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [year, month, day].join('-');
    }


    calc() {
        // Verifica che itemSelected e quantity siano definiti
        if (!this.itemSelected || this.quantity == null) {
            console.error("itemSelected o quantity non definiti");
            return;
        }

        this.itemSelected.unitPrice = this.unitPrice;

        const index = this.items.findIndex((i: Supplier) => i.title === this.itemSelected!.title);

        if (index !== -1) {
            this.items[index].quantity += +this.quantity;
        } else {
            this.itemSelected.quantity = this.quantity;
            this.items.push(this.itemSelected);
        }
        this.quantity = 0;
    }

    calculateTotalInvoicePrice(): number {
        let total: number = 0;
        this.items.forEach((i: any) => {
            total += (i.unitPrice * i.quantity)
        })
        return total;
    }

    removeItem(item: any) {
        this.items = this.items.filter((i: any) => i !== item)
    }

    modifyOperation(item: any, operator: string = '+', field: string) {

        if (item.quantity <= 1 && operator === '-') {
            this.removeItem(item);
        }

        const index = this.items.findIndex((i: any) => i === item);

        if (index !== -1) {
            const operations: { [key: string]: (a: number, b: number) => number } = {
                '+': (a, b) => a + b,
                '-': (a, b) => a - b,
                '*': (a, b) => a * b,
                '/': (a, b) => a / b
            };

            const operation = operations[operator];

            if (operation) {
                const currentValue = this.items[index][field];
                const newValue = operation(currentValue, 1);
                if (newValue >= 0) {
                    this.items[index][field] = newValue;
                } else if (operator === '+') {
                    this.items[index][field] = newValue; // In questo caso, newValue è sempre >= 0
                } else {
                    this.items[index][field] = 0;
                }
            } else {
                throw new Error(`Unsupported operator: ${operator}`);
            }
        } else {
            throw new Error('Item not found');
        }
    }


}
