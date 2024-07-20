import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractService<any>{

  constructor(http: HttpClient, matSnackbar: MatSnackBar) {
    super(http, matSnackbar);
  }

}
