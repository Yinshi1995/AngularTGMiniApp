import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const dropdownAnimation = trigger('dropdownAnimation', [
  state(
    'void',
    style({
      transform: 'translateY(-100%)',
      opacity: 0,
      zIndex: -1,
    }),
  ),
  state(
    '*',
    style({
      transform: 'translateY(0)',
      opacity: 1,
      zIndex: 1,
    }),
  ),
  transition(':leave', animate('300ms ease-in')),
  transition(':enter', animate('300ms ease-out')),
]);
