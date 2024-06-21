import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from "ngx-toastr";

import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {BoilerplateComponent} from "./pages/auth/boilerplate/boilerplate.component";
import {PagesComponent} from "./pages/pages.component";
import {LoginComponent} from "./pages/auth/login/login.component";
import {RegisterComponent} from "./pages/auth/register/register.component";
import {OtpComponent} from "./pages/auth/otp/otp.component";
import {NgHcaptchaModule} from "ng-hcaptcha";
import { NgOtpInputModule } from 'ng-otp-input';
import {MessageBoxComponent} from "./components/message-box/message-box.component";
import {IsVerifiedComponent} from "./pages/auth/verified/ko/is-verified.component";
import {ConfirmEmailComponent} from "./pages/auth/verified/confirm-email/confirm-email.component";
import {CheckMailsComponent} from "./pages/auth/verified/check-mails/check-mails.component";
import {NavbarComponent} from './components/navbar/navbar.component';
import {AuthInterceptor} from "./_interceptors/auth.interceptor";
import {MdMdComponent} from './components/modals-templates/md-md/md-md.component';
import {MdXlComponent} from './components/modals-templates/md-xl/md-xl.component';
import {ResetPasswordComponent} from './pages/auth/password-steps/reset-password/reset-password.component';
import {SendMailPasswordComponent} from './pages/auth/password-steps/send-mail-password/send-mail-password.component';
import {EmailSentComponent} from './pages/auth/password-steps/email-sent/email-sent.component';
import {SettingsComponent} from './components/modals/settings/settings.component';
import {ChangePasswordComponent} from './components/modals/change-password/change-password.component';
import {MdLgComponent} from "./components/modals-templates/md-lg/md-lg.component";
import {InvoiceDetailsComponent} from './components/modals/invoice-details/invoice-details.component';
import {PanelModule} from "primeng/panel";
import { SpinnerComponent } from './components/spinner/spinner.component';
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

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
        CheckMailsComponent,
        NavbarComponent,
        MdXlComponent,
        SettingsComponent,
        MdMdComponent,
        SettingsComponent,
        MdXlComponent,
        ResetPasswordComponent,
        SendMailPasswordComponent,
        EmailSentComponent,
        ChangePasswordComponent,
        MdLgComponent,
        InvoiceDetailsComponent,
        SpinnerComponent,
     ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgOtpInputModule,
        ToastrModule.forRoot(),
        TooltipModule.forRoot(),
        NgHcaptchaModule.forRoot({
            siteKey: '1af6130c-b0ac-4bf3-bb20-7d4b902e36a1',
            languageCode: 'it'
        }),
        PanelModule,
        ToastModule,
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
