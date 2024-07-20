import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends AbstractService<any>{

  constructor(http: HttpClient, matSnackbar: MatSnackBar) {
    super(http, matSnackbar);
  }
}
