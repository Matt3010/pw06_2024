import {Component} from '@angular/core';
import {CategoryService} from "../_services/category.service";
import {Router} from "@angular/router";
import {FornitoriService} from "../_services/fornitori.service";
import {ItemService} from "../_services/item.service";
import {AcquistiService} from "../_services/acquisti.service";

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss']
})
export class PagesComponent {

    constructor(
        private categoryService: CategoryService,
        public router: Router,
        private supplierService: FornitoriService,
        private itemService: ItemService,
        private purchaseService: AcquistiService,
    ) {
    }

}
