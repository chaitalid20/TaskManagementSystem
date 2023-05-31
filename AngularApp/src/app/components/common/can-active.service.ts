import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CanActiveGuard implements CanActivate {

  constructor(private router :Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree | any{
     // this.toasterService.showSuccess("Something is wrong","Session Expired!");
      var Session = sessionStorage.getItem("key");
      if(Session != null){
      return true;
   }
   else{
    //this.toasterService.showError("Something is wrong","Session Expired!");
    this.router.navigate(['./login']);
   }


  }

}
