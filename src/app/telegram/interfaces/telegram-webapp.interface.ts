import {
  WebAppInitData,
  ThemeParams,
  BackButton,
  MainButton,
  SettingsButton,
  HapticFeedback,
  CloudStorage,
  PopupParams,
  ScanQrPopupParams,
} from './index';

export interface TelegramWebApp {
  initData: string;
  initDataUnsafe: WebAppInitData;
  version: string;
  platform: string;
  colorScheme: string;
  themeParams: ThemeParams;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  backgroundColor: string;
  isClosingConfirmationEnabled: boolean;
  BackButton: BackButton;
  MainButton: MainButton;
  SettingsButton: SettingsButton;
  HapticFeedback: HapticFeedback;
  CloudStorage: CloudStorage;

  isVersionAtLeast(version: string): boolean;
  setHeaderColor(color: string): void;
  setBackgroundColor(color: string): void;
  enableClosingConfirmation(): void;
  disableClosingConfirmation(): void;
  onEvent(eventType: string, eventHandler: Function): void;
  offEvent(eventType: string, eventHandler: Function): void;
  sendData(data: any): void;
  switchInlineQuery(query: string, choose_chat_types?: string[]): void;
  openLink(url: string, options?: { try_instant_view?: boolean }): void;
  openTelegramLink(url: string): void;
  openInvoice(url: string, callback?: Function): void;
  showPopup(params: PopupParams, callback?: Function): void;
  showAlert(message: string, callback?: Function): void;
  showConfirm(message: string, callback?: Function): void;
  showScanQrPopup(params: ScanQrPopupParams, callback?: Function): void;
  closeScanQrPopup(): void;
  readTextFromClipboard(callback?: Function): void;
  requestWriteAccess(callback?: Function): void;
  requestContact(callback?: Function): void;
  ready(): void;
  expand(): void;
  close(): void;
}
