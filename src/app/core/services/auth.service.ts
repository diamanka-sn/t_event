import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AbstractService<any> {
  private authStateSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  public authState$ = this.authStateSubject.asObservable();

  private userInfoSubject = new BehaviorSubject<any>(this.getUserInfo());
  public userInfo$ = this.userInfoSubject.asObservable();

  constructor(http: HttpClient, matSnackbar: MatSnackBar) {
    super(http, matSnackbar);
  }

  login(credentials: { email: string, password: string }): Observable<any | null> {
    return this.create('users/login', credentials).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem('user_info', JSON.stringify(response.user));
          this.authStateSubject.next(true);
          this.userInfoSubject.next(response.user); 
        }
      })
    );
  }

  register(donnees: any): Observable<any | null> {
    return this.create('users/register', donnees).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem('user_info', JSON.stringify(response.user));
          this.authStateSubject.next(true);
          this.userInfoSubject.next(response.user);
        }
      })
    );
  }

  uploadProfile(formData: FormData): Observable<any> {
    return this.create('users/upload', formData).pipe(
      tap(response => {
        console.log(response)
        if (response && response.imageUrl) {
          const updatedUserInfo = { ...this.getUserInfo(), imageUrl: response.imageUrl };
          localStorage.setItem('user_info', JSON.stringify(updatedUserInfo));
          this.userInfoSubject.next(updatedUserInfo);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
    this.authStateSubject.next(false);
    this.userInfoSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getUserInfo(): any {
    const userInfo = localStorage.getItem('user_info');
    return userInfo ? JSON.parse(userInfo) : null;
  }
}

