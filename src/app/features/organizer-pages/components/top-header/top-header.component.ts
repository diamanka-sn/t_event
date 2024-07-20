import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent {
  dropdownOpen = false;
  userInfo: any;
  private unsubscribe$ = new Subject<void>();


  constructor(
    private router: Router,

    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.subscribeToUserInfo(); 
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  private subscribeToUserInfo(): void {
    this.authService.userInfo$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(userInfo => {
        this.userInfo = userInfo;
      });
  }

  getUserDisplayName(): string {
    return this.userInfo ? `${this.userInfo.firstname} ${this.userInfo.lastname}` : '';
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
