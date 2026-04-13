import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'http://localhost:5195/api/book';

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/getallbooks`);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/getbookbyid/${id}`);
  }

  findBookByName(name: string) {
  return this.http.get<Book[]>(`${this.apiUrl}/findbookbyname/${name}`);
}


  addBook(book: Book): Observable<any> {
    return this.http.post(`${this.apiUrl}/addbook`, book);
  }

  updateBook(id: number, book: Book): Observable<any> {
    return this.http.put(`${this.apiUrl}/updatebook/${id}`, book);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletebook/${id}`);
  }
}
