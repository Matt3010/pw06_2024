import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {BehaviorSubject, take} from "rxjs";
import {TokenService} from "./token.service";
import {SpinnerService} from "./spinner.service";
import { MessageService } from 'primeng/api';


export interface User {
    firstName: string
    lastName: string
    picture: string
    isConfirmed: boolean
    fullName: string
    id: string
}


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    apiUrl: string;
    currentUser$ = new BehaviorSubject<User | null>(null);

    constructor(
        private http: HttpClient,
        private router: Router,
        private messageService: MessageService,
        private spinnerService: SpinnerService,
        private tokenService: TokenService,
    ) {
        this.apiUrl = environment.api_url;
        if (!this.currentUser$.value && !router.url.includes('verified') && !router.url.includes('reset-password?token')) {
            this.me();
        }
    }

    register(body: any) {
        this.http.post(this.apiUrl + '/register', body).subscribe((res) => {
            this.spinnerService.hide();
            this.router.navigateByUrl('auth/verified/check-email')
        }, (err) => {
            this.spinnerService.hide();
        })
    }


    login(body: any) {
        this.http.post(this.apiUrl + '/login', body).subscribe((res: any) => {
            this.router.navigateByUrl('auth/otp/' + res.userId)
        }, (err) => {
            if (err.error.code === 'The user is not confirmed') {
                this.router.navigateByUrl('auth/verified/ko');
            } else {
                this.messageService.add({severity: 'error', summary:'Error', detail: err.error.code})
            }
            this.spinnerService.hide();
        })
    }


    checkOtp(otp: string, userId: string) {
        this.http.post(this.apiUrl + '/verifyOtp', {otp, userId})
            .pipe(
                take(1)
            )
            .subscribe((res: any) => {
                this.tokenService.saveToken(res.token)
                this.currentUser$.next(res.user);
            }, (err) => {
                if (err) {
                    this.spinnerService.hide();
                this.messageService.add({severity: 'error', summary:'Error', detail: 'Invalid or expired OTP'})
                }
            });
    }

    verifyEmail(token: string) {
        return this.http.get(this.apiUrl + '/confirm-email?token=' + token)
    }


    logout() {
        this.currentUser$.next(null);
        this.tokenService.removeToken();
        this.router.navigateByUrl('auth/login')
    }


    me() {
        this.http.get(this.apiUrl + '/users/me').subscribe((res: any) => {
            this.currentUser$.next(res);
        }, (err) => {
            this.logout();
        })
    }
}
