import { Injectable } from '@angular/core';
import {apis, environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AuthService} from '../../core/auth/services/auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserHeightService {
  private static URL: string = `${environment.API_URL}/${apis.USERS_URL}`;

  constructor(private _httpClient: HttpClient, private _authService: AuthService) { }

  public getAllBetween(from: Date, to: Date, pageNumber: number, pageSize: number): Observable<any> {
    let userId = this._authService.getId();

    let params = new HttpParams()
      .set('from', from.toISOString())
      .set('to', to.toISOString())
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    return this._httpClient.get<any>(UserHeightService.URL + `/${userId}/heights`, {
      params: params,
      withCredentials: true
    });
  }

  public create(height: number): Observable<any> {
    let userId = this._authService.getId();
    return this._httpClient.post<any>(UserHeightService.URL + `/${userId}/heights`, {heightInCm: height}, {
      withCredentials: true,
    });
  }
}
