import { Injectable } from '@angular/core';
import {apis, environment} from '../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ProgramCreateCommand} from '../utils/program-create-command';
import {ProgramCreateOutput} from '../utils/program-create-output';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  private static URL_USERS: string = `${environment.API_URL}/${apis.USERS_URL}`;
  private static URL_PROGRAMS: string = `${environment.API_URL}/${apis.PROGRAMS_URL}`;

  constructor(private _httpClient: HttpClient) { }

  public create(programCreateCommand: ProgramCreateCommand, userId: number): Observable<ProgramCreateOutput> {
    return this._httpClient.post<ProgramCreateOutput>(`${ProgramService.URL_USERS}/${userId}/programs`, programCreateCommand, {withCredentials: true});
  }

  public getProgramsFiltered(privacy?: string, name?: string): Observable<any> {
    let params = new HttpParams();

    if (privacy)
      params = params.set('privacy', privacy);
    if (name)
      params = params.set('name', name);

    return this._httpClient.get<any>(`${ProgramService.URL_PROGRAMS}`, {params: params,withCredentials: true});
  }

  public getProgramsByUserId(userId: number): Observable<any> {
    return this._httpClient.get<any>(`${ProgramService.URL_PROGRAMS}/users/${userId}`, {withCredentials: true});
  }
}
