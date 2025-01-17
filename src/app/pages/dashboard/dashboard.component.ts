import {Component} from '@angular/core';
import {pages} from "./pages";
import {ComponentInjectorService} from "../../_utils/component-injector.service";
import {MdXlComponent} from "../../components/modals-templates/md-xl/md-xl.component";
import {Router} from "@angular/router";
import {MdMdComponent} from "../../components/modals-templates/md-md/md-md.component";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

    blocks = pages;

    constructor(
        private injectorService: ComponentInjectorService,
        private router: Router,
    ) {
    }


    stringToColor(string: any, saturation = 65, lightness = 90) {
        let hash = 0;
        for (let i = 0; i < string.length; i++) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
            hash = hash & hash;
        }
        return `hsl(${(hash % 345)}, ${saturation}%, ${lightness}%)`;
    }


    openModal(component: any, title: string, url: string | null, size: string) {
        if (!size) {
            this.injectorService.createComponent(MdXlComponent, {component: component, title: title, goTo: url});
        } else if (size === 'md') {
            this.injectorService.createComponent(MdMdComponent, {component: component, title: title, goTo: url});
        }
    }

    openPreview(url: string, event: MouseEvent) {
        this.router.navigateByUrl(url);
        event.preventDefault();
    }


}
