import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

import { TelegramWebApp } from './interfaces';
import { QRError } from '../qr-code/qr-error.type';

@Injectable({
  providedIn: 'root',
})
export class TelegramService {
  private UserId: string | null = null;
  private tg: TelegramWebApp = this.document.defaultView.Telegram.WebApp;
  constructor(@Inject(DOCUMENT) private readonly document: any) {}

  get colorQRParams() {
    return {
      textColor: this.tg.themeParams.link_color,
      backgroundColor: this.tg.backgroundColor,
    };
  }

  get userId(): number | QRError | null {
    if (this.UserId) {
      const numericValue = Number(this.UserId);
      if (!isNaN(numericValue)) {
        if (Number.isInteger(numericValue)) {
          this.hideMainButton();
          this.expandMiniApp();
          return numericValue;
        } else {
          return 'incorrectInteger';
        }
      } else {
        return 'stringNotNumber';
      }
    } else {
      return null;
    }
  }

  async showScannerButton(): Promise<void> {
    this.tg.MainButton.setText('Открыть сканнер.');
    this.tg.MainButton.show();

    await this.waitForQRScanner();
  }

  hideMainButton(): void {
    this.tg.MainButton.hide();
  }

  async waitForQRScanner(): Promise<void> {
    return new Promise(async (resolve) => {
      this.tg.MainButton.onClick(async () => {
        await this.showQRScanner('Отсканируйте код пользователя');
        resolve();
      });
    });
  }

  async showQRScanner(message?: string): Promise<void> {
    const params = {
      text: message || '',
    };

    try {
      this.UserId = await new Promise<string>((resolve, reject) => {
        this.tg.showScanQrPopup(params, (qrCodeData: string) => {
          resolve(qrCodeData);
        });
      });

      this.closeQRScannerPopup();
    } catch (error) {
      console.error(error);
    }
  }

  private closeQRScannerPopup(): void {
    this.tg.closeScanQrPopup();
  }

  private expandMiniApp(): void {
    this.tg.expand();
  }

  private closeMiniApp(): void {
    this.tg.close();
  }
}
