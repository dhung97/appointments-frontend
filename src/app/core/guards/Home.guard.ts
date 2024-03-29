import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NavService } from '../services/nav.service';

@Injectable({
  providedIn: 'root'
})

export class HomeGuard implements CanActivate{

  constructor(private _navService: NavService){};

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(localStorage.getItem('credentials')){
      return true;

    } else{
      this._navService.navigateTo('/');
      return false;
    }
  }
}
