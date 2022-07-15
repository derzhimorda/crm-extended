import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {DealsService} from "../../../services/deals.service";

@Injectable({
  providedIn: 'root'
})
export class DealResolver implements Resolve<boolean> {
  constructor(private dealService: DealsService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.dealService.getDeal(route.paramMap.get('id'));
  }
}
