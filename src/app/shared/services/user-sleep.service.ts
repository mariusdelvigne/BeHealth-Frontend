import { Injectable } from '@angular/core';
import {apis, environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../core/auth/services/auth.service';
import {UserSportCreateCommand} from '../utils/user-sport-create-command';
import {UserSleepCreateOutput} from '../utils/user-sleep-create-output';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSleepService {
  private static URL: string = `${environment.API_URL}/${apis.USERS_URL}`;

  constructor(private _httpClient: HttpClient, private _authService: AuthService) { }

  public create(createUserSleepCommand: UserSportCreateCommand): Observable<UserSleepCreateOutput> {
    let userId = this._authService.getId();
    return this._httpClient.post<UserSleepCreateOutput>(UserSleepService.URL + `/${userId}/sleeps`, createUserSleepCommand, {
      withCredentials: true,
    });
  }
}
