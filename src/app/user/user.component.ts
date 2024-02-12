import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';

import { CommonComponentsModule } from '../common-components/common-components.module';
import { SubscriptionsComponent } from '../subscriptions/subscriptions.component';
import { TelegramService } from '../telegram/telegram.service';
import { UserService } from './user.service';
import { User } from './user.interface';
import { flipLeftAnimation } from '../common-components/animations/user-subscription.animation';

@Component({
  selector: 'app-user',
  standalone: true,
  animations: [flipLeftAnimation],
  imports: [CommonModule, SubscriptionsComponent, CommonComponentsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @Input() userId: number | null = null;
  user: User | null = null;
  isLoading: boolean = true;
  error: string | null = null;

  constructor(
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly telegramService: TelegramService,
  ) {}

  get userJSON() {
    if (this.user) return this.userService.passTableJSON(this.user);

    return null;
  }

  goToSubs() {
    this.router.navigate(['/subscription'], {
      queryParams: { user_id: this.userId },
    });
  }

  ngOnInit(): void {
    if (!this.userId) {
      this.route.queryParamMap.subscribe((params) => {
        this.userId = Number(params.get('user_id'));
      });
    }
    this.loadUser();
  }

  private loadUser(): void {
    if (this.userId) {
      this.userService
        .getUserById(this.userId)
        .pipe(
          tap(() => (this.isLoading = false)),
          catchError(() => {
            this.isLoading = false;
            this.error = 'Error loading user';
            return of(null);
          }),
        )
        .subscribe(({ data }: any) => {
          if (data && data.user) {
            this.user = data.user;
            this.telegramService.hideMainButton();
            this.telegramService.expandMiniApp();
          } else {
            this.error = 'User not found';
          }
        });
    }
  }
}
