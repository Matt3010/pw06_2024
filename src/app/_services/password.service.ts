import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
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
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'invalid email address' });
    })
  }

  resetPassword(body: any) {
    this.http.post(this.apiUrl + '/reset-password', body).subscribe((res: any) => {
        this.router.navigateByUrl('auth/login');
        this.messageService.add({ severity: 'success', summary: 'SUCCESS!', detail: 'Password resetted successfully!' });
        
    }, (err) => {
      if(err) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.error });
      }
    })
  }

  changePassword(body: any) {
    this.http.patch(this.apiUrl + '/changePassword', body).subscribe((res: any) => {
      this.messageService.add({ severity: 'success', summary: 'SUCCESS!', detail: 'Password changed successfully!' });
    }, (err) => {
      if(err) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.error });
      }
    })
  }
}
