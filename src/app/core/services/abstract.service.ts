import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, first, of, retry, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface CrudOperations<T> {
  create(lien: string, item: T): Observable<T | null>;
  read(lien: string): Observable<T | null>;
  readAll(lien: string): Observable<T[]>;
  update(lien: string, item: T): Observable<T | null>;
  delete(liend: string): Observable<void>;
}

@Injectable({
  providedIn: 'root'
})
export class AbstractService<T> implements CrudOperations<T> {
  constructor(private http: HttpClient, private matSnackbar: MatSnackBar) { }
  apiUrl = "http://localhost:3000/api"


  create(lien: string, item: T): Observable<T | null> {
    return this.http.post<T>(`${this.apiUrl}/${lien}`, item).pipe(
      tap(console.log),
      catchError((error) => {
        this.handleError(error)
        return of(null)
      })
    )
  }

  read(lien: string): Observable<T | null> {
    return this.http.get<T>(`${this.apiUrl}/${lien}`).pipe(
      tap(t => console.log(t)),
      first(),
      retry(3),
      catchError((error: any) => {
        return of(null);
      })
    );
  }

  readAll(lien: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${lien}`).pipe(
      tap(t => console.log(t)),
      first(),
      retry(3),
      catchError((error: any) => {
        return of([])
      })
    )
  }

  readAllPaginate(lien: string): Observable<{data: T[], total: number}> {
    return this.http.get<{data: T[], total: number}>(`${this.apiUrl}/${lien}`).pipe(
      tap(t => console.log(t)),
      first(),
      retry(3),
      catchError((error: any) => {
        return of({ data: [], total: 0 });
      })
    )
  }

  getNumber(lien: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${lien}`)
  }

  update(lien: string, item: T): Observable<T | null> {
    return this.http.put<T>(`${this.apiUrl}/${lien}`, item).pipe(
      tap(console.log),
      catchError((error) => {
        this.handleError(error)
        return of(null)
      })
    )
  }

  delete(lien: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${lien}`).pipe(
      tap(t => console.log(t)),
      first()
    );
  }

  private handleError(error: any) {
    console.error(error);
    this.matSnackbar.open(
      error?.error.message,
      'Fermer', 
      {
        duration:5000,
        panelClass: ['snackbar-error']
      }
    );      
  }
}
