import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../../_services/auth.service";

@Component({
    selector: 'app-confirm-email',
    templateUrl: './confirm-email.component.html',
    styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent {

    goToEmailSucceeded: 1 | 2 | 3 = 2;

    constructor(
        private route: ActivatedRoute,
        private authService: AuthService
    ) {
    }

    ngOnInit() {
        this.route.queryParams
            .subscribe(params => {
                    if (params['token'] !== undefined) {
                        this.authService.verifyEmail(params['token']).subscribe((res: any) => {
                            if (res.message === 'Email confirmed successfully') {
                                this.goToEmailSucceeded = 3;
                            } else {
                                this.goToEmailSucceeded = 1;
                            }
                        })
                    } else {
                        this.goToEmailSucceeded = 1;
                    }
                }
            );
    }

}
