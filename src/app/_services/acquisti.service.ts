import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TokenService} from "./token.service";
import {environment} from "../../environments/environment";
import {Purchase} from "../../@data/purchase";

@Injectable({
    providedIn: 'root'
})
export class AcquistiService {

    apiUrl: string;
    purchases$ = new BehaviorSubject<Purchase[] | null>(null);

    constructor(
        private http: HttpClient,
        private router: Router,
        private toastrService: ToastrService,
        private tokenService: TokenService,
    ) {
        this.apiUrl = environment.api_url + '/purchases';
        if (!this.purchases$.value) {
            this.fetchPurchases();
        }
    }

    fetchPurchases() {
        this.http.get<Purchase[]>(this.apiUrl + '/purchases')
            .subscribe((res: Purchase[]) => {
                this.purchases$.next(res);
            })
    }
}
