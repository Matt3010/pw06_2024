import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  errors: string[] = [];

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirm_password: new  FormControl('', [Validators.required]),
  })

  constructor() {
    this.registerForm.valueChanges.subscribe((res: any) => {
        this.getErrors();
    })
  }


  onSubmit() {
    if(this.registerForm.valid) {

    } else {
      this.getErrors();
    }
  }


  getErrors() {
    this.errors = [];
    if (this.registerForm.invalid) {
      Object.keys(this.registerForm.controls).forEach(field => {
        const control = this.registerForm.get(field);
        if (control && control.errors) {
          Object.keys(control.errors).forEach(errorKey => {
            let errorMessage = '';
            switch (errorKey) {
              case 'required':
                errorMessage = `${field} è richiesto.`;
                break;
              case 'minlength':
                errorMessage = `${field} deve avere almeno ${control.errors![errorKey].requiredLength} caratteri.`;
                break;
              case 'maxlength':
                errorMessage = `${field} non può superare ${control.errors![errorKey].requiredLength} caratteri.`;
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
