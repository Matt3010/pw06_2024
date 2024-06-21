import {Component} from '@angular/core';
import {AcquistiService} from "../../_services/acquisti.service";
import {Purchase} from "../../../@data/purchase";
import {Router} from "@angular/router";
import {ComponentInjectorService} from "../../_utils/component-injector.service";
import {MdLgComponent} from "../../components/modals-templates/md-lg/md-lg.component";
import {InvoiceDetailsComponent} from "../../components/modals/invoice-details/invoice-details.component";
import {MdMdComponent} from "../../components/modals-templates/md-md/md-md.component";
import {EditPurchaseComponent} from "./edit-purchase/edit-purchase.component";
import {MdSmComponent} from "../../components/modals-templates/md-sm/md-sm.component";
import {DeletePurchaseComponent} from "./delete-purchase/delete-purchase.component";
import {CreatePurchaseComponent} from "./create-purchase/create-purchase.component";

@Component({
    selector: 'app-acquisti',
    templateUrl: './acquisti.component.html',
    styleUrls: ['./acquisti.component.scss']
})
export class AcquistiComponent {

    purchases$ = this.purchaseService.purchases$


    constructor(
        private purchaseService: AcquistiService,
        public router: Router,
        private injectorService: ComponentInjectorService,
    ) {
    }

    openModalInvocices(item: any) {
        this.injectorService.createComponent(MdLgComponent, {
            component: InvoiceDetailsComponent,
            title: 'Invoice details',
            options: {item}
        })
    }

    update(item: Purchase) {
        this.injectorService.createComponent(MdMdComponent, {
            component: EditPurchaseComponent,
            title: 'Edit purchase',
            options: {item}
        })

    }

    delete(item: Purchase) {
        this.injectorService.createComponent(MdSmComponent, {
            component: DeletePurchaseComponent,
            title: 'Delete purchase',
            options: {item}
        })
    }

    createAddModal() {
        this.injectorService.createComponent(MdLgComponent, {
            component: CreatePurchaseComponent,
            title: 'Create purchase',
        })
    }

}
