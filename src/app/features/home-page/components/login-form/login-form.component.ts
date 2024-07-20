import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.required]),
  });
  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.email.valueChanges.pipe(
      delay(2300),
      tap(console.log)
    ).subscribe();

    this.password.valueChanges.pipe(
      tap(console.log)
    ).subscribe();
  }
  get email() {
    return this.form?.get('email') as FormControl;
  }

  get password() {
    return this.form?.get('password') as FormControl;
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login({ email: this.email.value, password: this.password.value }).subscribe(
        response => {
          if (response) {
            this.router.navigate(['/']);
          }
        }
      );
    }
  }

  register() {
    this.openDialog();
  }

  private openDialog(options = { width: '40vw', height: '95vh', minWidth: '400px' },) {
    const dialogRef = this.dialog.open(RegisterFormComponent, {
      width: options.width,
      height: options.height,
      minWidth: options.minWidth,
    });

    return dialogRef;
  }
}