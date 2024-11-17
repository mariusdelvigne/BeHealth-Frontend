import { Injectable } from '@angular/core';
import {apis, environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProfileDeleteCommand} from '../utils/profile-delete-command';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private static URL: string = `${environment.API_URL}/${apis.USERS_URL}`;

  constructor(private _httpClient: HttpClient) { }

  public delete(profileDeleteCommand: ProfileDeleteCommand): Observable<void> {
    return this._httpClient.delete<void>(`${ProfileService.URL}/users/${profileDeleteCommand}`, {withCredentials: true});
  }
}
