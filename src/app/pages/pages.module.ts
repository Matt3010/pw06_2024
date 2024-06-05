import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {EditorModule} from 'primeng/editor';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {PagesRoutingModule} from './pages-routing.module';
import {CAPTCHA_CONFIG, NgHcaptchaModule} from "ng-hcaptcha";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        PagesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        FormsModule,
        EditorModule,
        TableModule,
        TooltipModule.forRoot(),
    ],
    providers: [
    ]
})
export class PagesModule {
}
