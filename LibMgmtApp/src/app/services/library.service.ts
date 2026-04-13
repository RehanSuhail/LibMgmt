import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Library } from '../models/library.model';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  baseUrl: string = 'http://localhost:5195/api/library/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  getAllLibraries(): Observable<Library[]> {
    return this.http.get<Library[]>(`${this.baseUrl}getalllibraries`)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  getLibraryById(id: number): Observable<Library> {
    return this.http.get<Library>(`${this.baseUrl}getlibrarybyid/${id}`)
      .pipe(retry(1), catchError(this.errorHandl));
  }

findLibraryByName(name: string): Observable<Library[]> {
  return this.http.get<Library[]>(`${this.baseUrl}findlibrarybyname/${name}`)
    .pipe(retry(1), catchError(this.errorHandl));
}


  addLibrary(library: Library): Observable<any> {
    return this.http.post(`${this.baseUrl}addlibrary`, library, this.httpOptions)
      .pipe(catchError(this.errorHandl));
  }

  updateLibrary(id: number, library: Library): Observable<any> {
    return this.http.put(`${this.baseUrl}updatelibrary/${id}`, library, this.httpOptions)
      .pipe(catchError(this.errorHandl));
  }

  deleteLibrary(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}deletelibrary/${id}`, this.httpOptions)
      .pipe(catchError(this.errorHandl));
  }

  errorHandl(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
