import { Component, Input, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user.interface';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @Input() userId: number | null = null;
  user: User | null = null;

  constructor(private readonly userService: UserService) {}

  async ngOnInit(): Promise<void> {
    if (this.userId)
      this.user = await this.userService.getBoilerplateUser(this.userId);
  }
}
