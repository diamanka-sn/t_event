import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  form!: FormGroup;

  constructor(private authService: AuthService, private router: Router, public dialogRef: MatDialogRef<RegisterFormComponent>) { }

  ngOnInit() {
    this.init()
  }

  init() {
    this.form = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(77|78|70|75|76)\d{7}$/)
      ]),
      isOrganizer: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.minLength(8),
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)
      ]),
      confirmPassword: new FormControl('', [Validators.required, this.matchPasswords.bind(this)]),
      acceptTerms: new FormControl('', [Validators.required])
    });
  }

  matchPasswords(control: FormControl): { [s: string]: boolean } | null {
    if (this.form) {
      return control.value === this.form.get('password')?.value ? null : { mismatch: true };
    }
    return null;
  }
  
  get firstname() {
    return this.form.get('firstname') as FormControl;
  }

  get lastname() {
    return this.form.get('lastname') as FormControl;
  }

  get phone() {
    return this.form.get('phone') as FormControl;
  }

  get isOrganizer() {
    return this.form.get('isOrganizer')
  }

  get email() {
    return this.form.get('email') as FormControl;;
  }

  get password() {
    return this.form.get('password') as FormControl;;
  }

  get confirmPassword() {
    return this.form.get('confirmPassword') as FormControl;;
  }

  get acceptTerms() {
    return this.form.get('acceptTerms') as FormControl;;
  }

  onSubmit() {
    if (this.form.valid) {
      const isOrganizerBoolean = this.form.get('isOrganizer')?.value === '1';

      this.form.patchValue({
        isOrganizer: isOrganizerBoolean
      });

      const data = this.form.value
      this.authService.register(data).subscribe(
        response => {
          if (response) {
            this.dialogRef.close()
            this.router.navigate(['/']);
          }
        }
      );
    }
  }
}
