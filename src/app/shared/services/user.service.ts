import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apis, environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {UserCreateCommand} from '../../core/auth/utils/user-create-command';
import {UserCreateOutput} from '../../core/auth/utils/user-create-output';
import {UserSearchQuery} from '../utils/user-search-query';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private static URL: string = `${environment.API_URL}/${apis.USERS_URL}`;

  constructor(private _httpClient: HttpClient) { }

  public signUp(userCreateCommand: UserCreateCommand): Observable<UserCreateOutput> {
    return this._httpClient.post<UserCreateOutput>(UserService.URL, userCreateCommand, {withCredentials: true});
  }

  getAllUsers(): Observable<any> {
    return this._httpClient.get<any>(UserService.URL);
  }

  getUserByUsername(query: UserSearchQuery): Observable<any> {
    // console.log(UserSearchService.urlSearchUser + "/" + query.username + "/usernames")
    return this._httpClient.get<any>(UserService.URL + "/" + query.username + "/usernames");
  }

  getUserById(userId: number): Observable<any> {
    return this._httpClient.get<any>(`${UserService.URL}/${userId}`, {withCredentials: true});
  }
}
