import { Component, OnInit } from '@angular/core';

import { TelegramService } from '../telegram/telegram.service';
import { UserComponent } from '../user/user.component';
import { QRError } from '../qr-code/qr-error.type';
import { CommonComponentsModule } from '../common-components/common-components.module';

@Component({
  selector: 'app-qr-scanner',
  standalone: true,
  imports: [UserComponent, CommonComponentsModule],
  styleUrl: './qr-scanner.component.scss',
  templateUrl: './qr-scanner.component.html',
})
export class QrScannerComponent implements OnInit {
  get scannedQR(): number | QRError | null {
    return this.telegramService.getUserId();
  }

  constructor(private readonly telegramService: TelegramService) {}

  async ngOnInit() {
    await this.telegramService.showScannerButton();
  }
}
