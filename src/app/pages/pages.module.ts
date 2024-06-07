import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PagesRoutingModule} from "./pages-routing.module";
import {FornitoriComponent} from './fornitori/fornitori.component';
import {ArticoliComponent} from './articoli/articoli.component';
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [
        DashboardComponent,
        FornitoriComponent,
        ArticoliComponent
    ],
    imports: [
        PagesRoutingModule,
        CommonModule
    ],
    providers: []
})
export class PagesModule {
}
