import { inject, Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);

  getTranslation(lang: string) {
    return this.http.get<Translation>(
      `${environment.baseUrl}/assets/i18n/${lang}.json`
    );
  }
}









// import { inject, Injectable } from '@angular/core';
// import { Translation, TranslocoLoader } from '@jsverse/transloco';
// import { HttpClient } from '@angular/common/http';
// import { PLATFORM_ID, Inject } from '@angular/core';
// import { environment } from '../environment';
// import { isPlatformBrowser } from '@angular/common';

// @Injectable({ providedIn: 'root' })
// export class TranslocoHttpLoader implements TranslocoLoader {
//   private http = inject(HttpClient);

//   constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

//   getTranslation(lang: string) {
//     // Проверяем, выполняется ли код в браузере
//     if (isPlatformBrowser(this.platformId)) {
//       // Логика для браузера
//       const langFromLocalStorage = localStorage.getItem('lang');
//       if (langFromLocalStorage) {
//         return this.http.get<Translation>(`${environment.baseUrl}/assets/i18n/${langFromLocalStorage}.json`);
//       } else {
//         // Если язык не сохранен, загружаем дефолтный язык
//         return this.http.get<Translation>(`${environment.baseUrl}/assets/i18n/${lang}.json`);
//       }
//     } else {
//       // Логика для сервера
//       return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
//     }
//   }

//   // Метод для сохранения выбранного языка в localStorage (для браузера)
//   setLanguage(lang: string) {
//     if (isPlatformBrowser(this.platformId)) {
//       localStorage.setItem('lang', lang);
//     }
//   }
// }