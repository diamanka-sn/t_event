import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterFormComponent } from '../components/register-form/register-form.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  isLoggedIn!: boolean;
  dropdownOpen = false;
  private unsubscribe$ = new Subject<void>();
  userInfo: any;
  constructor(
    private router:Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.authState$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;
      });

    this.authService.userInfo$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(userInfo => {
        this.userInfo = userInfo;
        console.log('userInfo', userInfo.isOrganizer)
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  register() {
    this.openDialog();
  }

  private openDialog(options = { width: '40vw', height: '95vh', minWidth: '400px' }) {
    const dialogRef = this.dialog.open(RegisterFormComponent, {
      width: options.width,
      height: options.height,
      minWidth: options.minWidth,
    });

    return dialogRef;
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
