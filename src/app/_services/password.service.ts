import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(
    private readonly http: HttpClient,
    private router: Router
  ) {
    this.apiUrl = environment.api_url;
  }

  apiUrl: string;

  sendMail(body: any) {
    this.http.post(this.apiUrl + '/recover-password', body).subscribe((res: any) => {
      this.router.navigateByUrl('auth/email-sent');
    })
  }

  resetPassword(body: any) {
    this.http.post(this.apiUrl + '/reset-password', body).subscribe((res: any) => {
      this.router.navigateByUrl('auth/login');
    })
  }
}
