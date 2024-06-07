import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(
    private readonly http: HttpClient,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.apiUrl = environment.api_url;
  }

  apiUrl: string;

  resetPassword(body: any) {
    this.http.post(this.apiUrl + '/reset-password', body).subscribe((res: any) => {
      this.router.navigateByUrl('auth/login');
    })
  }
}
