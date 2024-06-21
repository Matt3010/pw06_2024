import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {

    spinner$ = new BehaviorSubject<boolean>(false);

    constructor() {
    }

    load() {
        this.spinner$.next(true);
    }

    hide() {
        this.spinner$.next(false);
    }

}
