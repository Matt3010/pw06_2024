import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(EmailValidator),
      password: new FormControl()
    })
  }

  login(): void {

  }
}
