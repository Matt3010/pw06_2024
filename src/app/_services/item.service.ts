import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TokenService} from "./token.service";
import {environment} from "../../environments/environment";
import {Supplier} from "../../@data/item";

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    apiUrl: string;
    items$ = new BehaviorSubject<Supplier[] | null>(null);

    constructor(
        private http: HttpClient,
        private router: Router,
        private toastrService: ToastrService,
        private tokenService: TokenService,
    ) {
        this.apiUrl = environment.api_url + '/items';
        if (!this.items$.value) {
            this.fetchItems();
        }
    }

    fetchItems() {
        this.http.get<Supplier[]>(this.apiUrl + '/items')
            .subscribe((res: Supplier[]) => {
                this.items$.next(res);
            })
    }

    deleteItem(asin: string) {
        this.http.delete<Supplier>(this.apiUrl + '/delete?id=' + asin)
            .subscribe((res: Supplier) => {
                if (res) {
                    const lastValue = this.items$.value!;
                    const filteredItems = lastValue.filter((i: Supplier) => i.ASIN !== res.ASIN);
                    this.items$.next(filteredItems);
                }
            });
    }


    patchItem(asin: string, body: Partial<Supplier>) {
        this.http.patch<Supplier>(this.apiUrl + '/update?id=' + asin, body).subscribe((res: Supplier) => {
                if (res) {
                    const lastValue = this.items$.value!;
                    const found = lastValue?.findIndex((i: Supplier) => i.ASIN === res.ASIN)
                    if (found !== -1) {
                        lastValue[found] = res;
                        this.fetchItems();
                    }
                }
            }
        )
    }


    createNewItem(body: Partial<Supplier>) {
        this.http.post<Supplier>(this.apiUrl, body).subscribe((res: Supplier) => {
            const last = this.items$.value
            last?.push(res);
            this.fetchItems();
        })
    }

}
