import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AfkService {
  private timeoutId: any;
  private readonly timeoutDuration: number = 15 * 60 * 1000;

  constructor(
    private ngZone: NgZone,
    private authService: AuthService
  ) {
    this.startTimer();
    this.initializeEventListeners();
  }

  private initializeEventListeners(): void {
    ['click', 'mousemove', 'keypress', 'touchstart'].forEach(event => 
      window.addEventListener(event, () => this.resetTimer()));
  }

  private startTimer(): void {
    this.ngZone.runOutsideAngular(() => {
      this.timeoutId = setTimeout(() => this.logout(), this.timeoutDuration);
    });
  }

  private resetTimer(): void {
    clearTimeout(this.timeoutId);
    this.startTimer();
  }

  private logout(): void {
    this.ngZone.run(() => {
      this.authService.logout();
    });
  }
}