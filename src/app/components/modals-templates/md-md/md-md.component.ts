import {Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef} from '@angular/core';
import {ModalTemplateAbstract} from "../modal.template.abstract";
import {ComponentInjectorService} from "../../../_utils/component-injector.service";

@Component({
    selector: 'app-md-md',
    templateUrl: './md-md.component.html',
    styleUrls: ['./md-md.component.scss']
})
export class MdMdComponent extends ModalTemplateAbstract {

    @Input() component!: any;
    @Input() title: string | null = 'No title';
    @Input() ref!: any;
    @Input() options: any;
    @ViewChild('componentView', {read: ViewContainerRef, static: true}) componentView!: ViewContainerRef;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private injectorService: ComponentInjectorService
    ) {
        super();
    }

    ngOnInit(): void {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component);
        this.componentView.clear();
        const componentRef: any = this.componentView.createComponent(componentFactory);
        if (this.options) {
            componentRef.instance.options = this.options;
        }
    }

    close() {
        this.injectorService.destroyComponent()
    }

}