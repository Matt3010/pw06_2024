import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PagesComponent} from './pages.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {FornitoriComponent} from "./fornitori/fornitori.component";
import {MagazzinoComponent} from "./magazzino/magazzino.component";
import {AcquistiComponent} from "./acquisti/acquisti.component";
import {AnalyticsComponent} from "./analytics/analytics.component";


const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
            },
            {
                path: 'fornitori',
                component: FornitoriComponent,
            },
            {
                path: 'acquisti',
                component: AcquistiComponent,
            },
            {
                path: 'magazzino',
                component: MagazzinoComponent
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {
}
