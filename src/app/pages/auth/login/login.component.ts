import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "../../../_services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
      private authService: AuthService
  ) {}

  loginForm!: FormGroup;
  errors: string[] = [];

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      captcha: new FormControl('', [Validators.required])
    });

    this.loginForm.valueChanges.subscribe((res: any) => {
      this.getErrors();
    })
  }

  login(): void {
    if(this.loginForm.valid) {
      this.authService.login(
          {
            username: this.loginForm.value.email,
            password: this.loginForm.value.password
          }
      );
    } else {
      this.getErrors();
    }
  }

  getErrors() {
    this.errors = [];
    if (this.loginForm.invalid) {
      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        if (control && control.errors && control.dirty) {
          Object.keys(control.errors).forEach(errorKey => {
            let errorMessage = '';
            switch (errorKey) {
              case 'required':
                errorMessage = `${field} è richiesto.`;
                break;
              case 'email':
                errorMessage = `Email non valida`;
                break;
                // Aggiungi qui altri casi per gestire altri tipi di errori
              default:
                errorMessage = `${field}: errore non specificato.`;
                break;
            }
            this.errors.push(errorMessage);
          });
        }
      });
    }
  }
}
