import {ChangeDetectorRef, Component} from '@angular/core';

@Component({
    selector: 'app-analytics',
    templateUrl: './analytics.component.html',
    styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent {


    constructor(
        private cdr: ChangeDetectorRef,
    ) {
    }

    step: 1 | 2 = 2;

}
