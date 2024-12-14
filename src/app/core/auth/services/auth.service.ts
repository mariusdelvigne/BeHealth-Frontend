import { Injectable } from '@angular/core';
import {apis, environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AuthCred} from '../utils/auth-cred';
import {catchError, map, Observable, of} from 'rxjs';
import {AuthData} from '../utils/auth-data';
import {ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements Resolve<boolean> {
  private static URL: string = `${environment.API_URL}/${apis.AUTH_URL}`;

  private _authData: AuthData | null = null;

  constructor(private _httpClient: HttpClient) {
  }

  loadData(): Observable<boolean> {
    const request = this._httpClient.get<AuthData>(AuthService.URL);

    return request.pipe(
      map(response => {
        this._authData = response;
        return true;
      }),
      catchError(() => of(false))
    );
  }

  public signIn(auth: AuthCred): Observable<AuthData> {
    const request = this._httpClient.post<AuthData>(AuthService.URL, auth);

    request.subscribe({
      next: response => {
        this._authData = response;
      }
    });

    return request;
  }

  public signOut(): Observable<any> {
    const request = this._httpClient.delete(AuthService.URL);

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

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<boolean> {
    return this.loadData();
  }

  public isAdmin(): boolean {
     return !!this._authData && this._authData.role === 'Admin';
  }
}
