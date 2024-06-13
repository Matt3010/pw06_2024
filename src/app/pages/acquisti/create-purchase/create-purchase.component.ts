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
    itemSelected: Supplier | null = null;
    quantity: number = 0;

    items: Supplier[] = [];

    createForm: FormGroup = new FormGroup({
        supplierId: new FormControl('', [Validators.required]),
        invoiceDate: new FormControl(this.formatDate(new Date()), [Validators.required]),
        invoiceNumber: new FormControl('', [Validators.required]),
    });

    constructor(
        private supplierService: FornitoriService,
        private itemService: ItemService,
        private purchaseService: AcquistiService,
        private injectorService: ComponentInjectorService
    ) {
    }

    create() {

        const item: Partial<Supplier> = {
            quantity: this.createForm.controls['quantity'].value,
            title: this.createForm.controls['title'].value,
            ASIN: this.createForm.controls['ASIN'].value,
            categoryId: this.createForm.controls['category'].value.toString()
        };

        // this.itemService.createNewItem(item);
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

        const index = this.items.findIndex((i: Supplier) => i.title === this.itemSelected!.title);

        if (index !== -1) {
            this.items[index].quantity += +this.quantity;
        } else {
            this.itemSelected.quantity = this.quantity;
            this.items.push(this.itemSelected);
        }
    }

}
