import { Component } from '@angular/core';


@Component({
  selector: 'tg-card',
  standalone: true,
  imports: [],
  styleUrl: './card.component.scss',
  template: `
    <div class="card">
      <div class="inner">
        <ng-content />
      </div>
    </div>
  `,
})
export class CardComponent { }
