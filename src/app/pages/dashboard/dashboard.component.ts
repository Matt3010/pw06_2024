import { Component } from '@angular/core';
import {pages} from "./pages";
import {ComponentInjectorService} from "../../_utils/component-injector.service";
import {MdSmComponent} from "../../components/modals-templates/md-sm/md-sm.component";
import {MdXlComponent} from "../../components/modals-templates/md-xl/md-xl.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  blocks = pages;

  constructor(
      private injectorService: ComponentInjectorService
  ) {
  }


  stringToColor(string: any, saturation = 40, lightness = 95) {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash;
    }
    return `hsl(${(hash % 353)}, ${saturation}%, ${lightness}%)`;
  }


  openModal(component: any, title: string, url: string | null) {
    this.injectorService.createComponent(MdXlComponent, {component: component, title: title, goTo: url});
  }

}
