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

    errors: string[] = [];

    createForm: FormGroup = new FormGroup({
        supplier: new FormControl('', [Validators.required]),
    });

    constructor(
        private supplierService: FornitoriService,
        private injectorService: ComponentInjectorService
    ) {
        this.createForm.valueChanges.subscribe((res: any) => {
            this.getErrors();
        })
    }


    create() {
        const supplier: string = this.createForm.controls['supplier'].value
        this.supplierService.createNewSupplier(supplier);
        this.injectorService.destroyComponent();
    }

    getErrors() {
        this.errors = [];
    
        if (this.createForm.invalid) {
          Object.keys(this.createForm.controls).forEach((field) => {
            const control = this.createForm.get(field);
            if (control && control.errors && control.dirty) {
              Object.keys(control.errors).forEach((errorKey) => {
                let errorMessage = "";
                switch (errorKey) {
                  case "required":
                    errorMessage = `Invalid ${field}`;
                    break;
                  default:
                    errorMessage = `${field}: unknown error: ${errorKey}`;
                    break;
                }
                this.errors.push(errorMessage);
              });
            }
          });
        }
      }
}
