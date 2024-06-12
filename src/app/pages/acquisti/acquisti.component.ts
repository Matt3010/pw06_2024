import {Component} from '@angular/core';
import {AcquistiService} from "../../_services/acquisti.service";
import {Purchase} from "../../../@data/purchase";
import {map} from "rxjs";
import {TreeTable} from "primeng/treetable";
import {TreeNode} from "primeng/api";
import {PurchasedItem} from "../../../@data/purchased-item";
import {Router} from "@angular/router";

@Component({
    selector: 'app-acquisti',
    templateUrl: './acquisti.component.html',
    styleUrls: ['./acquisti.component.scss']
})
export class AcquistiComponent {

    purchases$ = this.purchaseService.purchases$


    constructor(
        private purchaseService: AcquistiService,
        public router: Router
    ) {
    }

}
