import { BoilerplateComponent } from "./pages/auth/boilerplate/boilerplate.component";
import { RouterModule, Routes } from "@angular/router";
import { OtpComponent } from "./pages/auth/otp/otp.component";
import { LoginComponent } from "./pages/auth/login/login.component";
import { RegisterComponent } from "./pages/auth/register/register.component";
import { NgModule } from "@angular/core";
import { IsVerifiedComponent } from "./pages/auth/verified/ko/is-verified.component";
import { ConfirmEmailComponent } from "./pages/auth/verified/confirm-email/confirm-email.component";
import { CheckMailsComponent } from "./pages/auth/verified/check-mails/check-mails.component";
import { AuthGuard } from "./_guards/auth.guard";
import { ResetPasswordComponent } from "./pages/auth/password-steps/reset-password/reset-password.component";
import { SendMailPasswordComponent } from "./pages/auth/password-steps/send-mail-password/send-mail-password.component";
import { EmailSentComponent } from "./pages/auth/password-steps/email-sent/email-sent.component";

const routes: Routes = [
  {
    path: "pages",
    pathMatch: "full",
    redirectTo: "pages/dashboard",
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "pages/dashboard",
  },
  {
    path: "pages",
    loadChildren: () =>
      import("./pages/pages.module").then((m) => m.PagesModule),
    canActivate: [AuthGuard],
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "pages",
  },
  {
    path: "auth",
    component: BoilerplateComponent,
    children: [
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "register",
        component: RegisterComponent,
      },
      {
        path: "otp/:userId",
        component: OtpComponent,
      },
      {
        path: "send-mail-password",
        component: SendMailPasswordComponent,
      },
      {
        path: "reset-password",
        component: ResetPasswordComponent,
      },
      {
        path: "email-sent",
        component: EmailSentComponent,
      },
      {
        path: "verified",
        children: [
          {
            path: "ko",
            component: IsVerifiedComponent,
          },
          {
            path: "confirm-email",
            component: ConfirmEmailComponent,
          },
          {
            path: "check-email",
            component: CheckMailsComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
