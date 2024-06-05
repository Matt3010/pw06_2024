import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from "ngx-toastr";

import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {BoilerplateComponent} from "./pages/auth/boilerplate/boilerplate.component";
import {PagesComponent} from "./pages/pages.component";
import {LoginComponent} from "./pages/auth/login/login.component";
import {RegisterComponent} from "./pages/auth/register/register.component";
import {OtpComponent} from "./pages/auth/otp/otp.component";
import {NgHcaptchaModule} from "ng-hcaptcha";
import {NgxOtpInputModule} from "ngx-otp-input";
import {MessageBoxComponent} from "./components/message-box/message-box.component";
import {IsVerifiedComponent} from "./pages/auth/verified/ko/is-verified.component";
import {ConfirmEmailComponent} from "./pages/auth/verified/confirm-email/confirm-email.component";
import {CheckMailsComponent} from "./pages/auth/verified/check-mails/check-mails.component";

@NgModule({
    declarations: [
        AppComponent,
        PagesComponent,
        BoilerplateComponent,
        LoginComponent,
        RegisterComponent,
        OtpComponent,
        IsVerifiedComponent,
        MessageBoxComponent,
        ConfirmEmailComponent,
        CheckMailsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        TooltipModule.forRoot(),
        NgHcaptchaModule.forRoot({
            siteKey: '1af6130c-b0ac-4bf3-bb20-7d4b902e36a1',
            languageCode: 'it'
        }),
        NgxOtpInputModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
