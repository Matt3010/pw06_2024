import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TokenService} from "./token.service";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    apiUrl: string;
    categories$ = new BehaviorSubject<{ category: string, id: string }[] | null>(null);

    constructor(
        private http: HttpClient,
        private router: Router,
        private toastrService: ToastrService,
        private tokenService: TokenService,
    ) {
        this.apiUrl = environment.api_url + '/items';
        if (!this.categories$.value) {
            this.fetchCategories();
        }
    }


    fetchCategories() {
        this.http.get<{ category: string, id: string }[]>(this.apiUrl + '/getCategories').subscribe((res: {category: string, id: string}[] ) => {
            this.categories$.next(res)
        })
    }
}
