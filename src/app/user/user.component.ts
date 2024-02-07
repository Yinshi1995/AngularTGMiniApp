import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

import { UserService } from './user.service';
import { User } from './user.interface';
import { SubscriptionComponent } from '../subscription/subscription.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, SubscriptionComponent],
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
  ) {}

  get userSubscriptions() {
    if (!!this.user && !!this.user.Subscriptions)
      return this.userService.separateSubscriptions(this.user.Subscriptions);

    return null;
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
            console.log(data);
            this.user = data.user;
          } else {
            this.error = 'User not found';
          }
        });
    }
  }
}
