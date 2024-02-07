import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from '../subscription/subscriptin.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly apollo: Apollo) {}

  getUserById(id: number) {
    let variables = { id };
    return this.apollo.watchQuery({
      query: gql`
        query getUser($id: Int!) {
          user(telegram_id: $id) {
            username
            full_name
            phone_number
            weight
            height
            birth_date
            Subscriptions {
              status
              start_date
              end_date
            }
          }
        }
      `,
      variables,
    }).valueChanges;
  }

  separateSubscriptions(subscriptions: Subscription[]) {
    let active: Subscription | null = null;
    const inactiveSubscriptions: Subscription[] = [];

    for (let subscription of subscriptions) {
      if (subscription.status == 'active') {
        active = subscription;
      } else {
        inactiveSubscriptions.push(subscription);
      }
    }

    return {
      active,
      inactiveSubscriptions,
    };
  }
}
