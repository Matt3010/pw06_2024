import {Component} from '@angular/core';
import {AuthService} from "../../_services/auth.service";
import {ComponentInjectorService} from "../../_utils/component-injector.service";
import {MdSmComponent} from "../modals-templates/md-sm/md-sm.component";
import {SettingsComponent} from "../modals/settings/settings.component";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

    currentUser$ = this.authService.currentUser$;
    shouldSeeDropDown: boolean = false;
    window = window;

    constructor(
        private authService: AuthService,
        private injectorService: ComponentInjectorService
    ) {
    }


    openModal() {
        this.injectorService.createComponent(MdSmComponent, {component: SettingsComponent, title: 'Settings'});
    }

}
