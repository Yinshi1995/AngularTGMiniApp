import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import GET_USER from './graphql/get-user';
import { Subscription } from '../subscription/subscriptin.interface';
import { User } from './user.interface';
import { map, omit } from 'lodash';

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

  passTableJSON(user: User) {
    let omited_user = omit(user, ['__typename', 'Subscriptions']);

    let translated_user: any = {
      'Имя пользователя': `@${omited_user.username}`,
      'Номер телефона': user.phone_number,
      Вес: `${omited_user.weight} кг`,
      Рост: `${omited_user.height} см`,
    };

    if (user.birth_date) {
      let date = new Date(user.birth_date);
      let russianDate = date.toLocaleDateString('ru-RU');

      translated_user['Дата рождения'] = russianDate;
    }

    return map(translated_user, (value, key) => ({ label: key, value }));
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
