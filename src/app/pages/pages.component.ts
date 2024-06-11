import {Component} from '@angular/core';
import {CategoryService} from "../_services/category.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss']
})
export class PagesComponent {

    constructor(
        private categoryService: CategoryService,
        public router: Router,
    ) {
    }

}
