import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-boilerplate',
  templateUrl: './boilerplate.component.html',
  styleUrls: ['./boilerplate.component.scss']
})
export class BoilerplateComponent {

  constructor(public router: Router) {
  }

}
