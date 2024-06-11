import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TokenService} from "./token.service";
import {environment} from "../../environments/environment";
import {User} from "./auth.service";
import {Item} from "../../@data/item";
import {Category} from "../../@data/category";

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
    this.apiUrl = environment.api_url+ '/item';
    if(!this.items$.value) {
      this.fetchItems();
    }




      const categories: Category[] = [
          { id: '1', category: 'Books' },
          { id: '2', category: 'Electronics' },
          { id: '3', category: 'Clothing' },
          { id: '4', category: 'Toys' },
          { id: '4', category: 'Toys' },
          { id: '4', category: 'Toys' },
          { id: '4', category: 'Toys' },
          { id: '4', category: 'Toys' },
          { id: '4', category: 'Toys' },
          { id: '4', category: 'Toys' },
          { id: '4', category: 'Toys' },
          { id: '4', category: 'Toys' },
          { id: '5', category: 'Groceries' }
      ];

      const items: Item[] = [
          { id: 'a1', ASIN: 'B000123', quantity: '10', categoryId: categories[0] },
          { id: 'a2', ASIN: 'B000124', quantity: '0', categoryId: categories[1] },
          { id: 'a3', ASIN: 'B000125', quantity: '20', categoryId: categories[2] },
      ];

      this.items$.next(items);
  }

  fetchItems() {
      this.http.get<Item[]>(this.apiUrl)
          .subscribe((res: Item[]) => {



            const categories: Category[] = [
              { id: '1', category: 'Books' },
              { id: '2', category: 'Electronics' },
              { id: '3', category: 'Clothing' },
              { id: '4', category: 'Toys' },
              { id: '5', category: 'Groceries' }
            ];

            const items: Item[] = [
              { id: 'a1', ASIN: 'B000123', quantity: '10', categoryId: categories[0] },
              { id: 'a2', ASIN: 'B000124', quantity: '5', categoryId: categories[1] },
              { id: 'a3', ASIN: 'B000125', quantity: '20', categoryId: categories[2] },
              { id: 'a4', ASIN: 'B000126', quantity: '15', categoryId: categories[3] },
              { id: 'a5', ASIN: 'B000127', quantity: '30', categoryId: categories[4] }
            ];

            this.items$.next(items);
      })
  }
}
