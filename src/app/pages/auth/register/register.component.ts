import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup = new FormGroup({
    email: new FormControl(),
    passowrd: new FormControl(),
    confirm_password: new FormControl(),
  })

  constructor() {
  }

}
