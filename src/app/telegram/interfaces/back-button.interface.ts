export interface BackButton {
  isVisible: boolean;
  onClick(callback: Function): void;
  offClick(callback: Function): void;
  show(): BackButton;
  hide(): BackButton;
}
