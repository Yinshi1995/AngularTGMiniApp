import { PopupButton } from './popup-button.interface';

export interface PopupParams {
  title?: string;
  message: string;
  buttons?: PopupButton[];
}
