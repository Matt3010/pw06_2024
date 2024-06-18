import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "../../../_services/auth.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
      private authService: AuthService,
      private router: Router,
      private toastService: ToastrService
  ) {}

  loginForm!: FormGroup;
  errors: string[] = [];

  intervalId: any;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      captcha: new FormControl('', [Validators.required])
    });

    this.loginForm.valueChanges.subscribe((res: any) => {
      this.getErrors();

    })
    this.addFocusListeners();
  }

  addFocusListeners(): void {
    const formControls = this.loginForm.controls;
    Object.keys(formControls).forEach(controlName => {
      const controlElement = document.querySelector(`[formcontrolname="${controlName}"]`);
      if (controlElement) {
        controlElement.addEventListener('focus', () => {
          this.startInterval();
        }, { once: true });
      }
    });
  }

  startInterval(): void {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.resetForm();
      }, 30000);
    }
  }

  resetForm() {
    this.loginForm.reset();
    this.errors = [];
    this.toastService.warning('Too much time!', 'TIMEOUT!');
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.addFocusListeners();
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
