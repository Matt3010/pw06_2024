import { Component } from '@angular/core';
import {AuthService} from "../../../_services/auth.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  constructor(
      public authService: AuthService
  ) {
  }

}
