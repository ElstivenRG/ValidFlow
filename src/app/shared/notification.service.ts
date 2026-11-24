import { Injectable } from '@angular/core';
import { Toasty } from '@triniwiz/nativescript-toasty';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  show(text: string): void { new Toasty({ text }).show(); }
}
