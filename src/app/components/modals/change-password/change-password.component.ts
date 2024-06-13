import { Component } from '@angular/core';
import { PasswordService } from '../../../_services/password.service';
import { ActivatedRoute } from '@angular/router';
import { confirmPasswordValidator } from '../../../_utils/custom-validators/password-match.validator';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComponentInjectorService } from '../../../_utils/component-injector.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  token: string | null = null;

  errors: string[] = [];

  changeForm: FormGroup = new FormGroup(
    {
      old_password: new FormControl("", [Validators.required]),
      new_password: new FormControl("", [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]).{8,}$/)]),
      confirm_password: new FormControl("", [Validators.required]),
    }, { validators: [confirmPasswordValidator]});

  constructor(
    private pswService: PasswordService,
    private injectorService: ComponentInjectorService
  ) {
    this.changeForm.valueChanges.subscribe((res: any) => {
      this.getErrors();
    });
  }

  changePassword() {
    if(this.changeForm.valid) {
      this.pswService.changePassword(
        {
          oldPassword: this.changeForm.value.old_password,
          newPassword: this.changeForm.value.confirm_password
        }
      );
      this.injectorService.destroyComponent();
    }
  }

  getErrors() {
    this.errors = [];

    // Controlla gli errori a livello di form
    const formErrors = this.changeForm.errors;
    if (formErrors) {
      Object.keys(formErrors).forEach((errorKey) => {
        let errorMessage = "";
        switch (errorKey) {
          case "PasswordNoMatch":
            errorMessage = `Le password non corrispondono`;
            break;
          default:
            errorMessage = `Errore del form non specificato: ${errorKey}`;
            break;
        }
        this.errors.push(errorMessage);
      });
    }

    if (this.changeForm.invalid) {
      Object.keys(this.changeForm.controls).forEach((field) => {
        const control = this.changeForm.get(field);
        if (control && control.errors && control.dirty) {
          Object.keys(control.errors).forEach((errorKey) => {
            let errorMessage = "";
            switch (errorKey) {
              case "required":
                errorMessage = `${field} non valido/a`;
                break;
              case "minlength":
                errorMessage = `${field} deve avere almeno ${
                  control.errors![errorKey].requiredLength
                } caratteri`;
                break;
              case "maxlength":
                errorMessage = `${field} non può superare ${
                  control.errors![errorKey].requiredLength
                } caratteri`;
                break;
              case "pattern":
                errorMessage = `La password non rispetta i requisiti minimi`;
                break;
              // Aggiungi qui altri casi per gestire altri tipi di errori
              default:
                errorMessage = `${field}: errore non specificato ${errorKey}`;
                break;
            }
            this.errors.push(errorMessage);
          });
        }
      });
    }
  }
}
