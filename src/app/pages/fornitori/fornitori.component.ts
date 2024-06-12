import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ComponentInjectorService} from "../../_utils/component-injector.service";
import {Supplier} from "../../../@data/item";
import {MdSmComponent} from "../../components/modals-templates/md-sm/md-sm.component";
import {DeleteItemComponent} from "../magazzino/delete-item/delete-item.component";
import {MdMdComponent} from "../../components/modals-templates/md-md/md-md.component";
import {EditItemComponent} from "../magazzino/edit-item/edit-item.component";
import {CreateItemComponent} from "../magazzino/create-item/create-item.component";
import {FornitoriService} from "../../_services/fornitori.service";
import {CreateSupplierComponent} from "./create-supplier/create-supplier.component";
import {EditSupplierComponent} from "./edit-supplier/edit-supplier.component";
import {DeleteSupplierComponent} from "./delete-supplier/delete-supplier.component";

@Component({
    selector: 'app-fornitori',
    templateUrl: './fornitori.component.html',
    styleUrls: ['./fornitori.component.scss']
})
export class FornitoriComponent {


    suppliers$ = this.fornitoriService.suppliers$;

    constructor(
        private fornitoriService: FornitoriService,
        public router: Router,
        private injectorService: ComponentInjectorService,
    ) {
    }

    delete(item: Supplier) {
        this.injectorService.createComponent(MdSmComponent, {
            component: DeleteSupplierComponent,
            title: 'Delete supplier',
            options: {item}
        })
    }

    update(item: Supplier) {
        this.injectorService.createComponent(MdMdComponent, {
            component: EditSupplierComponent,
            title: 'Edit supplier',
            options: {item}
        })
    }

    createAddModal() {
        this.injectorService.createComponent(MdMdComponent, {
            component: CreateSupplierComponent,
            title: 'Add new supplier',
        })
    }


}
