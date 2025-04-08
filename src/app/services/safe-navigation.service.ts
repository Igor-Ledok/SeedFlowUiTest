// safe-navigation.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SafeNavigationService {
  isBrowser = typeof window !== 'undefined';

  redirect(url: string): void {
    if (this.isBrowser) {
      window.location.href = url;
    }
  }
}
