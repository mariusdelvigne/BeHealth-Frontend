import { Component } from '@angular/core';
import {SubscriptionsComponent} from '../subscriptions-and-favorites/subscriptions.component';

@Component({
  selector: 'app-relations',
  standalone: true,
  imports: [
    SubscriptionsComponent,
  ],
  templateUrl: './relations.component.html',
  styleUrl: './relations.component.scss'
})
export class RelationsComponent {

  relation: string = 'subscription';

  setRelation(relation: string) {
    this.relation = relation;
  }
}
