import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {confirmPasswordValidator} from "../../../_utils/custom-validators/password-match.validator";
import {AuthService} from "../../../_services/auth.service";
import {MenuItem} from "primeng/api";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

    isDisabled: boolean = false;
    step: number = 1;
    errors: string[] = [];

    registerForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]).{8,}$/)]),
        confirm_password: new FormControl('', [Validators.required]),
        captcha: new FormControl('',[Validators.required]),
        first_name: new FormControl('',[Validators.required]),
        last_name: new FormControl('',[Validators.required]),
    }, {validators: [confirmPasswordValidator]})


    constructor(
        private authService: AuthService
    ) {
        this.registerForm.valueChanges.subscribe((res: any) => {
            this.getErrors();
        })
    }


    onSubmit() {
        if (this.registerForm.valid) {
            this.authService.register(
                {
                    firstName: this.registerForm.value.first_name,
                    lastName: this.registerForm.value.last_name,
                    username: this.registerForm.value.email,
                    password: this.registerForm.value.password,
                    confermaPassword: this.registerForm.value.confirm_password,
                    picture: 'https://www.svgrepo.com/show/345418/account-circle.svg',
                }
             );
        } else {
            this.getErrors();
        }
    }


    getErrors() {
        this.errors = [];

        // Controlla gli errori a livello di form
        const formErrors = this.registerForm.errors;
        if (formErrors) {
            Object.keys(formErrors).forEach(errorKey => {
                let errorMessage = '';
                switch (errorKey) {
                    case 'PasswordNoMatch':
                        errorMessage = `Le password non corrispondono`;
                        break;
                    default:
                        errorMessage = `Errore del form non specificato: ${errorKey}`;
                        break;
                }
                this.errors.push(errorMessage);
            });
        }


        if (this.registerForm.invalid) {
            Object.keys(this.registerForm.controls).forEach(field => {
                const control = this.registerForm.get(field);
                switch(field) {
                    case 'confirm_password':
                        field = 'Conferma password';
                        break;
                    case 'first_name':
                        field = 'Nome';
                        break;
                    case 'last_name':
                        field = 'Cognome'
                        break;
                }
                if (control && control.errors && control.dirty) {
                    Object.keys(control.errors).forEach(errorKey => {
                        let errorMessage = '';
                        switch (errorKey) {
                            case 'required':
                                errorMessage = `${field} non valido/a`;
                                break;
                            case 'minlength':
                                errorMessage = `${field} deve avere almeno ${control.errors![errorKey].requiredLength} caratteri`;
                                break;
                            case 'maxlength':
                                errorMessage = `${field} non può superare ${control.errors![errorKey].requiredLength} caratteri`;
                                break;
                            case 'email':
                                errorMessage = `Inserire una mail valida`;
                                break;
                            case 'pattern':
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
