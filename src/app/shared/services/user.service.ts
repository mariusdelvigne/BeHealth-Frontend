import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apis, environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {UserCreateCommand} from '../../core/auth/utils/user-create-command';
import {UserCreateOutput} from '../../core/auth/utils/user-create-output';
import {UserSearchQuery} from '../utils/user-search-query';
import {UserUpdateCommand} from '../utils/user-update-command';
import {UserBanCommand} from '../utils/user-ban-command';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private static URL: string = `${environment.API_URL}/${apis.USERS_URL}`;

  constructor(private _httpClient: HttpClient) { }

  public signUp(userCreateCommand: UserCreateCommand): Observable<UserCreateOutput> {
    return this._httpClient.post<UserCreateOutput>(UserService.URL, userCreateCommand, {withCredentials: true});
  }

  public getById(userId: number): Observable<any> {
    console.log(`${UserService.URL}/${userId}`)
    return this._httpClient.get<any>(`${UserService.URL}/${userId}`, {
      withCredentials: true,
    });
  }

  public update(userId: number, userUpdateCommand: UserUpdateCommand): Observable<void> {
    return this._httpClient.put<void>(`${UserService.URL}/${userId}`, userUpdateCommand, {
      withCredentials: true,
    });
  }

  getAllUsers(): Observable<any> {
    return this._httpClient.get<any>(UserService.URL);
  }

  getUserByUsername(query: UserSearchQuery): Observable<any> {
    return this._httpClient.get<any>(UserService.URL + "/" + query.username + "/usernames");
  }

  public banUser(userBanCommand: UserBanCommand): Observable<void> {
    return this._httpClient.put<void>(`${UserService.URL}/${userBanCommand.userId}/ban/${userBanCommand.isBanned}`, {withCredentials: true});
  }

  public deleteAllPlanByUserId(userId: number): Observable<any> {
    return this._httpClient.delete<void>(`${UserService.URL}/${userId}/plans`, {withCredentials: true,});
  }

  public deleteAllProgramsByUserId(userId: number): Observable<any> {
    return this._httpClient.delete<void>(`${UserService.URL}/${userId}/programs`, {withCredentials: true,});
  }

  public deleteAllFeedbackByUserId(userId: number): Observable<any> {
    return this._httpClient.delete<void>(`${UserService.URL}/${userId}/programFeedbacks`, {withCredentials: true,});
  }

  public getCurrentData(userId: number): Observable<any> {
    return this._httpClient.get<any>(`${UserService.URL}/${userId}/data`, {withCredentials: true,});
  }
}
