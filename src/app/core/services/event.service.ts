import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AbstractService } from './abstract.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService extends AbstractService<any>{

  constructor(http: HttpClient, matSnackbar: MatSnackBar) {
    super(http, matSnackbar);
  }
}
