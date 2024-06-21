import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {AuthService} from "../../../_services/auth.service";
import {FormControl, Validators} from '@angular/forms';
import {SpinnerService} from "../../../_services/spinner.service";

@Component({
    selector: 'app-otp',
    templateUrl: './otp.component.html',
    styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit{


    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private spinnerService: SpinnerService
    ) {
    }

    ngOnInit() {
        this.spinnerService.hide();
    }

    Otp: FormControl = new FormControl('', [Validators.required, Validators.minLength(6)])

    otpConfig = {
        length: 6,
        inputStyles: {
            width: '45px',
            height: '45px',
            border: '1px solid #ccc',
            'text-align': 'center',
            'font-size': '18px',
            margin: '0 5px'
        }
    };

    verifyOtp() {
        this.activatedRoute.params.subscribe((params: Params) => {
            if (params['userId']) {
                this.authService.checkOtp(this.Otp.value, params['userId'])
            }
        })
    }

}