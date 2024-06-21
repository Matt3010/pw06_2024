import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "../../../_services/auth.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {SpinnerService} from "../../../_services/spinner.service";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private spinnerService: SpinnerService
  ) {}

  loginForm!: FormGroup;
  errors: string[] = [];
  interval!: any;

  showPassword: boolean = false;

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

  ngOnDestroy(): void {
    if(this.interval) {
      clearInterval(this.interval);
    }
  }

  startInterval(): void {
    if(!this.interval) {
      this.interval = setInterval(() => {
        this.resetForm();
      }, 30000);
    }
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

  resetForm() {
    this.loginForm.reset();
    this.errors = [];
    this.messageService.add({severity: 'warn', summary: 'TIMEOUT', detail: 'Too much time to complete login'});
    clearInterval(this.interval);
    this.interval = null;
    this.addFocusListeners();
  }

  login(): void {
    if(this.loginForm.valid) {
      this.spinnerService.load();
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

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
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
