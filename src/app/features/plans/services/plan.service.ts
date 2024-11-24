import { Injectable } from '@angular/core';
import {apis, environment} from '../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {PlanCreateCommand} from '../utils/plan-create-command';
import {PlanCreateOutput} from '../utils/plan-create-output';
import {Observable} from 'rxjs';
import {PlanUpdateCommand} from '../utils/plan-update-command';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private static URL_USERS: string = `${environment.API_URL}/${apis.USERS_URL}`;
  private static URL_PLANS: string = `${environment.API_URL}/${apis.PLANS_URL}`;

  constructor(private _htppClient: HttpClient) { }

  public create(planCreateCommand: PlanCreateCommand, userId: number): Observable<PlanCreateOutput> {
    return this._htppClient.post<PlanCreateOutput>(`${PlanService.URL_USERS}/${userId}/plans`, planCreateCommand, {withCredentials: true});
  }

  public getPlansFiltered(privacy?: string, name?: string, category?: string): Observable<any> {
    let params = new HttpParams();

    if (privacy)
      params = params.set('privacy', privacy);
    if (name)
      params = params.set('name', name);
    if (category)
      params = params.set('category', category);

    return this._htppClient.get<any>(
      `${PlanService.URL_PLANS}`,
      {params: params, withCredentials: true
    });
  }

  public getPlansByUserId(userId: number): Observable<any> {
    return this._htppClient.get<any>(`${PlanService.URL_PLANS}/users/${userId}`);
  }

  public getPlansById(planId: number): Observable<any> {
    return this._htppClient.get<any>(`${PlanService.URL_PLANS}/${planId}`);
  }

  public deletePlan(userId: number, planId: number) : Observable<any> {
    return this._htppClient.delete<any>(`${PlanService.URL_USERS}/${userId}/plans/${planId}`, {withCredentials: true});
  }

  public updatePlan(userId: number, planId: number, command: PlanUpdateCommand) : Observable<any> {
    return this._htppClient.put<any>(`${PlanService.URL_USERS}/${userId}/plans/${planId}`, command, {withCredentials: true});
  }
}
