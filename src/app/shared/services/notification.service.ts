import {Injectable} from '@angular/core';
import {apis, environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NotificationCreateCommand} from '../../features/notifications/utils/notification-create-command';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private static URL_USERS: string = `${environment.API_URL}/${apis.USERS_URL}`;
  private static URL_NOTIFICATIONS: string = `${environment.API_URL}/${apis.NOTIFICATIONS_URL}`;

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

  public getAllNotifications(): Observable<any> {
    return this._httpClient.get<any>(`${NotificationService.URL_NOTIFICATIONS}`);
  }

  public readNotification(userId: number, notificationId: number, isRead: boolean): Observable<any> {
    return this._httpClient.put(`${NotificationService.URL_USERS}/${userId}/notifications/${notificationId}/read/${isRead}`, {});
  }

  public deleteNotification(notificationId: number): Observable<any> {
    return this._httpClient.delete(`${NotificationService.URL_NOTIFICATIONS}/${notificationId}`);
  }

  public createNotification(notification: NotificationCreateCommand): Observable<any> {
    return this._httpClient.post(`${NotificationService.URL_NOTIFICATIONS}`, notification);
  }
}
