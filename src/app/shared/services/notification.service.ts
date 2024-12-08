import { Injectable } from '@angular/core';
import {apis, environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private static URL_USERS: string = `${environment.API_URL}/${apis.USERS_URL}`;

  constructor(private _httpClient: HttpClient) { }

  public getNotificationByUserId(userId: number): Observable<any> {
    return this._httpClient.get<any>(`${NotificationService.URL_USERS}/${userId}/notifications`);
  }

  public getNotificationNotReadByUserId(userId: number): Observable<any> {
    return this._httpClient.get<any>(`${NotificationService.URL_USERS}/${userId}/notifications/read/false`);
  }

  public getNotificationByNotificationId(userId:number, notificationId: number): Observable<any> {
    return this._httpClient.get(`${NotificationService.URL_USERS}/${userId}/notifications/${notificationId}`);
  }
}
