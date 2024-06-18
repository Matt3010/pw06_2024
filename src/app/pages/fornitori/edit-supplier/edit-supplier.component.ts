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

    errors: string[] = [];

    editForm: FormGroup = new FormGroup({
        supplier: new FormControl('', [Validators.required]),
    })

    constructor(
        private fornitoreService: FornitoriService,
        private injectorService: ComponentInjectorService
    ) {
        this.editForm.valueChanges.subscribe((res: any) => {
            this.getErrors();
        })
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

    getErrors() {
        this.errors = [];
    
        if (this.editForm.invalid) {
          Object.keys(this.editForm.controls).forEach((field) => {
            const control = this.editForm.get(field);
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
