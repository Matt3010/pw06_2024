import {Injectable} from "@angular/core";
import {CanActivate, CanActivateChild, CanDeactivate, CanLoad, Router} from "@angular/router";
import {AuthService} from "../_services/auth.service";
import {TokenService} from "../_services/token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private tokenService: TokenService) {}

  canActivate(): boolean {
    return this.checkAuth();
  }

  private checkAuth(): boolean {
    if (this.tokenService.getToken()) {
      return true;
    } else {
      this.authService.logout()
      this.router.navigate(['/auth/login']);
      return false;
    }
  }

}