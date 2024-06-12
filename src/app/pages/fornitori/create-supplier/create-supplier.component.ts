import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ComponentInjectorService} from "../../../_utils/component-injector.service";
import {FornitoriService} from "../../../_services/fornitori.service";

@Component({
    selector: 'app-create-supplier',
    templateUrl: './create-supplier.component.html',
    styleUrls: ['./create-supplier.component.scss']
})
export class CreateSupplierComponent {

    createForm: FormGroup = new FormGroup({
        supplier: new FormControl('', [Validators.required]),
    });

    constructor(
        private supplierService: FornitoriService,
        private injectorService: ComponentInjectorService
    ) {
    }


    create() {
        const supplier: string = this.createForm.controls['supplier'].value
        this.supplierService.createNewSupplier(supplier);
        this.injectorService.destroyComponent();
    }
}
