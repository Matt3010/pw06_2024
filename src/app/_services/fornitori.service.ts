import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Supplier} from "../../@data/item";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TokenService} from "./token.service";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class FornitoriService {

    apiUrl: string;
    suppliers$ = new BehaviorSubject<Supplier[] | null>(null);

    constructor(
        private http: HttpClient,
        private router: Router,
        private toastrService: ToastrService,
        private tokenService: TokenService,
    ) {
        this.apiUrl = environment.api_url + '/suppliers';
        if (!this.suppliers$.value) {
            this.fetchSuppliers();
        }
    }

    fetchSuppliers() {
        this.http.get<Supplier[]>(this.apiUrl + '/suppliers')
            .subscribe((res: Supplier[]) => {
                this.suppliers$.next(res);
            })
    }

    deleteSupplier(asin: string) {
        this.http.delete<Supplier>(this.apiUrl + '/delete?id=' + asin)
            .subscribe((res: Supplier) => {
                if (res) {
                    const lastValue = this.suppliers$.value!;
                    const filteredItems = lastValue.filter((i: Supplier) => i.ASIN !== res.ASIN);
                    this.fetchSuppliers();
                }
            });
    }

    patchSupplier(id: string, body: any) {
        this.http.patch<Supplier>(this.apiUrl + '/update?id=' + id, body).subscribe((res: Supplier) => {
                if (res) {
                    const lastValue = this.suppliers$.value!;
                    const found = lastValue?.findIndex((i: Supplier) => i.ASIN === res.ASIN)
                    if (found !== -1) {
                        lastValue[found] = res;
                        this.fetchSuppliers();
                    }
                }
            }
        )
    }

    createNewSupplier(fornitore: string) {
        this.http.post<Supplier>(this.apiUrl, {fornitore}).subscribe((res: Supplier) => {
            const last = this.suppliers$.value
            last?.push(res);
            this.suppliers$.next(last);
        })
    }


}
