import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {SpinnerService} from "./spinner.service";
import {Spinner} from "primeng/spinner";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  apiUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private spinnerService: SpinnerService,
    private toastSrv: ToastrService,
    private messageService: MessageService
  ) {
    this.apiUrl = environment.api_url;
  }

  sendMail(body: any) {
    this.http.post(this.apiUrl + '/recover-password', body).subscribe((res: any) => {
      this.spinnerService.hide();
      this.router.navigateByUrl('auth/email-sent');
    }, (err) => {
      this.spinnerService.hide();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
    })
  }

  resetPassword(body: any) {
    this.http.post(this.apiUrl + '/reset-password', body).subscribe((res: any) => {
        this.router.navigateByUrl('auth/login');
        this.toastSrv.success('Password resetted successfully!', 'SUCCESS');
    }, (err) => {
      if(err) {
        this.toastSrv.warning(err.error.error, 'FAILED');
      }
    })
  }

  changePassword(body: any) {
    this.http.patch(this.apiUrl + '/changePassword', body).subscribe((res: any) => {
      this.toastSrv.success('Password changed successfully!', 'SUCCESS');
    }, (err) => {
      if(err) {
        console.log(err.error.error)
      }
    })
  }
}
