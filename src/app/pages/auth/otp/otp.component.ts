import {Component} from '@angular/core';
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



    verifyOtp(event: string) {
        if (event.length === 6) {
            this.activatedRoute.params.subscribe((params: Params) => {
                if (params['userId']) {
                    this.authService.checkOtp(event, params['userId'])
                }
            })
        }
    }

}