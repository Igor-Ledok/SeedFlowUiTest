import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LanguageService } from '../services/language.service';
import { SafeLocalStorageService } from '../services/safe-local-storage.service';

@Component({
  selector: 'app-faq',
  imports: 
  [
    CommonModule, 
    RouterModule,
    TranslocoModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    NgxChartsModule
  ],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FAQComponent {
  rows = [
    { 
      text: 'Що таке краудфандинг?', 
      title: 'Що таке краудфандинг?',
      detailText: 'Краудфандинг на Seed Flow дає людям змогу об’єднатися навколо важливих для них ідей і разом втілити ці ідеї в життя. Незалежно від того, чи шукаєте ви новітні технології, підтримуєте свого улюбленого незалежного режисера чи допомагаєте важливій справі, на Seed Flow ви можете знайти те, що вас надихне. Краудфандинг створює захоплюючі можливості як для спонсорів, так і для підприємців, але є деякі основні факти, які повинні знати всі спонсори.'
    },
    { 
      text: 'Що таке етапи продукту?', 
      title: 'Що таке етапи продукту?',
      detailText: 'Етапи продукту надають бекерам уявлення про фазу розробки технологічних та інноваційних кампаній, допомагаючи їм приймати обґрунтовані рішення перед тим, як робити внесок.'
    },
    { 
      text: 'Як отримати бонус?', 
      title: 'Як отримати бонус?',
      detailText: 'Багато кампаній пропонують пільги як подяку спонсорам в обмін на різні суми внесків. Бонусами можуть бути предмети, визнання, подяка, послуги, події або будь-що, що не порушує наші Умови використання. Перегляньте список бонусів у правій частині сторінки кампанії. Коли ви побачите на сторінці кампанії певний бонус, який вас цікавить, натисніть сам бонус . Ви виберете бонус, щоб продовжити процес перевірки внеску.'
    },
    { 
      text: "Як зв'язатися з автором кампанії?", 
      title: "Як зв'язатися з автором кампанії?",
      detailText: 'Кампанії проводяться окремими авторами кампаній, а не Seed Flow. Таким чином, вони найкраще можуть допомогти відповісти на будь-які ваші запитання про їхній проект або бонуси, які вони пропонують! Якщо у вас є будь-які запитання чи сумніви щодо певної кампанії, або бонусів, які пропонуються в кампанії, або заяв, зроблених у кампанії, ми рекомендуємо вам зв’язатися безпосередньо з автором кампанії. Якщо у вас є обліковий запис Seed Flow і ви брали участь у кампанії, ви можете опублікувати коментар на сторінці аітора кампанії або надіслати йому пряме повідомлення.'
    },
    { 
      text: 'Що станеться з моїми грошима, якщо кампанія провалиться?', 
      title: 'Що станеться з моїми грошима, якщо кампанія провалиться?',
      detailText: 'Кампанії проводяться окремими авторами кампаній, а не Seed Flow. Таким чином, вони найкраще можуть допомогти відповісти на будь-які ваші запитання про їхній проект або бонуси, які вони пропонують! Якщо у вас є будь-які запитання чи сумніви щодо певної кампанії, або бонусів, які пропонуються в кампанії, або заяв, зроблених у кампанії, ми рекомендуємо вам зв’язатися безпосередньо з автором кампанії. Якщо у вас є обліковий запис Seed Flow і ви брали участь у кампанії, ви можете опублікувати коментар на сторінці аітора кампанії або надіслати йому пряме повідомлення.'
    }
  ];

  // Устанавливаем значение выбранного ряда на 0 (первый ряд) при инициализации
  selectedRow: number | null = 0;


  selectRow(index: number) {
    // Выбираем ряд
    this.selectedRow = index;
  }

  data = [
    { name: 'Лютий', value: 10 },
    { name: 'Березень', value: 20 },
    { name: 'Квітень', value: 30 },
    { name: 'Травень', value: 40 },
    { name: 'Червень', value: 60 },
    { name: 'Липень', value: 80 },
    { name: 'Серпень', value: 80 },
    { name: 'Вересень', value: 60 },
    { name: 'Жовтень', value: 100 },
    { name: 'Листопад', value: 100 }
  ];
  

  colorScheme: any = {
    domain: ['#247a60']
  };

  customXAxisFormat(value: string): string {
    return value ? value.toUpperCase() : value; // Преобразуем строку в верхний регистр
  }  

  yAxisTicks = [10, 20, 30, 40, 50, 60, 80, 100]; // Массив для оси Y

  // Функция форматирования, просто возвращает число как строку
  customYAxisFormat(value: number): string {
    return `₴ ${value.toString()}`; // Добавляем ₴ перед числом
  }
  

    previewURLs: string[] = []; // Список загруженных фото
    activeButtonIndex: number = -1;
    activeStartupButtonIndex: number = -1;
    activeSocialButtonIndex: number = -1;
    activeHumanitarianButtonIndex: number = -1;
    activeCategoryIndex: number = -1;
      
        someString:string = 'UA';
      
        selectedLanguage = new FormControl('ua');
        
          languages = [
            {code: 'en', name: "EN"},
            {code: 'ua', name: "UA"}
          ];
      
          onLanguageChange(event: any) 
        {
          const selectedLang = event.value;
          if (selectedLang === 'ua') 
          {
            this.switchLanguage('en');
            this.someString = 'EN';
          } 
          else if (selectedLang === 'en') 
          {
            this.switchLanguage('uk');
            this.someString = 'UA';
          }
        }
      
        switchLanguage(language: string) 
        {
          this.languageService.switchLanguage(language);
        }
      
        startupButtons = [
          { label: 'Освіта', index: 0 },
          { label: 'Культура', index: 1 },
          { label: 'Медицина', index: 2 },
          { label: 'Харчування', index: 3 },
          { label: 'Транспорт', index: 4 },
          { label: 'Музика', index: 5 },
          { label: 'Література', index: 6 },
          { label: 'Кіно', index: 7 },
          { label: 'Дизайн', index: 8 },
          { label: 'Медіа', index: 9 },
          { label: 'Діти', index: 10 },
          { label: 'Технології', index: 11 }
        ];
      
        socialButtons = [
          { label: 'Музика', index: 0 },
          { label: 'Література', index: 1 },
          { label: 'Кіно', index: 2 },
          { label: 'Дизайн', index: 3 },
          { label: 'Медіа', index: 4 }
        ];
      
        humanitarianButtons = [
          { label: 'Діти', index: 0 },
          { label: 'Технології', index: 1 },
          { label: 'Наука', index: 2 },
          { label: 'Медицина', index: 3 }
        ];
      
        startupRows = [
          this.startupButtons.slice(0, 5),
          this.startupButtons.slice(5, 9),
          this.startupButtons.slice(9, 12),
        ];
      
        tabs = [
          { key: 'general', label: 'ЗАГАЛЬНЕ' },
          { key: 'details', label: 'ДЕТАЛІ' },
          { key: 'team', label: 'КОМАНДА' },
          { key: 'rewards', label: 'ВИНАГОРОДИ' },
          { key: 'requisites', label: 'РЕКВІЗИТИ' },
          { key: 'uploads', label: 'ВИКЛАСТИ' }
        ];
      
        socialRows = [this.socialButtons];
      
        activeTab: string = '';
      
        humanitarianRows = [this.humanitarianButtons]; 
      
        onCategoryButtonPress(index: number): void {
          this.activeCategoryIndex = index;
          this.activeStartupButtonIndex = -1;
          this.activeSocialButtonIndex = -1;
          this.activeHumanitarianButtonIndex = -1;
        }
        
        isButtonActive: boolean[] = [false, false, false];
      
        getDropdownHeight() 
        {
          if (this.activeButtonIndex === 1) 
            {
            return '680px';
          }
          else if(this.activeButtonIndex === 2)
          {
            return '680px';
          }
          
          return 'auto';
        }
      
        onButtonPress(category: string, index: number): void 
        {
          if (category === 'startup') 
          {
            this.activeStartupButtonIndex = index;
          } 
          else if (category === 'social') 
          {
            this.activeSocialButtonIndex = index;
          } 
          else if (category === 'humanitarian') 
          {
            this.activeHumanitarianButtonIndex = index;
          }
      }
      
      searchText = '';
      showDropdown = false;
      
      items = [
        { title: 'Врятуймо степового лисицю', description: 'Збір на порятунок лисиці', image: 'assets/images/photo1.png', progress: 45, value1: 25, value2: 36, value3: 25 },
        { title: 'Зливи не вщухають', description: 'Допомога постраждалим', image: 'assets/images/startups.png', progress: 45, value1: 25, value2: 36, value3: 25 },
        { title: 'Майстерня "Гуцульськ"', description: 'Розвиток творчих майстерень', image: 'assets/images/ventureCapital.png', progress: 45, value1: 25, value2: 36, value3: 25 }
      ];
      
      filteredItems = this.items;
      
        filterResults() {
          if (this.searchText.trim() === '') {
            this.filteredItems = this.items;
          } else {
            this.filteredItems = this.items.filter(item =>
              item.title.toLowerCase().includes(this.searchText.toLowerCase())
            );
          }
        }
      
        @HostListener('document:click', ['$event'])
        onClickOutside(event: Event) {
          const searchContainer = this.eRef.nativeElement.querySelector('.search-container');
          const searchInput = this.eRef.nativeElement.querySelector('.search-input');
          
          if (!searchContainer.contains(event.target)) 
          {
            this.showDropdown = false;
            searchInput.blur();
          }
        }
      
        @HostListener('document:keydown.escape', ['$event'])
        onEscape(event: KeyboardEvent) 
        {
          this.showDropdown = false;
        }

        partnerLogos = [
          { src: 'assets/images/workua.png', alt: 'WORK.ua' },
          { src: 'assets/images/psbusinessparks.png', alt: 'PS Business Parks' },
          { src: 'assets/images/monobank.png', alt: 'Monobank' },
          { src: 'assets/images/forbes.png', alt: 'Forbes' },
          { src: 'assets/images/linkedin.png', alt: 'LinkedIn' },
          { src: 'assets/images/sportmaster.png', alt: 'Спортмастер' },
        ];

        projects2 = [
          {
            title: 'Кафе «Коло мене»',
            image: 'assets/images/ventureCapital.png',
            amountRaised: 135420,
            goal: 500000,
            progress: this.getProgress,
          },
          {
            title: 'Врятуймо степову лисицю',
            image: 'assets/images/womenBusiness.png',
            amountRaised: 135420,
            goal: 500000,
            progress: this.getProgress,
          },
          {
            title: 'Зливи не вщухають',
            image: 'assets/images/startups.png',
            amountRaised: 135420,
            goal: 500000,
            progress: this.getProgress,
          },
          {
            title: 'Кафе «Коло мене»',
            image: 'assets/images/ventureCapital.png',
            amountRaised: 135420,
            goal: 500000,
            progress: this.getProgress,
          },
          {
            title: 'Врятуймо степову лисицю',
            image: 'assets/images/womenBusiness.png',
            amountRaised: 135420,
            goal: 500000,
            progress: this.getProgress,
          }
        ];

        projects3 = [
          {
            title: 'Кафе «Коло мене»',
            image: 'assets/images/ventureCapital.png',
            amountRaised: 135420,
            goal: 500000,
            progress: this.getProgress,
          },
          {
            title: 'Врятуймо степову лисицю',
            image: 'assets/images/womenBusiness.png',
            amountRaised: 135420,
            goal: 500000,
            progress: this.getProgress,
          }
        ];
            
        likedProjects: boolean[] = new Array(this.projects2.length).fill(false);

        toggleLike(index: number): void {
          this.likedProjects[index] = !this.likedProjects[index];
        }

        getProgress(project: any) {
          return (project.amountRaised / project.goal) * 100 + '%';
        }
      
        constructor(
          private route: ActivatedRoute,
          private eRef: ElementRef,
          private languageService: LanguageService,
          private storage: SafeLocalStorageService
         ) 
         {

         }
      
        ngOnInit() 
        {
          this.route.url.subscribe(urlSegments => {
            this.activeTab = urlSegments.length > 1 ? urlSegments[1].path : 'general';
          });
      
          const savedLanguage = this.storage.getItem('selectedLanguage') ||'ua'; 
          this.selectedLanguage.setValue(savedLanguage);
          this.onLanguageChange({ value: savedLanguage });
        }
}
