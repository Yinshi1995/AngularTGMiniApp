import { Component, Input } from '@angular/core';
import { Subscription } from './subscriptin.interface';
import { CommonModule } from '@angular/common';
import { map } from 'lodash';
import { CommonComponentsModule } from '../common-components/common-components.module';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule, CommonComponentsModule],
  styleUrl: './subscription.component.scss',
  template: ` @if (tableSubscriptionJSON) {
    <tg-table [json]="this.tableSubscriptionJSON" />
  }`,
})
export class SubscriptionComponent {
  @Input() subscription: Subscription | null = null;

  get tableSubscriptionJSON() {
    if (this.subscription) {
      let translatedSubscription: any = new Object();
      translatedSubscription['Дата начала абонимента'] =
        'Дата окончания обонимента';
      translatedSubscription[this.ruDate(this.subscription.start_date)] =
        this.ruDate(this.subscription.end_date);

      return map(translatedSubscription, (value, key) => ({
        label: key,
        value,
      }));
    }

    return null;
  }

  private ruDate(date_string: string) {
    let date = new Date(date_string);
    return date.toLocaleDateString('ru-RU');
  }
}
