import { trigger, transition, style, animate } from '@angular/animations';

export const flipLeftAnimation = trigger('flipLeft', [
  transition(':enter', [
    style({ transform: 'rotateY(180deg)', opacity: 0 }),
    animate('0.5s ease-in-out', style({ transform: 'rotateY(0)', opacity: 1 })),
  ]),
  transition(':leave', [
    style({ transform: 'rotateY(0)', opacity: 1 }),
    animate('0.5s ease-in-out', style({ transform: 'rotateY(180deg)', opacity: 0 })),
  ]),
]);

export const flipRightAnimation = trigger('flipRight', [
  transition(':enter', [
    style({ transform: 'rotateY(-180deg)', opacity: 0 }),
    animate('0.5s ease-in-out', style({ transform: 'rotateY(0)', opacity: 1 })),
  ]),
  transition(':leave', [
    style({ transform: 'rotateY(0)', opacity: 1 }),
    animate('0.5s ease-in-out', style({ transform: 'rotateY(-180deg)', opacity: 0 })),
  ]),
]);
