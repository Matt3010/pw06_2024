import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PagesRoutingModule} from "./pages-routing.module";
import {FornitoriComponent} from './fornitori/fornitori.component';
import {ArticoliComponent} from './articoli/articoli.component';
import {CommonModule} from "@angular/common";
import {MagazzinoComponent} from './magazzino/magazzino.component';
import {TableModule} from 'primeng/table';
import { EditItemComponent } from './magazzino/edit-item/edit-item.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CreateItemComponent } from './magazzino/create-item/create-item.component';
import { DeleteItemComponent } from './magazzino/delete-item/delete-item.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
    declarations: [
        DashboardComponent,
        FornitoriComponent,
        ArticoliComponent,
        MagazzinoComponent,
        EditItemComponent,
        CreateItemComponent,
        DeleteItemComponent,
        OrdersComponent,
    ],
    imports: [
        PagesRoutingModule,
        CommonModule,
        TableModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    providers: []
})
export class PagesModule {
}
