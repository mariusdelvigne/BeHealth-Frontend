import { Component } from '@angular/core';
import {SubscriptionsComponent} from '../subscriptions/subscriptions.component';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-relations',
  standalone: true,
  imports: [
    SubscriptionsComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './relations.component.html',
  styleUrl: './relations.component.css'
})
export class RelationsComponent {

  relation: string = 'subscription';

  setRelation(relation: string) {
    this.relation = relation;
  }
}
