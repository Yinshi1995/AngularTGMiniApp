import { Component, Input } from '@angular/core';
import { Subscription } from './subscriptin.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './subscription.component.scss',
  template: ` @if (subscription) {
    <div class="subscription">
      <p><strong>Status:</strong> {{ subscription.status }}</p>
      <p>
        <strong>Start Date:</strong>
        {{ subscription.start_date | date: 'yyyy-MM-dd' }}
      </p>
      <p>
        <strong>End Date:</strong>
        {{ subscription.start_date | date: 'yyyy-MM-dd' }}
      </p>
    </div>
  }`,
})
export class SubscriptionComponent {
  @Input() subscription: Subscription | null = null;
}
