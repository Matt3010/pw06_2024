import {Component} from '@angular/core';
import {ItemService} from "../../_services/item.service";
import {Router} from "@angular/router";
import {ComponentInjectorService} from "../../_utils/component-injector.service";
import {MdMdComponent} from "../../components/modals-templates/md-md/md-md.component";
import {EditItemComponent} from "./edit-item/edit-item.component";
import {Item} from "../../../@data/item";
import {CreateItemComponent} from "./create-item/create-item.component";
import {DeleteItemComponent} from "./delete-item/delete-item.component";
import {MdSmComponent} from "../../components/modals-templates/md-sm/md-sm.component";

@Component({
    selector: 'app-magazzino',
    templateUrl: './magazzino.component.html',
    styleUrls: ['./magazzino.component.scss']
})
export class MagazzinoComponent {

    items$ = this.itemService.items$;

    constructor(
        private itemService: ItemService,
        public router: Router,
        private injectorService: ComponentInjectorService,
    ) {
    }

    delete(item: Item) {
        this.injectorService.createComponent(MdSmComponent, {
            component: DeleteItemComponent,
            title: 'Delete item',
            options: {item}
        })
    }

    update(item: Item) {
        this.injectorService.createComponent(MdMdComponent, {
            component: EditItemComponent,
            title: 'Edit item',
            options: {item}
        })
    }

    createAddModal() {
        this.injectorService.createComponent(MdMdComponent, {
            component: CreateItemComponent,
            title: 'Add new item',
        })
    }

}
