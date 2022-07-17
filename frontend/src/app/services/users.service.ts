import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../modules/auth";
import {Observable, of} from "rxjs";
import {ISettings} from "../_metronic/layout/core/default-settings.config";
import {environment} from "../../environments/environment";
import {Client} from "../pages/clients/clients.component";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
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

  getAllClients(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/clients`, {
      headers: this.httpHeaders,
    });
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users`, {
      headers: this.httpHeaders,
    });
  }

  makeNewUser(data:any): Observable<any>{
    return this.http.put(`${environment.apiUrl}/clients`, data, {
      headers: this.httpHeaders,
    });
  }

  editUser(data:any, id:number): Observable<any>{
    return this.http.patch(`${environment.apiUrl}/clients/${id}`, data, {
      headers: this.httpHeaders,
    })
  }

  removeUser(id:number){
    return this.http.delete(`${environment.apiUrl}/clients/${id}`, {
      headers: this.httpHeaders,
    });
  }
}
