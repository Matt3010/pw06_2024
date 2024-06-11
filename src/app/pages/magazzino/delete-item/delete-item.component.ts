import {Component, Input} from '@angular/core';
import {ItemService} from "../../../_services/item.service";
import {ComponentInjectorService} from "../../../_utils/component-injector.service";

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.scss']
})
export class DeleteItemComponent {

  constructor(
      private itemService: ItemService,
      private injectorService: ComponentInjectorService
  ) {
  }

  @Input() options: any;
  userInput: string = '';
  delete() {
    this.itemService.deleteItem(this.options.item.ASIN);
    this.injectorService.destroyComponent();
  }

}
