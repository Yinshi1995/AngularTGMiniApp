import { Component, OnInit } from '@angular/core';

import { TelegramService } from '../telegram/telegram.service';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-qr-scanner',
  standalone: true,
  imports: [UserComponent],
  styleUrl: './qr-scanner.component.scss',
  template: `
    <button (click)="showQRScanner()">Click</button>
    @if (!!scannedQR) {
      <app-user [userId]="scannedQR"></app-user>
    }
  `,
})
export class QrScannerComponent implements OnInit {
  get scannedQR(): number | null {
    const qr = this.telegramService.qRcode;
    return qr && !isNaN(Number(qr)) ? Number(qr) : null;
  }

  constructor(
    private readonly telegramService: TelegramService,
  ) { }
    
  ngOnInit(): void {
    // this.showQRScanner();
  }

  showQRScanner() {
    this.telegramService.showQRScanner(
      'Scan the QR Code',
    );
  }
}
