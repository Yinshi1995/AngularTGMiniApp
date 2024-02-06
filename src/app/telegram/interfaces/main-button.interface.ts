export interface MainButton {
  text: string;
  color: string;
  textColor: string;
  isVisible: boolean;
  isActive: boolean;
  isProgressVisible: boolean;
  setText(text: string): MainButton;
  onClick(callback: Function): MainButton;
  offClick(callback: Function): MainButton;
  show(): MainButton;
  hide(): MainButton;
  enable(): MainButton;
  disable(): MainButton;
  showProgress(leaveActive: boolean): MainButton;
  hideProgress(): MainButton;
  setParams(params: {
    text?: string;
    color?: string;
    textColor?: string;
    is_active?: boolean;
    is_visible?: boolean;
  }): MainButton;
}
