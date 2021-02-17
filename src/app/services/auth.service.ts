import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { Account } from '../models/account.model';

const URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token;
  private isAuthenticated = false;
  private jwtAuth = false;
  private tokenTimer: any;
  private userId;
  private expiresInDuration = 7200; // expires in 2 hours
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  getToken(){
    return this.token;
  }

  getIsAuth() {
    console.log('auth', this.isAuthenticated);
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  login(email: string, password: string) {

    const authData = {email, password};
    this.http.post<User>(`${URL}login`, authData)
      .subscribe((body) => {
        console.log('login body', body);
        this.token = body.api_token;
        this.authStatusListener.next(true);
        this.setAuthTimer(this.expiresInDuration);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + this.expiresInDuration * 1000);
        this.saveAuthData(this.token, expirationDate, body.id);
        this.router.navigate(['/']);
      }, error => {
        console.log('auth error');
        this.authStatusListener.next(false);
      });

  }

  createAccount(account: Account) {
    console.log('ceating account', account);
    this.http.post<User>(`${URL}accounts`, account)
    .subscribe((body) => {
      console.log(body);
      this.token = body.api_token;
      this.authStatusListener.next(true);
      const now = new Date();
      this.setAuthTimer(this.expiresInDuration);
      const expirationDate = new Date(now.getTime() + this.expiresInDuration * 1000);
      console.log(expirationDate);
      this.saveAuthData(this.token, expirationDate, body.id);
      this.router.navigate(['/']);
    }, error => {
      console.log('auth signup error');
      this.authStatusListener.next(false);
    });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.userId = authInformation.userId;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId) {
    console.log('expiration date', expirationDate);
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('user');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate || !userId) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId
    };
  }
}
