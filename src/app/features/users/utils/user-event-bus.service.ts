import {Injectable} from '@angular/core';
import {filter, Observable, Subject} from 'rxjs';
import {UserBanCustomEvent} from './user-ban-custom-event';

@Injectable({
  providedIn: 'root'
})
export class UserEventBusService {
  private _bus: Subject<UserBanCustomEvent> = new Subject();

  constructor() {
  }

  publish(event: UserBanCustomEvent) {
    this._bus.next(event);
  }

  listen(name: string): Observable<UserBanCustomEvent> {
    return this._bus.asObservable().pipe(
      filter(e => e.name === name),
    );
  }
}
