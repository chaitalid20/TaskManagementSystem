import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
    private router: Router,) { }

  login(formValue: any): Observable<any> {
    //appConfig.apiUrl
    return this.http.post( 'Login/ValidateLogin', formValue)
      .pipe(
        map(resp => {
          return resp;
        })
       // , catchError(error => Observable.throw(this.errorHandler(error)))
      );
  }

  errorHandler(error: any): void {
    if (error.status == 401) {
      //localStorage.clear();
      this.router.navigate(['/Login']);

    }
    if (error.status == 412) {
      this.router.navigate(['/app/noaccess']);
    }
    else if (error.status == 500) {
      //this.globalError.handleError(error);
    }
  }
  
  errorHandlerLogin(error: any): void {
    localStorage.clear()
    this.router.navigate(['/Login']);
  }
}
