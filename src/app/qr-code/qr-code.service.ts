import { Injectable } from '@angular/core';
import { Options } from 'ngx-qrcode-styling';

import { TelegramService } from '../telegram/telegram.service';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {
  public config: Options = {
    template: 'mosaic',
    width: 300,
    height: 300,
    // image:
    //   'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
    margin: 5,
    dotsOptions: {
      color: this.telegramService.colorQRParams.textColor,
      type: 'rounded',
    },
    backgroundOptions: {
      color: this.telegramService.colorQRParams.backgroundColor,
    },
    imageOptions: {
      crossOrigin: 'anonymous',
      margin: 0,
    },
  };

  constructor(
    private readonly telegramService: TelegramService,
  ) { }

  getConfig() { }

  parseInteger(query_id: string): string | null {
    let parsed_int = parseInt(query_id, 10);
    return isNaN(parsed_int) ? null : String(parsed_int);
  }
}
