import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { confirmPasswordValidator } from "../../../../_utils/custom-validators/password-match.validator";
import { PasswordService } from "../../../../_services/password.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent implements OnInit {

  token: string | null = null;

  errors: string[] = [];

  resetForm: FormGroup = new FormGroup(
    {
      new_password: new FormControl("", [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]).{8,}$/)]),
      confirm_password: new FormControl("", [Validators.required]),
    }, { validators: [confirmPasswordValidator]});

  constructor(
    private pswService: PasswordService,
    private route: ActivatedRoute
  ) {
    this.resetForm.valueChanges.subscribe((res: any) => {
      this.getErrors();
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.token = this.route.snapshot.queryParamMap.get('token');
    })
  }

  resetPassword() {
    if (this.resetForm.valid) {
        this.pswService.resetPassword(
          {
            token: this.token,
            newPassword: this.resetForm.value.confirm_password,
          }
        );
    } else {
      this.getErrors();
    }
  }

  getErrors() {
    this.errors = [];

    // Controlla gli errori a livello di form
    const formErrors = this.resetForm.errors;
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

    if (this.resetForm.invalid) {
      Object.keys(this.resetForm.controls).forEach((field) => {
        const control = this.resetForm.get(field);
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
