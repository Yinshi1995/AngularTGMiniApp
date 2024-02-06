import { Component, OnInit } from '@angular/core';

import { TelegramService } from '../telegram/telegram.service';
import { UserComponent } from '../user/user.component';
import { QRError } from '../qr-code/qr-error.type';

@Component({
  selector: 'app-qr-scanner',
  standalone: true,
  imports: [UserComponent],
  styleUrl: './qr-scanner.component.scss',
  templateUrl: './qr-scanner.component.html',
})
export class QrScannerComponent implements OnInit {
  get scannedQR(): number | QRError | null {
    return this.telegramService.userId;
  }

  constructor(private readonly telegramService: TelegramService) {}

  async ngOnInit() {
    await this.telegramService.showScannerButton();
  }
}
