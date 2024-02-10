import { Component } from '@angular/core';

@Component({
  selector: 'tg-container',
  standalone: true,
  imports: [],
  styleUrl: './container.component.scss',
  template: `
    <div class="container">
      <ng-content />
    </div>
  `,
})
export class ContainerComponent {}
