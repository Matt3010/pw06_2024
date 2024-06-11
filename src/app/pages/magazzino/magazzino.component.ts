import {Component} from '@angular/core';
import {ItemService} from "../../_services/item.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-magazzino',
    templateUrl: './magazzino.component.html',
    styleUrls: ['./magazzino.component.scss']
})
export class MagazzinoComponent {

    items$ = this.itemService.items$;

    constructor(
        private itemService: ItemService,
        public router: Router
    ) {
    }

}
