import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {apis, environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {UserCreateCommand} from '../../core/auth/utils/user-create-command';
import {UserCreateOutput} from '../../core/auth/utils/user-create-output';
import {UserSearchQuery} from '../../features/utils/user-search-query';
import {UserUpdateCommand} from '../utils/user-update-command';
import {UserBanCommand} from '../../features/users/utils/user-ban-command';
import {UserPasswordCreateCommand} from '../utils/user-password-create-command';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private static URL: string = `${environment.API_URL}/${apis.USERS_URL}`;

  constructor(private _httpClient: HttpClient) {
  }

  public signUp(userCreateCommand: UserCreateCommand): Observable<UserCreateOutput> {
    return this._httpClient.post<UserCreateOutput>(UserService.URL, userCreateCommand);
  }

  public getById(userId: number): Observable<any> {
    return this._httpClient.get<any>(`${UserService.URL}/${userId}`);
  }

  public update(userId: number, userUpdateCommand: UserUpdateCommand): Observable<void> {
    return this._httpClient.put<void>(`${UserService.URL}/${userId}`, userUpdateCommand);
  }

  getAllUsers(): Observable<any> {
    return this._httpClient.get<any>(UserService.URL);
  }

  getUserByUsername(query: UserSearchQuery): Observable<any> {
    let params = new HttpParams();

    if (query.username)
      params = params.set('user', (query.username));

    params = params.set('pageNumber', (query.pageNumber).toString());
    params = params.set('pageSize', (query.pageSize).toString());

    return this._httpClient.get<any>(UserService.URL + "/usernames", {params: params});
  }

  getListUserByUsername(name: string): Observable<any> {
    return this._httpClient.get<any>(UserService.URL + "/usernames?user=" + name);
  }

  public banUser(userBanCommand: UserBanCommand): Observable<void> {
    return this._httpClient.put<void>(`${UserService.URL}/${userBanCommand.userId}/ban/${userBanCommand.isBanned}`, {});
  }

  public deleteAllPlanByUserId(userId: number): Observable<any> {
    return this._httpClient.delete<void>(`${UserService.URL}/${userId}/plans`);
  }

  public deleteAllProgramsByUserId(userId: number): Observable<any> {
    return this._httpClient.delete<void>(`${UserService.URL}/${userId}/programs`);
  }

  public deleteAllFeedbackByUserId(userId: number): Observable<any> {
    return this._httpClient.delete<void>(`${UserService.URL}/${userId}/feedbacks`);
  }

  public getCurrentData(userId: number): Observable<any> {
    return this._httpClient.get<any>(`${UserService.URL}/${userId}/data`);
  }

  public createPassword(userId: number, command: UserPasswordCreateCommand): Observable<void> {
    return this._httpClient.post<void>(`${UserService.URL}/${userId}/passwords`, command);
  }
}
