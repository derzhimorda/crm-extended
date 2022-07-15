import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../modules/auth";
import {mergeMap, Observable, of} from "rxjs";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DealsService {
  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.initService();
  }

  initService() {
    const authData = this.auth.getAuthLocal();
    if (!authData || !authData.token) {
      return of(undefined);
    }

    this.httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${authData.token}`,
    });
  }

  getDeal(id:any){
    return this.http.get(`${environment.apiUrl}/deals/${id}`, {
      headers: this.httpHeaders,
    });
  }

  getAllDeals(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/deals/all`, {
      headers: this.httpHeaders,
    });
  }

  newDeal(data:any){
    return this.http.post(`${environment.apiUrl}/deals/new`, data, {
      headers: this.httpHeaders,
    });
  }

  addTaskDeal(form: any, files?: any){
    if(files){
      return this.http.post(`${environment.apiUrl}/deals/uploadFiles`, files, {
        headers: this.httpHeaders,
      }).pipe(
        map(dataFiles => {
          const data = [];
          data.push(dataFiles);
          data.push(form);
          return data;
        }),
        mergeMap(data => this.http.post(`${environment.apiUrl}/deals/add_task`, data, {
          headers: this.httpHeaders,
        }))
      )
    } else {
      return this.http.post(`${environment.apiUrl}/deals/add_task`, form, {
        headers: this.httpHeaders,
      });
    }
  }

  editDealTask(form: any, files?: any){
    if(files){
      return this.http.post(`${environment.apiUrl}/deals/uploadFiles`, files, {
        headers: this.httpHeaders,
      }).pipe(
        map(dataFiles => {
          const data = [];
          data.push(dataFiles);
          data.push(form);
          return data;
        }),
        mergeMap(data => this.http.post(`${environment.apiUrl}/deals/${form.id}/edit`, data, {
          headers: this.httpHeaders,
        }))
      )
    } else {
      return this.http.post(`${environment.apiUrl}/deals/${form.id}/edit`, form, {
        headers: this.httpHeaders,
      });
    }
  }
}
