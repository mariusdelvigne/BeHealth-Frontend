import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserSportCreateCommand} from '../utils/user-sport-create-command';
import {Observable} from 'rxjs';
import {UserSportCreateOutput} from '../utils/user-sport-create-output';
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
}
