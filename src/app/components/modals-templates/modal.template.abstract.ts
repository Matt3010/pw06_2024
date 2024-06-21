import {Injectable, Input, ViewChild, ViewContainerRef} from '@angular/core';

@Injectable()
export abstract class ModalTemplateAbstract {
    @Input() abstract component: any;
    @Input() abstract ref: any;

    // @ts-ignore
    @ViewChild('componentView', {read: ViewContainerRef, static: true}) abstract componentView: ViewContainerRef;

    abstract ngOnInit(): void;

    abstract close(): void;
}
