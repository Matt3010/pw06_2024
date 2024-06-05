import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../../_services/auth.service";

@Component({
    selector: 'app-confirm-email',
    templateUrl: './confirm-email.component.html',
    styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent {

    goToEmailSucceeded: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private authService: AuthService
    ) {
    }

    ngOnInit() {
        this.route.queryParams
            .subscribe(params => {
                    if (params['token']) {
                        this.authService.verifyEmail(params['token']).subscribe((res: any) => {
                            if (res.message === 'Email confirmed successfully') {
                                this.goToEmailSucceeded = true;
                            } else {
                                this.goToEmailSucceeded = false;
                            }
                        })
                    } else {
                        this.goToEmailSucceeded = false;
                    }
                }
            );
    }

}
