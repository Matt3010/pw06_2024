import {Component} from '@angular/core';
import {NgxOtpInputConfig} from "ngx-otp-input";
import {ActivatedRoute, Params} from "@angular/router";
import {AuthService} from "../../../_services/auth.service";

@Component({
    selector: 'app-otp',
    templateUrl: './otp.component.html',
    styleUrls: ['./otp.component.scss']
})
export class OtpComponent {


    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
    ) {
    }

    otpInputConfig: NgxOtpInputConfig = {
        otpLength: 6,
        pattern: /^[a-zA-Z0-9]+$/
    };

    verifyOtp(event: string[]) {
        if (event.every(element => element !== null && element !== '')) {
            this.activatedRoute.params.subscribe((params: Params) => {
                if (params['userId']) {
                    this.authService.checkOtp(event.join(''), params['userId'])
                }
            })
        }
    }

}