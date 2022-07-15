import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {UsersService} from "../../services/users.service";

@Injectable({
  providedIn: 'root'
})
export class ClientsResolver implements Resolve<boolean> {
  constructor(private userService: UsersService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.userService.getAllClients();
  }
}

