import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../_services/category.service";
import {ItemService} from "../../../_services/item.service";
import {Item} from "../../../../@data/item";
import {ComponentInjectorService} from "../../../_utils/component-injector.service";

@Component({
    selector: 'app-edit-item',
    templateUrl: './edit-item.component.html',
    styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {

    @Input() options: any;
    categories$ = this.categoryService.categories$;

    editForm: FormGroup = new FormGroup({
        ASIN: new FormControl(''),
        quantity: new FormControl(''),
        title: new FormControl('', [Validators.required]),
        category: new FormControl('', [Validators.required]),
    })

    constructor(
        private categoryService: CategoryService,
        private itemService: ItemService,
        private injectorService: ComponentInjectorService
    ) {
    }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.editForm.controls['ASIN'].setValue(this.options.item.ASIN)
        this.editForm.controls['quantity'].setValue(this.options.item.quantity)
        this.editForm.controls['title'].setValue(this.options.item.title)
        this.editForm.controls['category'].setValue(this.options.item.categoryId.id)
    }

    edit() {
        const updatedItem: Partial<Item> = {
            quantity: this.editForm.controls['quantity'].value,
            title: this.editForm.controls['title'].value,
            categoryId: this.editForm.controls['category'].value.toString()
        };

        const asin = this.editForm.controls['ASIN'].value;
        this.itemService.patchItem(asin,{...updatedItem})
        this.injectorService.destroyComponent();
    }

}
