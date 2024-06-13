import {Component, Input} from '@angular/core';
import {ComponentInjectorService} from "../../../_utils/component-injector.service";
import {AuthService} from "../../../_services/auth.service";

@Component({
    selector: 'app-invoice-details',
    templateUrl: './invoice-details.component.html',
    styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent {

    @Input() options: any;


    constructor(
        public injectoreComponent: ComponentInjectorService,
        public authService: AuthService
    ) {
    }

}
