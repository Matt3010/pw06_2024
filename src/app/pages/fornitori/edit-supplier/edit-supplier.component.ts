import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ItemService} from "../../../_services/item.service";
import {ComponentInjectorService} from "../../../_utils/component-injector.service";
import {Supplier} from "../../../../@data/item";
import {FornitoriService} from "../../../_services/fornitori.service";

@Component({
    selector: 'app-edit-supplier',
    templateUrl: './edit-supplier.component.html',
    styleUrls: ['./edit-supplier.component.scss']
})
export class EditSupplierComponent implements OnInit{
    @Input() options: any;

    editForm: FormGroup = new FormGroup({
        supplier: new FormControl('', [Validators.required]),
    })

    constructor(
        private fornitoreService: FornitoriService,
        private injectorService: ComponentInjectorService
    ) {
    }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.editForm.controls['supplier'].setValue(this.options.item.fornitore)
    }

    edit() {
        const updatedItem: string = this.editForm.controls['supplier'].value;
        this.fornitoreService.patchSupplier(this.options.item.id, updatedItem)
        this.injectorService.destroyComponent();
    }

}
