import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class authGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.authState$.pipe(
      map(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate(['/']);
        }
        return isLoggedIn;
      })
    );
  }
};
