import {FornitoriComponent} from "../fornitori/fornitori.component";
import {ArticoliComponent} from "../articoli/articoli.component";

export const pages = [
    {
        'title': 'Fornitori',
        'img': 'https://www.svgrepo.com/show/507421/shopping-bag.svg',
        'component' : FornitoriComponent,
        'url': '/pages/fornitori'
    },
    {
        'title': 'Articoli',
        'img': 'https://www.svgrepo.com/show/432402/article.svg',
        'component': ArticoliComponent,
        'url': '/pages/articoli'

    },

];