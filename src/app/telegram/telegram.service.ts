import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

import { TelegramWebApp } from './interfaces';
import { QRError } from '../qr-code/qr-error.type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TelegramService {
  private UserId: string | null = null;
  private tg: TelegramWebApp = this.document.defaultView.Telegram.WebApp;
  constructor(
    @Inject(DOCUMENT) private readonly document: any,
    private readonly router: Router,
  ) {}

  get colorQRParams() {
    return {
      textColor: this.tg.themeParams.link_color,
      backgroundColor: this.tg.backgroundColor,
    };
  }

  getUserId(): number | QRError | null {
    if (this.UserId) {
      const numericValue = Number(this.UserId);
      if (!isNaN(numericValue)) {
        if (Number.isInteger(numericValue)) {
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

  async showBackToUserButton(userId: number): Promise<void> {
    this.tg.BackButton.show();

    await this.waitForBackButtonClick(userId);
  }

  hideBackButton(): void {
    this.tg.BackButton.hide();
  }

  async waitForBackButtonClick(userId: number): Promise<void> {
    return new Promise<void>((resolve) => {
      this.tg.BackButton.onClick(() => {
        this.router.navigate(['/user'], {
          queryParams: { user_id: userId },
        });
        this.hideBackButton();
        resolve();
      });
    });
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

  expandMiniApp(): void {
    this.tg.expand();
  }

  closeMiniApp(): void {
    this.tg.close();
  }
}
