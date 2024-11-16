import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {apis, environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private static URL: string = `${environment.API_URL}/${apis.FOOD_URL}`;

  constructor(private _httpClient: HttpClient) { }

  public getAllStartingWith(text: string): Observable<any> {
    const params = new HttpParams().set('text', text);
    return this._httpClient.get<any>(FoodService.URL, {
      withCredentials: true,
      params: params,
    });
  }
}
