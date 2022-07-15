import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {DealsService} from "../../services/deals.service";

@Injectable({
  providedIn: 'root'
})
export class DealsResolver implements Resolve<boolean> {
  constructor(private dealService: DealsService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.dealService.getAllDeals();
  }
}
