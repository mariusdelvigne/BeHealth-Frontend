import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
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

  public create(userFoodCreate: UserFoodCreateCommand): Observable<UserFoodCreateOutput> {
    let userId = this._authService.getId();
    console.log(UserFoodService.URL + `/${userId}/foods`)
    return this._httpClient.post<UserFoodCreateOutput>(UserFoodService.URL + `/${userId}/foods`, userFoodCreate,
      {
        withCredentials: true,
      });
  }
}
