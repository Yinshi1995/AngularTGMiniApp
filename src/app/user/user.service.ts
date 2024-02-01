import { Injectable } from '@angular/core';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  async getUserById(userId: number): Promise<User | void> {}

  async getBoilerplateUser(userId: number): Promise<User> {
    return {
      telegram_id: userId,
      phone_number: '+12345678911',
      full_name: 'John Doe',
      username: 'johndoe',
      weight: 70,
      height: 175,
      birth_date: new Date('1990-01-01'),
      is_admin: false,
    };
  }
}
