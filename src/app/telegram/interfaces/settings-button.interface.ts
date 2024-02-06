export interface SettingsButton {
  isVisible: boolean;
  onClick(callback: Function): SettingsButton;
  offClick(callback: Function): SettingsButton;
  show(): SettingsButton;
  hide(): SettingsButton;
}
