import { Routes } from '@angular/router';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
import { UserComponent } from './user/user.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';

export const routes: Routes = [
  { path: 'qrcode', component: QrCodeComponent },
  { path: 'scanner', component: QrScannerComponent },
  { 
    path: 'user', 
    component: UserComponent,
    data: { animation: 'userPage' }
  },
  { 
    path: 'subscription', 
    component: SubscriptionsComponent,
    data: { animation: 'subscriptionsPage' }
  },
];
