import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../dto/user.dto';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class AuthenticationService {
  endpoint: string = 'https://css.teknologija.com/authenticate';

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  authenticate(product: User): Observable<User> {
    return this.httpClient.post<User>(this.endpoint, product, this.httpHeader);
  }
}
