import { Component, OnInit } from '@angular/core';
import { NgxQrcodeStylingModule, Options } from 'ngx-qrcode-styling';

import { QueryParamService } from '../services/query-params.service';
import { QrCodeService } from './qr-code.service';

@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [NgxQrcodeStylingModule],
  styleUrl: './qr-code.component.scss',
  template: `
    @if (userId) {
      <div class="container qrcode-container">
          <ngx-qrcode-styling [data]="userId" [config]="config" />
      </div>
    } @else {
      <div class="card">
        <h1>Ошибка</h1>
        <p>Для получения QR кода, вам следует приобрести абонимент.</p>
      </div>
    }
  `,
})
export class QrCodeComponent implements OnInit {
  userId: string | null = null; 
  
  get config(): Options {
    return this.qrcodeService.config;
  }

  constructor(
    private readonly queryParamsService: QueryParamService,
    private readonly qrcodeService: QrCodeService,
  ) { }

  ngOnInit(): void {
    let queryId = this.queryParamsService.getQueryParam('user_id');
    if (!!queryId) 
      this.userId = this.qrcodeService.parseInteger(queryId);
  }

}
