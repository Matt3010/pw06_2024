import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BoilerplateComponent} from "./pages/auth/boilerplate/boilerplate.component";
import {LoginComponent} from "./pages/auth/login/login.component";
import {RegisterComponent} from "./pages/auth/register/register.component";
import {OtpComponent} from "./pages/auth/otp/otp.component";

const routes: Routes = [
    {
        path: 'pages',
        loadChildren: () => import('./pages/pages.module')
            .then(m => m.PagesModule),
     },
    {
        path: 'auth',
        pathMatch: 'full',
        redirectTo: 'auth/login'
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'pages'
    },
    {
        path: 'auth',
        component: BoilerplateComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'otp',
                component: OtpComponent
            },
        ],
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
