import { Component } from '@angular/core';
import {AuthService} from "../../../_services/auth.service";
import {ComponentInjectorService} from "../../../_utils/component-injector.service";
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { MdMdComponent } from '../../modals-templates/md-md/md-md.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  constructor(
      public injectoreComponent: ComponentInjectorService,
      public authService: AuthService
  ) {
  }

  openChangePswModal() {
    this.injectoreComponent.createComponent(MdMdComponent, {component: ChangePasswordComponent, title: 'Update your password'});
  }
}
