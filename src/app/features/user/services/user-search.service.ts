import { Injectable } from '@angular/core';
import {apis, environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserSearchQuery} from '../utils/user-search-query';

@Injectable({
  providedIn: 'root'
})
export class UserSearchService {
  private static urlSearchUser = `${environment.API_URL}/${apis.USERS_URL}`;

  constructor(private _http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this._http.get<any>(UserSearchService.urlSearchUser);
  }

  getUserByUsername(query: UserSearchQuery): Observable<any> {
    console.log(UserSearchService.urlSearchUser + "/" + query.username)
    return this._http.get<any>(UserSearchService.urlSearchUser + "/" + query.username);
  }
}
