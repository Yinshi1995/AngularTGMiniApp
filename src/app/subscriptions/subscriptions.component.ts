import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, tap } from 'rxjs';

import { CommonComponentsModule } from '../common-components/common-components.module';
import { SubscriptionComponent } from '../subscription/subscription.component';
import { dropdownAnimation } from '../common-components/animations/dropdown.animations';
import { SubscriptionsService } from './subscriptions.service';
import { TelegramService } from '../telegram/telegram.service';
import { flipRightAnimation } from '../common-components/animations/user-subscription.animation';

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [CommonComponentsModule, SubscriptionComponent],
  templateUrl: './subscriptions.component.html',
  animations: [flipRightAnimation, dropdownAnimation],
  styleUrl: './subscriptions.component.scss',
})
export class SubscriptionsComponent implements OnInit {
  userId: number | null = null;
  userSubscriptions: any = null;
  isLoading: boolean = true;
  error: string | null = null;
  activeHidden = false;

  constructor(
    private readonly telegramService: TelegramService,
    private readonly subscriptionsService: SubscriptionsService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      let userId = Number(params.get('user_id'));
      this.loadSubscription(userId);
      this.telegramService.showBackToUserButton(userId);
    });
  }

  loadSubscription(userId: number) {
    this.subscriptionsService
      .getSubscriptionById(userId)
      .pipe(
        tap(() => {
          this.isLoading = false;
          this.error = 'Error loading subscriptions';
          return of(null);
        }),
      )
      .subscribe(({ data }: any) => {
        if (data) {
          this.userSubscriptions = data.subscriptionByUserId;
        } else {
          this.error = 'Subscriptions not found';
        }
      });
  }

  showInactive() {
    this.activeHidden = !this.activeHidden;
  }
}
