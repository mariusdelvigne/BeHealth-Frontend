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
    return this._httpClient.post<ProgramCreateOutput>(`${ProgramService.URL_USERS}/${userId}/programs`, programCreateCommand);
  }

  public getProgramsFiltered(privacy?: string, title?: string): Observable<any> {
    let params = new HttpParams();

    if (privacy)
      params = params.set('privacy', privacy);
    if (title)
      params = params.set('title', title);

    return this._httpClient.get<any>(`${ProgramService.URL_PROGRAMS}`, {params: params});
  }

  public getProgramById(programId: number): Observable<any> {
    return this._httpClient.get<any>(`${ProgramService.URL_PROGRAMS}/${programId}`);
  }

  public getProgramsByUserId(userId: number): Observable<any> {
    return this._httpClient.get<any>(`${ProgramService.URL_PROGRAMS}/users/${userId}`);
  }

  public deleteProgram(userId: number, programId: number) : Observable<any> {
    return this._httpClient.delete<any>(`${ProgramService.URL_USERS}/${userId}/programs/${programId}`);
  }

  public updateProgram(userId: number, programId: number, command: ProgramUpdateCommand) : Observable<any> {
    return this._httpClient.put<any>(`${ProgramService.URL_USERS}/${userId}/programs/${programId}`, command);
  }

  public getProgramsByAssociations(userId: number, relation: string): Observable<any> {
    return this._httpClient.get<any>(`${ProgramService.URL_USERS}/${userId}/associations/${relation}`);
  }

  public postRelation(userId: number, programId: number, relation: string) : Observable<any> {
    const body = { ProgramId: programId, RelationType: relation };
    return this._httpClient.post(`${ProgramService.URL_USERS}/${userId}/associations`, body);
  }

    // public deleteRelation(userId: number, programId: number, relation: string): Observable<any> {
    // const body = { ProgramId: programId, RelationType: relation };
    // return this._httpClient.delete(`${ProgramService.URL_USERS}/${userId}/associations/delete`, body);
  public deleteRelation(userId: number, programId: number, relation: string): Observable<any> {
      return this._httpClient.delete(`${ProgramService.URL_USERS}/${userId}/associations/delete`, {
        params: {
          ProgramId: programId,
          RelationType: relation
        },
      });
    }
}
