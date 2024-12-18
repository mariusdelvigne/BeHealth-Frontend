import {Injectable} from '@angular/core';
import {apis, environment} from '../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CreateGlobalMessageCommand} from '../../../features/admin-features/utils/create-global-message-command';

@Injectable({
  providedIn: 'root'
})
export class GlobalMessagesService {
  private static URL_GLOBAL_MESSAGES: string = `${environment.API_URL}/${apis.GLOBAL_MESSAGES_URL}`;

  constructor(private _httpClient: HttpClient) {}

  public getAllGlobalMessages(pageNumber?: number, pageSize?: number): Observable<any> {
    let params = new HttpParams();

    params = params.set('pageNumber', (pageNumber ?? 0).toString());
    params = params.set('pageSize', (pageSize ?? 10).toString());

    return this._httpClient.get<any>(`${GlobalMessagesService.URL_GLOBAL_MESSAGES}`, {params: params});
  }

  public deleteGlobalMessages(id: number): Observable<any> {
    return this._httpClient.delete<any>(`${GlobalMessagesService.URL_GLOBAL_MESSAGES}/${id}`);
  }

  public createGlobalMessage(command: CreateGlobalMessageCommand): Observable<any> {
    return this._httpClient.post<any>(`${GlobalMessagesService.URL_GLOBAL_MESSAGES}`, command);
  }
}
