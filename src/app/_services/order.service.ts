import {Injectable} from '@angular/core';
import {BehaviorSubject, map} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TokenService} from "./token.service";
import {environment} from "../../environments/environment";
import {Order} from "../../@data/order";

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    apiUrl: string;
    orders$ = new BehaviorSubject<Order[] | null>(null);

    constructor(
        private http: HttpClient,
        private router: Router,
        private toastrService: ToastrService,
        private tokenService: TokenService,
    ) {
        this.apiUrl = environment.api_url + '/orders';
        if (!this.orders$.value) {
            this.fetchOrders();
        }
    }

    fetchOrders() {
        this.http.get<any>(this.apiUrl + '/getOrdersDB')
            .pipe(
                map((res: any) => {
                    return res.orders
                })
            )
            .subscribe((res: Order[]) => {
                this.orders$.next(res);
            })
    }

    alignFromAmazon() {
        this.http.get<any>(this.apiUrl + '/getOrders')
            .pipe(
                map((res: any) => {
                    return res.orders
                })
            )
            .subscribe((res: Order[]) => {
                this.orders$.next(res);
            })
    }

}
