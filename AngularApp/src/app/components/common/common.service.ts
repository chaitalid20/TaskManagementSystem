import { Injectable, NgZone} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { appConfig } from '../common/app.config';
import { Observable, throwError, forkJoin, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  logInUser: any;
  token!: string;
  UserId!: number;
  UserIndexID!: number;
  roleId!: number;

  private ipRegex = new RegExp(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/);

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _zone: NgZone) { }

  getData(url: any): Observable<any> {
    //...using get request
    //debugger;
      if (this.UserId == undefined) {
          this.logInUser = sessionStorage.getItem('key');
      }
      else {
          this.logInUser = this.UserId;
      }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        //'Authorization': JSON.stringify( this.logInUser.Data.Token),
        'Authentication': JSON.stringify( this.logInUser),
        "Access-Control-Allow-Headers": "*", // this will allow all CORS requests
        "Access-Control-Allow-Methods": 'OPTIONS,POST,GET', // this states the allowed methods
      })
    };

    return this._http.get(appConfig.apiUrl + url, httpOptions)
    .pipe(
      map((response: any) => response),
      catchError(error => this.handleError(error))
    );
  }

  getDataWitoutAuth(url: any): Observable<any> {
    //...using get request
    return this._http.get(appConfig.apiUrl + url)
      // ...and calling .json() on the response to return data
      .pipe(
        map((response: any) => response),
        catchError(error => this.handleError(error))
      );
  }

  postData(url: any, postData: any): Observable<any> {
      if (this.UserId == undefined) {
          this.logInUser = sessionStorage.getItem('key');
      }
      else {
          this.logInUser = this.UserId;
      }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
       // 'Authorization': JSON.stringify( this.logInUser.Data.Token),
        'Authentication': JSON.stringify( this.logInUser)
      })
    };

    return this._http.post(appConfig.apiUrl + url, postData, httpOptions)
      // ...and calling .json() on the response to return data
      .pipe(
        map((response: any) => response),
        catchError(error => this.handleError(error))
      );

  }

  postData(url: any, postData: any): Observable<any> {
    if (this.UserId == undefined) {
        this.logInUser = sessionStorage.getItem('key');
    }
    else {
        this.logInUser = this.UserId;
    }
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
     // 'Authorization': JSON.stringify( this.logInUser.Data.Token),
      'Authentication': JSON.stringify( this.logInUser)
    })
  };

  return this._http.post(appConfig.apiUrl + url, postData, httpOptions)
    // ...and calling .json() on the response to return data
    .pipe(
      map((response: any) => response),
      catchError(error => this.handleError(error))
    );

}


  errorHandler(error: any): void {
    if (error.status == 401) {
      // localStorage.clear();
      this._router.navigate(['/login']);

    }
    if (error.status == 412) {
      this._router.navigate(['/app/noaccess']);

    }
    else if (error.status == 500) {
      //this.globalError.handleError(error);
    }
  }

  getIPAddress(){
    return this._http.get("https://jsonip.com")
      .pipe(
       map(response => response )
      ,catchError(error => Observable.throw(this.errorHandler(error)))
    );
  }

  handleError(error: { error: { message: any; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
