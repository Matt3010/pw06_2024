import {Component} from '@angular/core';
import {OrderService} from "../../_services/order.service";
import {TreeNode} from "primeng/api";
import {Order} from "../../../@data/order";

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

    orders$ = this.orderService.orders$;

    constructor(
        public orderService: OrderService
    ) {
    }


}
