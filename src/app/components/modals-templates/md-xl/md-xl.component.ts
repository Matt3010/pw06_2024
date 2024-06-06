import {Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef} from '@angular/core';
import {ModalTemplateAbstract} from "../modal.template.abstract";
import {ComponentInjectorService} from "../../../_utils/component-injector.service";

@Component({
  selector: 'app-md-xl',
  templateUrl: './md-xl.component.html',
  styleUrls: ['./md-xl.component.scss']
})
export class MdXlComponent  extends ModalTemplateAbstract {
  @Input() component!: any;
  @Input() title: string | null = null;
  @Input() goTo: string | null = null;
  @Input() ref!: any;
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
    this.componentView.createComponent(componentFactory);
  }

  close() {
    this.injectorService.destroyComponent()
  }
}
