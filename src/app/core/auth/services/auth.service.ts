import { Injectable } from '@angular/core';
import {apis, environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Authentification} from '../utils/authentification';
import {Observable} from 'rxjs';
import {UserCredentials} from '../utils/user-credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static URL: string = `${environment.API_URL}/${apis.AUTH_URL}`;
  userCredentials: any;

  constructor(private _httpClient: HttpClient) { }

  public signIn(auth: Authentification): Observable<UserCredentials> {
    const request = this._httpClient.post<UserCredentials>(AuthService.URL, auth, {withCredentials: true});

    request.subscribe({
      next: response => {
        this._isAuthenticated = true;
        this._authData = response;
      }
    });

    return request;
  }

  public signOut(): Observable<any> {
    return this._httpClient.delete(AuthService.URL, {withCredentials: true});
  }
}
