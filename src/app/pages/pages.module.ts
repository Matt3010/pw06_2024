import {CommonModule} from "@angular/common";
import {PagesRoutingModule} from "./pages-routing.module";
import {NgModule} from "@angular/core";
import {EditorModule} from "primeng/editor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {TableModule} from 'primeng/table';
import {TooltipModule} from "ngx-bootstrap/tooltip";
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { OtpComponent } from './auth/otp/otp.component';

@NgModule({
    declarations: [
    LoginComponent,
    RegisterComponent,
    OtpComponent
  ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        FormsModule,
        ToastrModule,
        ReactiveFormsModule,
        FormsModule,
        EditorModule,
        TableModule,
        TooltipModule.forRoot(),
    ]

})
export class PagesModule {
}
