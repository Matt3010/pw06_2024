import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PagesRoutingModule} from "./pages-routing.module";
import {FornitoriComponent} from './fornitori/fornitori.component';
import {ArticoliComponent} from './articoli/articoli.component';
import {CommonModule} from "@angular/common";
import {MagazzinoComponent} from './magazzino/magazzino.component';
import {TableModule} from 'primeng/table';

@NgModule({
    declarations: [
        DashboardComponent,
        FornitoriComponent,
        ArticoliComponent,
        MagazzinoComponent,
    ],
    imports: [
        PagesRoutingModule,
        CommonModule,
        TableModule,
    ],
    providers: []
})
export class PagesModule {
}
