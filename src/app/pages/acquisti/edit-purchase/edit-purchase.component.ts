import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../_services/category.service";
import {ComponentInjectorService} from "../../../_utils/component-injector.service";
import {AcquistiService} from "../../../_services/acquisti.service";
import {FornitoriService} from "../../../_services/fornitori.service";
import {PurchasedItem} from "../../../../@data/purchased-item";
import {Purchase} from "../../../../@data/purchase";

@Component({
    selector: 'app-edit-purchase',
    templateUrl: './edit-purchase.component.html',
    styleUrls: ['./edit-purchase.component.scss']
})
export class EditPurchaseComponent implements OnInit {

    @Input() options: any;
    suppliers$ = this.supplierService.suppliers$;

    constructor(
        private categoryService: CategoryService,
        private acquistiService: AcquistiService,
        private injectorService: ComponentInjectorService,
        private supplierService: FornitoriService
    ) {
    }

    editForm: FormGroup = new FormGroup({
        supplierId: new FormControl(''),
        invoiceDate: new FormControl('', [Validators.required]),
        invoiceNumber: new FormControl('', [Validators.required]),
    })

    ngOnInit() {
        this.editForm.get('invoiceDate')!.patchValue(this.formatDate(new Date(this.options.item.invoiceDate)))!;
        this.editForm.get('invoiceNumber')!.patchValue(this.options.item.invoiceNumber)!;
        this.editForm.get('supplierId')!.patchValue(this.options.item.supplierId.id)!;
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

    edit() {
        const updatedItem: Purchase = {
            supplierId: this.editForm.get('supplierId')!.value,
            invoiceDate: this.editForm.get('invoiceDate')!.value,
            invoiceNumber: this.editForm.get('invoiceNumber')!.value,
            items: this.options.item.items,
            id: this.options.item.id
        };

        this.acquistiService.patchPurchase(updatedItem)

        //this.itemService.patchItem(asin,{...updatedItem})
        this.injectorService.destroyComponent();
    }


}
