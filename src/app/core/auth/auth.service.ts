import { Injectable } from '@angular/core';
import {apis, environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static URL: string = `${environment.API_URL}/${apis.AUTH_URL}`;

  constructor(private _httpClient: HttpClient) { }

}
