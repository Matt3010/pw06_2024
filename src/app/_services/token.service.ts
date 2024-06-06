import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }


  saveToken(token: string) {
      localStorage.setItem('authToken', token);
  }

  getToken(): string {
     return localStorage.getItem('authToken') || '';
  }

  removeToken() {
      localStorage.removeItem('authToken');
  }
}
