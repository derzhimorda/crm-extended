import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {AuthService} from "../../../modules/auth";
import {Observable, of} from "rxjs";
import {ISettings} from "./default-settings.config";

@Injectable({
  providedIn: 'root'
})
export class SettingsApiService {
  private httpHeaders:any;

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

  getSettings(): Observable<any>{
    return this.http.get<ISettings>(`${environment.apiUrl}/settings/all`, {
      headers: this.httpHeaders,
    });
  }
}
