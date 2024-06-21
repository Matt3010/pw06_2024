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
import { EditPurchaseComponent } from './acquisti/edit-purchase/edit-purchase.component';
import { DeletePurchaseComponent } from './acquisti/delete-purchase/delete-purchase.component';
import { CreatePurchaseComponent } from './acquisti/create-purchase/create-purchase.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import {SalesComponent} from "../components/modals/sales/sales.component";
import {PurchasesComponent} from "../components/modals/purchases/purchases.component";
import {CalendarModule} from "primeng/calendar";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import { ExportationComponent } from './exportation/exportation.component';
import {CsvModule} from "@ctrl/ngx-csv";
import {NgApexchartsModule} from "ng-apexcharts";

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
        EditPurchaseComponent,
        DeletePurchaseComponent,
        CreatePurchaseComponent,
        AnalyticsComponent,
        SalesComponent,
        PurchasesComponent,
        ExportationComponent
    ],
    imports: [
        PagesRoutingModule,
        CommonModule,
        TableModule,
        ReactiveFormsModule,
        FormsModule,
        TreeTableModule,
        PanelModule,
        CalendarModule,
        BsDatepickerModule,
        CsvModule,
        NgApexchartsModule,
    ],
    providers: []
})
export class PagesModule {
}
