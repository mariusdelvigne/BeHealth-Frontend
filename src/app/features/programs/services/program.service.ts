import { Injectable } from '@angular/core';
import {apis, environment} from '../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ProgramCreateCommand} from '../utils/program-create-command';
import {ProgramCreateOutput} from '../utils/program-create-output';
import {Observable} from 'rxjs';
import {ProgramUpdateCommand} from "../utils/program-update-command";

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

  public getProgramsFiltered(privacy?: string, title?: string): Observable<any> {
    let params = new HttpParams();

    if (privacy)
      params = params.set('privacy', privacy);
    if (title)
      params = params.set('title', title);

    return this._httpClient.get<any>(`${ProgramService.URL_PROGRAMS}`, {params: params,withCredentials: true});
  }

  public getProgramById(programId: number): Observable<any> {
    return this._httpClient.get<any>(`${ProgramService.URL_PROGRAMS}/${programId}`, {withCredentials: true});
  }

  public getProgramsByUserId(userId: number): Observable<any> {
    return this._httpClient.get<any>(`${ProgramService.URL_PROGRAMS}/users/${userId}`, {withCredentials: true});
  }

  public deleteProgram(userId: number, programId: number) : Observable<any> {
    return this._httpClient.delete<any>(`${ProgramService.URL_USERS}/${userId}/programs/${programId}`, {withCredentials: true});
  }

  public updateProgram(userId: number, programId: number, command: ProgramUpdateCommand) : Observable<any> {
    return this._httpClient.put<any>(`${ProgramService.URL_USERS}/${userId}/programs/${programId}`, command, {withCredentials: true});
  }

  public getProgramsByAssociations(userId: number, relation: string): Observable<any> {
    return this._httpClient.get<any>(`${ProgramService.URL_USERS}/${userId}/associations/${relation}`, {withCredentials: true});
  }

  public postRelation(userId: number, programId: number, relation: string) : Observable<any> {
    const body = { ProgramId: programId, RelationType: relation };
    return this._httpClient.post(`${ProgramService.URL_USERS}/${userId}/associations`, body,{withCredentials: true});
  }

    // public deleteRelation(userId: number, programId: number, relation: string): Observable<any> {
    // const body = { ProgramId: programId, RelationType: relation };
    // return this._httpClient.delete(`${ProgramService.URL_USERS}/${userId}/associations/delete`, body, {withCredentials: true});
  public deleteRelation(userId: number, programId: number, relation: string): Observable<any> {
      return this._httpClient.delete(`${ProgramService.URL_USERS}/${userId}/associations/delete`, {
        params: {
          ProgramId: programId,
          RelationType: relation
        },
        withCredentials: true
      });
    }
}
