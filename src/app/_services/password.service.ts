import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  apiUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastSrv: ToastrService
  ) {
    this.apiUrl = environment.api_url;
  }

  sendMail(body: any) {
    this.http.post(this.apiUrl + '/recover-password', body).subscribe((res: any) => {
      this.router.navigateByUrl('auth/email-sent');
    })
  }

  resetPassword(body: any) {
    this.http.post(this.apiUrl + '/reset-password', body).subscribe((res: any) => {
        this.router.navigateByUrl('auth/login');
        this.toastSrv.success('Password changed successfully!', 'SUCCESS');
    }, (err) => {
      if(err) {
        this.toastSrv.warning(err.error.error, 'FAILED')
      }
    })
  }
}
