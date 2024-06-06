import {Component} from '@angular/core';
import {AuthService} from "../../_services/auth.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

    currentUser$ = this.authService.currentUser$;

    constructor(
        private authService: AuthService,
    ) {
    }

}
