import { Component } from '@angular/core';

@Component({
  selector: 'tg-button',
  standalone: true,
  imports: [],
  styleUrl: './button.component.scss',
  template: `
    <div class="button">
      <ng-content />
    </div>
  `,
})
export class ButtonComponent {}
