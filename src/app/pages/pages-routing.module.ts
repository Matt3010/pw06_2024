import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PagesComponent} from './pages.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {FornitoriComponent} from "./fornitori/fornitori.component";
import {ArticoliComponent} from "./articoli/articoli.component";
import {MagazzinoComponent} from "./magazzino/magazzino.component";


const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'fornitori',
                component: FornitoriComponent
            },
            {
                path: 'articoli',
                component: ArticoliComponent
            },
            {
                path: 'magazzino',
                component: MagazzinoComponent
            }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {
}
