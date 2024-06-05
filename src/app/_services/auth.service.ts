import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string;

  constructor(
      private http: HttpClient,
      private router: Router,
      private toastrService: ToastrService
  ) {
    this.apiUrl = environment.api_url
  }

  register(body: any) {
    this.http.post(this.apiUrl + '/register', body).subscribe((res) => {
        this.router.navigateByUrl('auth/verified/check-email')
    })
  }


  login(body: any) {
    this.http.post(this.apiUrl + '/login', body).subscribe((res: any) => {
        this.router.navigateByUrl('auth/otp')
    }, (err) => {

    })
  }


  checkOtp(otp: string) {

  }

  verifyEmail(token: string) {
    return this.http.get(this.apiUrl + '/confirm-email?token='+token)
  }
}
