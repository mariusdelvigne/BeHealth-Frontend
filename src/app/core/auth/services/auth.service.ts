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

  private _isAuthenticated: boolean = false;
  private _authData: AuthData = {
    id: 0,
    username: '',
    role: '',
  };

  constructor(private _httpClient: HttpClient) {
    this.onInit();
  }

  onInit(): void {
    const request = this._httpClient.get<AuthData>(AuthService.URL, {withCredentials: true});

    request.subscribe({
      next: response => {
        this._isAuthenticated = true;
        this._authData = response;
      },
    });
  }

  public signIn(auth: AuthCred): Observable<AuthData> {
    const request = this._httpClient.post<AuthData>(AuthService.URL, auth, {withCredentials: true});

    request.subscribe({
      next: response => {
        this._isAuthenticated = true;
        this._authData = response;
      }
    });

    return request;
  }

  public signOut(): Observable<any> {
    const request = this._httpClient.delete(AuthService.URL, {withCredentials: true});

    request.subscribe({
      next: _ => {
        this._isAuthenticated = false;
        this._authData.id = 0;
        this._authData.role = '';
        this._authData.username = '';
      }
    });

    return request;
  }

  public isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  public getId(): number {
    return this._authData.id;
  }

  public getRole(): string {
    return this._authData.role;
  }

  public getUsername(): string {
    return this._authData.username;
  }
}
