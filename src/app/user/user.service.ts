import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import GET_USER from './graphql/get-user';
import { Subscription } from '../subscription/subscriptin.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly apollo: Apollo) {}

  getUserById(id: number) {
    let variables = { id };
    return this.apollo.watchQuery({
      query: GET_USER,
      variables,
    }).valueChanges;
  }

  separateSubscriptions(subscriptions: Subscription[]) {
    let active: Subscription | null = null;
    const inactive: Subscription[] = [];

    for (let subscription of subscriptions) {
      if (subscription.status == 'active') {
        active = subscription;
      } else {
        inactive.push(subscription);
      }
    }

    return {
      active,
      inactive,
    };
  }
}
