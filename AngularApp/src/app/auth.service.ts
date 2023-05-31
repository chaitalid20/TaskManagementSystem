import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './components/model/user';
import { appConfig } from './components/common/app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  session : any;
  constructor(private http: HttpClient) {
  }

  public login(user: User): Observable<string> {
    return this.http.post(appConfig.apiUrl + 'Auth/login' , user, {
      responseType: 'text',
    });
  }

  public register(user: User): Observable<any> {
    return this.http.post<any>(
      appConfig.apiUrl + 'Auth/register' ,
      user
    );
    }
}
