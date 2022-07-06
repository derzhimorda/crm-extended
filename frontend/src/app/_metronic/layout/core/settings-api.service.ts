import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {AuthService} from "../../../modules/auth";
import {Observable, of} from "rxjs";
import {IRoles, ISettings} from "./default-settings.config";

@Injectable({
  providedIn: 'root'
})
export class SettingsApiService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getSettings(): Observable<any>{
    const auth = this.auth.getAuthLocal();
    if (!auth || !auth.token) {
      return of(undefined);
    }
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${auth.token}`,
    });
    return this.http.get<ISettings>(`${environment.apiUrl}/settings/all`, {
      headers: httpHeaders,
    });
  }
}
