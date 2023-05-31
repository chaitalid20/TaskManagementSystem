
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { appConfig } from '../app/components/common/app.config';

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  constructor(private http: HttpClient,
    private router: Router,) { }

  createTask(formValue: any): Observable<any> {
    return this.http.post(appConfig.apiUrl + 'Task' , formValue)
      .pipe(
        map(resp => {
          return resp;
        })
        //, catchError(error => Observable.throw(this.errorHandler(error)))
      );
  }
}
