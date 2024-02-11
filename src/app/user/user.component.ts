import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

import { UserService } from './user.service';
import { User } from './user.interface';
import { SubscriptionComponent } from '../subscription/subscription.component';
import { CommonComponentsModule } from '../common-components/common-components.module';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, SubscriptionComponent, CommonComponentsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @Input() userId: number | null = null;
  user: User | null = null;
  flipped: boolean = false;
  isLoading: boolean = true;
  error: string | null = null;

  constructor(
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
  ) {}

  get userJSON() {
    if (this.user) return this.userService.passTableJSON(this.user);

    return null;
  }

  get userSubscriptions() {
    if (!!this.user && !!this.user.Subscriptions)
      return this.userService.separateSubscriptions(this.user.Subscriptions);

    return null;
  }

  flip() {
    this.flipped = !this.flipped;
  }

  ngOnInit(): void {
    if (!this.userId) {
      this.route.queryParamMap.subscribe((params) => {
        this.userId = Number(params.get('user_id'));
        this.loadUser();
      });
    } else {
      this.loadUser();
    }
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
          } else {
            this.error = 'User not found';
          }
        });
    }
  }
}
