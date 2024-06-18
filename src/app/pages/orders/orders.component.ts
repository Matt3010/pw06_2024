import {Component} from '@angular/core';
import {OrderService} from "../../_services/order.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Observable} from "rxjs";
import {Order} from "../../../@data/order";

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

    orders$ = this.orderService.orders$;
    queryParams$: Observable<Params>;
    item: Order | null = null;

    constructor(
        public orderService: OrderService,
        public activatedRouter: ActivatedRoute,
        private router: Router
    ) {
        this.queryParams$ = this.activatedRouter.queryParams;
    }

    navigate(item: any) {
        this.item = item;
        this.router.navigateByUrl('/pages/dashboard?id=' + item._id);
    }

    closeItemDetails() {
        this.item = null;
        this.router.navigateByUrl('/pages/dashboard');
    }

}
