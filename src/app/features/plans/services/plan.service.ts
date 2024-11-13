import { Injectable } from '@angular/core';
import {apis, environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {PlanCreateCommand} from '../utils/plan-create-command';
import {PlanCreateOutput} from '../utils/plan-create-output';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private static URL: string = `${environment.API_URL}/${apis.USERS_URL}`;

  constructor(private _htppClient: HttpClient) { }

  public create(planCreateCommand: PlanCreateCommand, userId: number): Observable<PlanCreateOutput> {
    return this._htppClient.post<PlanCreateOutput>(`${PlanService.URL}/${userId}/plans`, planCreateCommand, {withCredentials: true});
  }
}
