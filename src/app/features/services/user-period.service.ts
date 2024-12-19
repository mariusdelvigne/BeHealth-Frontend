import {Injectable} from '@angular/core';
import {apis, environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {UserPeriodCreateCommand} from '../utils/user-period-create-command';
import {UserPeriodCreateOutput} from '../utils/user-period-create-output';
import {Observable} from 'rxjs';
import {AuthService} from '../../core/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserPeriodService {
  private static URL_USERS: string = `${environment.API_URL}/${apis.USERS_URL}`;

  constructor(private _httpClient: HttpClient, private _authService: AuthService) { }

  public create(userPeriodCreateCommand: UserPeriodCreateCommand): Observable<UserPeriodCreateOutput> {
    let userId = this._authService.getId();
    return this._httpClient.post<UserPeriodCreateOutput>(UserPeriodService.URL_USERS + `/${userId}/periods`, userPeriodCreateCommand);
  }

  public getAllBetween(from: Date, to: Date, pageNumber: number, pageSize: number): Observable<any> {
    let userId = this._authService.getId();

    let params = new HttpParams()
      .set('from', from.toISOString())
      .set('to', to.toISOString())
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    return this._httpClient.get<any>(UserPeriodService.URL_USERS + `/${userId}/periods`, {params: params});
  }
}
