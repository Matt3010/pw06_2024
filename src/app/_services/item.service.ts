import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TokenService} from "./token.service";
import {environment} from "../../environments/environment";
import {Item} from "../../@data/item";

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    apiUrl: string;
    items$ = new BehaviorSubject<Item[] | null>(null);

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
        this.http.get<Item[]>(this.apiUrl + '/items')
            .subscribe((res: Item[]) => {
                this.items$.next(res);
            })
    }

    deleteItem(asin: string) {
        this.http.delete<Item>(this.apiUrl + '/delete?id=' + asin)
            .subscribe((res: Item) => {
                if (res) {
                    const lastValue = this.items$.value!;
                    const filteredItems = lastValue.filter((i: Item) => i.ASIN !== res.ASIN);
                    this.items$.next(filteredItems);
                }
            });
    }


    patchItem(asin: string, body: Partial<Item>) {
        this.http.patch<Item>(this.apiUrl + '/update?id=' + asin, body).subscribe((res: Item) => {
                if (res) {
                    const lastValue = this.items$.value!;
                    const found = lastValue?.findIndex((i: Item) => i.ASIN === res.ASIN)
                    if (found !== -1) {
                        lastValue[found] = res;
                        this.items$.next(lastValue);
                    }
                }
            }
        )
    }


    createNewItem(body: Partial<Item>) {
        this.http.post<Item>(this.apiUrl, body).subscribe((res: Item) => {
            const last = this.items$.value
            last?.push(res);
            this.items$.next(last);
        })
    }

}
