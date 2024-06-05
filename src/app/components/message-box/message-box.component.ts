import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-message-box',
    templateUrl: './message-box.component.html',
    styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent {
    @Input() message: 'email-not-verified' | 'email-verifying' | 'email-verified' | 'email-check' |  null = null;

    history = history;

    constructor(
        public router: Router,
    ) {
    }
}
