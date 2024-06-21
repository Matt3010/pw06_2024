import {Component} from '@angular/core';
import {SpinnerService} from "./_services/spinner.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  spinner$ = this.spinnerService.spinner$;

  constructor(
      private spinnerService: SpinnerService
  ) {
  }

}
