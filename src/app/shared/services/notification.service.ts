import {Injectable} from '@angular/core';
import {apis, environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private static URL_USERS: string = `${environment.API_URL}/${apis.USERS_URL}`;

  constructor(private _httpClient: HttpClient) {
  }

  public getNotificationByUserId(userId: number): Observable<any> {
    return this._httpClient.get<any>(`${NotificationService.URL_USERS}/${userId}/notifications`);
  }

  public getNotificationReadByUserId(userId: number, isRead: boolean): Observable<any> {
    return this._httpClient.get<any>(`${NotificationService.URL_USERS}/${userId}/notifications/read/${isRead}`);
  }

  public getNotificationByNotificationId(userId: number, notificationId: number): Observable<any> {
    return this._httpClient.get(`${NotificationService.URL_USERS}/${userId}/notifications/${notificationId}`);
  }

  public readNotification(userId: number, notificationId: number, isRead: boolean): Observable<any> {
    return this._httpClient.put(`${NotificationService.URL_USERS}/${userId}/notifications/${notificationId}/read/${isRead}`, {withCredentials: true});
  }

  public getFilteredNotifications(userId: number, isRead: boolean | null, category: string | null): Observable<any> {
    if (isRead == null && category == null) {
      return this._httpClient.get<any>(`${NotificationService.URL_USERS}/${userId}/notifications`);
    } else if (isRead == null) {
      return this._httpClient.get<any>(`${NotificationService.URL_USERS}/${userId}/notifications/category/${category}`);
    } else if (category == null) {
      return this._httpClient.get<any>(`${NotificationService.URL_USERS}/${userId}/notifications/read/${isRead}`);
    } else {
      return this._httpClient.get<any>(`${NotificationService.URL_USERS}/${userId}/notifications/category/${category}/read/${isRead}`);
    }
  }
}
