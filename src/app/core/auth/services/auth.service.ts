import { Injectable } from '@angular/core';
import {apis, environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AuthCred} from '../utils/auth-cred';
import {Observable} from 'rxjs';
import {AuthData} from '../utils/auth-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static URL: string = `${environment.API_URL}/${apis.AUTH_URL}`;

  private _authData: AuthData | null = null;

  constructor(private _httpClient: HttpClient) { }

  loadData(): Observable<any> {
    const request = this._httpClient.get<AuthData>(AuthService.URL, {withCredentials: true});

    request.subscribe({
      next: response => {
        this._authData = response;
      },
    });

    return request;
  }

  public signIn(auth: AuthCred): Observable<AuthData> {
    const request = this._httpClient.post<AuthData>(AuthService.URL, auth, {withCredentials: true});

    request.subscribe({
      next: response => {
        this._authData = response;
      }
    });

    return request;
  }

  public signOut(): Observable<any> {
    const request = this._httpClient.delete(AuthService.URL, {withCredentials: true});

    request.subscribe({
      next: _ => {
        this._authData = null;
      }
    });

    return request;
  }

  public isAuthenticated(): boolean {
    return this._authData !== null;
  }

  public getId(): number {
    if (this._authData)
      return this._authData.id;
    throw Error('Not logged in');
  }

  public getRole(): string {
    if (this._authData)
      return this._authData.role;
    throw Error('Not logged in');
  }

  public getUsername(): string {
    if (this._authData)
      return this._authData.username;
    throw Error('Not logged in');
  }
}
