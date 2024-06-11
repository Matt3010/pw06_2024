import {FornitoriComponent} from "../fornitori/fornitori.component";
import {ArticoliComponent} from "../articoli/articoli.component";
import {MagazzinoComponent} from "../magazzino/magazzino.component";
import {OrdersComponent} from "../orders/orders.component";

export const pages = [
    {
        'title': 'Magazzino',
        'img': 'https://www.svgrepo.com/show/352676/warehouse.svg',
        'component': MagazzinoComponent,
        'url': '/pages/magazzino'
    },
    {
        'title': 'Ordini',
        'img': 'assets/project/cart.svg',
        'component': OrdersComponent,
        'url': null
    },
    {
        'title': 'Fornitori',
        'img': 'https://www.svgrepo.com/show/507421/shopping-bag.svg',
        'component': FornitoriComponent,
        'url': '/pages/fornitori'
    },
    {
        'title': 'Articoli',
        'img': 'https://www.svgrepo.com/show/432402/article.svg',
        'component': ArticoliComponent,
        'url': '/pages/articoli'
    }

];