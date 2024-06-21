import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {PasswordService} from '../../../../_services/password.service';
import {SpinnerService} from "../../../../_services/spinner.service";

@Component({
    selector: 'app-send-mail-password',
    templateUrl: './send-mail-password.component.html',
    styleUrls: ['./send-mail-password.component.scss']
})
export class SendMailPasswordComponent {

    yourEmail: FormControl = new FormControl('', [Validators.required, Validators.email])

    constructor(
        private pswService: PasswordService,
        private spinnerService: SpinnerService
    ) {
    }

    sendEmail() {
        if (this.yourEmail.valid) {
            this.spinnerService.load();
            this.pswService.sendMail({
                email: this.yourEmail.value
            })
        } else {
            console.error('Email non inviata!')
            this.spinnerService.hide();
        }
    }
}
