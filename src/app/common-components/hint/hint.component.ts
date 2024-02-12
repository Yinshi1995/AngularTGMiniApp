import { Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'tg-hint',
  standalone: true,
  imports: [],
  styleUrl: './hint.component.scss',
  template: `
    @if (visible) {
      <div class="hint" [class.top]="atTop">
        <span class="hint-text">{{ hint }}</span>
      </div>
    }
  `,
})
export class HintComponent {
  @Input() hint: string = '';
  @Input() visible: boolean = false;
  atTop: boolean = false;

  constructor(private elementRef: ElementRef) {}

  ngOnChanges() {
    this.atTop = this.isAtTop();
  }

  private isAtTop(): boolean {
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    return rect.top < window.innerHeight / 2;
  }
}
