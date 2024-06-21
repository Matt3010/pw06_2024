import {FornitoriComponent} from "../fornitori/fornitori.component";
import {MagazzinoComponent} from "../magazzino/magazzino.component";
import {OrdersComponent} from "../orders/orders.component";
import {AcquistiComponent} from "../acquisti/acquisti.component";
import {AnalyticsComponent} from "../analytics/analytics.component";
import {ExportationComponent} from "../exportation/exportation.component";

export const pages = [
    {
        'title': 'Warehouse',
        'img': 'https://www.svgrepo.com/show/352676/warehouse.svg',
        'component': MagazzinoComponent,
        'url': '/pages/magazzino'
    },
    {
        'title': 'Orders',
        'img': 'assets/project/cart.svg',
        'component': OrdersComponent,
        'url': null
    },
    {
        'title': 'Suppliers',
        'img': 'https://www.svgrepo.com/show/507421/shopping-bag.svg',
        'component': FornitoriComponent,
        'url': '/pages/fornitori'
    },
    {
        'title': 'Purchases',
        'img': 'https://www.svgrepo.com/show/432402/article.svg',
        'component': AcquistiComponent,
        'url': '/pages/acquisti'
    },
    {
        'title': 'Analytics',
        'img': 'https://www.svgrepo.com/show/376754/analytics.svg',
        'component': AnalyticsComponent,
        'url': null
    },
    {
        'title': 'Export',
        'img': 'https://www.svgrepo.com/show/495278/export-1.svg',
        'component': ExportationComponent,
        'url': null,
        'size': 'md'
    }

];