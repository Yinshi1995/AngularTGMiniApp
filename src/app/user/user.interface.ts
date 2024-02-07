import { Subscription } from '../subscription/subscriptin.interface';

export interface User {
  telegram_id: number;
  phone_number: string;
  full_name?: string;
  username: string;
  weight?: number;
  height?: number;
  birth_date?: Date;
  is_admin?: boolean;
  Subscriptions: Subscription[] | null;
}
