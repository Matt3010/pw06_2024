import {Component} from '@angular/core';
import {NgxOtpInputConfig} from "ngx-otp-input";

@Component({
    selector: 'app-otp',
    templateUrl: './otp.component.html',
    styleUrls: ['./otp.component.scss']
})
export class OtpComponent {


    constructor() {
    }

    otpInputConfig: NgxOtpInputConfig = {
        otpLength: 6,
    };


    verifyOtp(event: string[]) {
        if (event.every(element => element !== null && element !== '')) {
            console.log(event.join(''));
        }
    }

}