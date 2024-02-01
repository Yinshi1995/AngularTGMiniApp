import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { TelegramWebApp } from './telegram.interface';

@Injectable({
  providedIn: 'root',
})
export class TelegramService {
  private QRcode: string | null = null
  private tg: TelegramWebApp = this.document.defaultView.Telegram.WebApp;
  constructor(@Inject(DOCUMENT) private readonly document: any) {  }

  get colorQRParams() {
    return {
      textColor: this.tg.themeParams.text_color,
      backgroundColor: this.tg.backgroundColor,
    };
  }

  get qRcode() {
    return this.QRcode;
  }

  async showQRScanner(
    message?: string,
  ): Promise<void> {
    const params = {
      text: message || '',
    };

    try {
      this.QRcode = await new Promise<string>((resolve, reject) => {
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
    this.tg.isExpanded = true;
  }

  private closeMiniApp(): void {
    this.tg.close();
  }
}
