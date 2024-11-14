import { Injectable } from '@angular/core';
import {apis, environment} from '../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {PlanCreateCommand} from '../utils/plan-create-command';
import {PlanCreateOutput} from '../utils/plan-create-output';
import {Observable} from 'rxjs';
import {PlanSearchOutput} from "../utils/plan-search-output";

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private static URL: string = `${environment.API_URL}/${apis.USERS_URL}`;

  constructor(private _htppClient: HttpClient) { }

  public create(planCreateCommand: PlanCreateCommand, userId: number): Observable<PlanCreateOutput> {
    return this._htppClient.post<PlanCreateOutput>(`${PlanService.URL}/${userId}/plans`, planCreateCommand, {withCredentials: true});
  }

/*  public getPlansPublic(): Observable<any> {
    return this._htppClient.get<any>(`${PlanService.URL}/plans/privacy/public`, {withCredentials: true});
  }

  public getPlansPublicFilterByCategory(category: string): Observable<any> {
    return this._htppClient.get<any>(`${PlanService.URL}/plans/privacy/public?category=${category}`, {withCredentials: true});
  }

  public getPlansPublicFilterByNameContaining(name: string): Observable<any> {
    return this._htppClient.get<any>(`${PlanService.URL}/plans/privacy/public?name=${name}`, {withCredentials: true});
  }

  public getPlansPublicFilterByCategoryByNameContaining(name: string): Observable<any> {
    return this._htppClient.get<any>(`${PlanService.URL}/plans/privacy/public?name=${name}?`, {withCredentials: true});
  }*/

  getPlansPublicFilter(name?: string, category?: string) {
    let params = new HttpParams();
    if (name) {
      params = params.set('name', name);
    }
    if (category) {
      params = params.set('category', category);
    }

    return this._htppClient.get<any>(
      `${PlanService.URL}/plans/privacy/public/filter`,
      {params: params, withCredentials: true
    });
  }
}
