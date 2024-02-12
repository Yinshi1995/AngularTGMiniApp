import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'lodash';

import GET_USER from './graphql/get-user';

import { User } from './user.interface';

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
    let translated_user: any = {
      'Имя пользователя': `@${user.username}`,
      'Номер телефона': user.phone_number,
      Вес: `${user.weight} кг`,
      Рост: `${user.height} см`,
    };

    if (user.birth_date) {
      let date = new Date(user.birth_date);
      let russianDate = date.toLocaleDateString('ru-RU');

      translated_user['Дата рождения'] = russianDate;
    }

    return map(translated_user, (value, key) => ({ label: key, value }));
  }
}
