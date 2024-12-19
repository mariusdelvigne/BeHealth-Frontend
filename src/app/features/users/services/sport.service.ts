import { Injectable } from '@angular/core';
import {apis, environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SportService {
  private static URL: string = `${environment.API_URL}/${apis.SPORT_URL}`;

  constructor(private _httpClient: HttpClient) { }

  public getAllStartingWith(text: string): Observable<any> {
    const params = new HttpParams().set('text', text);
    return this._httpClient.get<any>(SportService.URL, {params: params});
  }
}
