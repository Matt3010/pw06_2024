import {Component, Input} from '@angular/core';
import {ComponentInjectorService} from "../../../_utils/component-injector.service";
import {AcquistiService} from "../../../_services/acquisti.service";

@Component({
    selector: 'app-delete-purchase',
    templateUrl: './delete-purchase.component.html',
    styleUrls: ['./delete-purchase.component.scss']
})
export class DeletePurchaseComponent {
    constructor(
        private purchaseService: AcquistiService,
        private injectorService: ComponentInjectorService
    ) {
    }

    @Input() options: any;
    userInput: string = '';

    delete() {
        this.purchaseService.deletePurchase(this.options.item.id);
        this.injectorService.destroyComponent();
    }

}
