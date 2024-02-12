import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import GET_SUBSCRIPTION from './graphql/get-subscriptions';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService {
  constructor(private readonly apollo: Apollo) {}

  getSubscriptionById(id: number) {
    let variables = { id };
    return this.apollo.watchQuery({
      query: GET_SUBSCRIPTION,
      variables,
    }).valueChanges;
  }
}
