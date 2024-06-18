import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Purchase} from "../../@data/purchase";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TokenService} from "./token.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  apiUrl: string;
  sales$ = new BehaviorSubject<any[] | null>(null);
  purchases$ = new BehaviorSubject<any[] | null>(null);

  constructor(
      private http: HttpClient,
      private router: Router,
      private toastrService: ToastrService,
      private tokenService: TokenService,
  ) {
    this.apiUrl = environment.api_url + '/analytics';
    if (!this.sales$.value) {
      this.fetchSales({});
    }

    if (!this.purchases$.value) {
      this.fetchPurchases({});
    }
  }

  fetchSales(body: any) {
      this.http.post(this.apiUrl + '/sales', body).subscribe((res: any) => {
        this.sales$.next(res);
      })
  }

  fetchPurchases(body: any) {
      this.http.post(this.apiUrl + '/purchases', body).subscribe((res: any) => {
        this.purchases$.next(res);
      })
  }


}
