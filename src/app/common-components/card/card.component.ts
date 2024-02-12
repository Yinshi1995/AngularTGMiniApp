import { Component, Input } from '@angular/core';
import { ContainerComponent } from '../container/container.component';

@Component({
  selector: 'tg-card',
  standalone: true,
  imports: [ContainerComponent],
  styleUrl: './card.component.scss',
  template: `
    <tg-container>
      <div class="card" [class]="{ inactive: !active }">
        <div class="inner">
          <ng-content />
        </div>
      </div>
    </tg-container>
  `,
})
export class CardComponent {
  @Input() active: boolean = true;
}
