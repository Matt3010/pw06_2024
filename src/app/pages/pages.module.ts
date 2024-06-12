import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PagesRoutingModule} from "./pages-routing.module";
import {FornitoriComponent} from './fornitori/fornitori.component';
import {CommonModule} from "@angular/common";
import {MagazzinoComponent} from './magazzino/magazzino.component';
import {TableModule} from 'primeng/table';
import {EditItemComponent} from './magazzino/edit-item/edit-item.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CreateItemComponent} from './magazzino/create-item/create-item.component';
import {DeleteItemComponent} from './magazzino/delete-item/delete-item.component';
import {OrdersComponent} from './orders/orders.component';
import {CreateSupplierComponent} from './fornitori/create-supplier/create-supplier.component';
import {EditSupplierComponent} from './fornitori/edit-supplier/edit-supplier.component';
import {DeleteSupplierComponent} from './fornitori/delete-supplier/delete-supplier.component';
import { AcquistiComponent } from './acquisti/acquisti.component';
import {TreeTableModule} from "primeng/treetable";
import {PanelModule} from "primeng/panel";

@NgModule({
    declarations: [
        DashboardComponent,
        FornitoriComponent,
        MagazzinoComponent,
        EditItemComponent,
        CreateItemComponent,
        DeleteItemComponent,
        OrdersComponent,
        CreateSupplierComponent,
        EditSupplierComponent,
        DeleteSupplierComponent,
        AcquistiComponent,
    ],
    imports: [
        PagesRoutingModule,
        CommonModule,
        TableModule,
        ReactiveFormsModule,
        FormsModule,
        TreeTableModule,
        PanelModule,
    ],
    providers: []
})
export class PagesModule {
}
