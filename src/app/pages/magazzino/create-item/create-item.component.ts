import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../_services/category.service";
import {ItemService} from "../../../_services/item.service";
import {Supplier} from "../../../../@data/item";
import {ComponentInjectorService} from "../../../_utils/component-injector.service";

@Component({
    selector: 'app-create-item',
    templateUrl: './create-item.component.html',
    styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent {

    errors: string[] = [];

    categories$ = this.categoryService.categories$;

    createForm: FormGroup = new FormGroup({
        ASIN: new FormControl('', [Validators.required]),
        quantity: new FormControl(0, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+$')]),
        title: new FormControl('', [Validators.required]),
        category: new FormControl('', [Validators.required])
    });

    constructor(
        private categoryService: CategoryService,
        private itemService: ItemService,
        private injectorService: ComponentInjectorService
    ) {
        this.createForm.valueChanges.subscribe((res: any) => {
            this.getErrors();
        })
    }


    create() {

        const item: Partial<Supplier> = {
            quantity: this.createForm.controls['quantity'].value,
            title: this.createForm.controls['title'].value,
            ASIN: this.createForm.controls['ASIN'].value,
            categoryId: this.createForm.controls['category'].value.toString()
        };

        this.itemService.createNewItem(item);
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
                  case "minlength":
                    errorMessage = `${field} must be more than 0`;
                    break;
                  case "pattern":
                    errorMessage = `${field} must contain only numbers`;
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
