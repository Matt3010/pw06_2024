import {Component, Input} from '@angular/core';
import {ComponentInjectorService} from "../../../_utils/component-injector.service";
import {FornitoriService} from "../../../_services/fornitori.service";

@Component({
    selector: 'app-delete-supplier',
    templateUrl: './delete-supplier.component.html',
    styleUrls: ['./delete-supplier.component.scss']
})
export class DeleteSupplierComponent {

    constructor(
        private fornitoriService: FornitoriService,
        private injectorService: ComponentInjectorService
    ) {
    }

    @Input() options: any;
    userInput: string = '';

    delete() {
        this.fornitoriService.deleteSupplier(this.options.item.id);
        this.injectorService.destroyComponent();
    }

}
