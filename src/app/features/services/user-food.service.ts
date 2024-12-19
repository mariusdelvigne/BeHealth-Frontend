import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {apis, environment} from '../../../environments/environment';
import {UserFoodCreateCommand} from '../utils/user-food-create-command';
import {Observable} from 'rxjs';
import {UserFoodCreateOutput} from '../utils/user-food-create-output';
import {AuthService} from '../../core/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserFoodService {
  private static URL: string = `${environment.API_URL}/${apis.USERS_URL}`;

  constructor(private _httpClient: HttpClient, private _authService: AuthService) { }

  public getAllBetween(from: Date, to: Date, pageNumber: number, pageSize: number): Observable<any> {
    let userId = this._authService.getId();

    let params = new HttpParams()
      .set('from', from.toISOString())
      .set('to', to.toISOString())
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    return this._httpClient.get<any>(UserFoodService.URL + `/${userId}/foods`, {params: params});
  }

  public create(userFoodCreate: UserFoodCreateCommand): Observable<UserFoodCreateOutput> {
    let userId = this._authService.getId();
    return this._httpClient.post<UserFoodCreateOutput>(UserFoodService.URL + `/${userId}/foods`, userFoodCreate);
  }
}
