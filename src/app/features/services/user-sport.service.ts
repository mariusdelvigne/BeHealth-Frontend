import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {UserSportCreateCommand} from '../../shared/utils/user-sport-create-command';
import {Observable} from 'rxjs';
import {UserSportCreateOutput} from '../../shared/utils/user-sport-create-output';
import {apis, environment} from '../../../environments/environment';
import {AuthService} from '../../core/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserSportService {
  private static URL: string = `${environment.API_URL}/${apis.USERS_URL}`;

  constructor(private _httpClient: HttpClient, private _authService: AuthService) { }

  public create(userSportCreateCommand: UserSportCreateCommand): Observable<UserSportCreateOutput> {
    let userId = this._authService.getId();
    return this._httpClient.post<UserSportCreateOutput>(UserSportService.URL + `/${userId}/sports`, userSportCreateCommand);
  }

  public getAllBetween(from: Date, to: Date, pageNumber: number, pageSize: number): Observable<any> {
    let userId = this._authService.getId();

    let params = new HttpParams()
      .set('from', from.toISOString())
      .set('to', to.toISOString())
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    return this._httpClient.get<any>(UserSportService.URL + `/${userId}/sports`, {
      params: params,
      withCredentials: true
    });
  }
}
