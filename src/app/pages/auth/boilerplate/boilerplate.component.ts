import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../_services/auth.service";

@Component({
    selector: 'app-boilerplate',
    templateUrl: './boilerplate.component.html',
    styleUrls: ['./boilerplate.component.scss']
})
export class BoilerplateComponent {

    constructor(
        public router: Router,
        private authService: AuthService
    ) {
        authService.currentUser$.subscribe((res) => {
            if (res !== null) {
                const boilerplateContainer = document.getElementById('container-boilerplate')!;
                const bg = document.getElementById('bg-image-container')!;

                // boilerplateContainer.style.opacity = '0';
                // boilerplateContainer.style.transition = 'all 0.2s';
                // bg.style.height = '33%';
                // bg.style.background = 'rgba(123, 178, 255, 0.47)';
                // bg.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
                // bg.style.backdropFilter = 'blur(4px)';
                // bg.style.transition = 'all 1s';
                router.navigateByUrl('pages/dashboard');
            }
        });


    }

}
