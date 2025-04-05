import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, HostListener } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-without-comment-donation-access',
  imports: [
    MatSlideToggleModule, 
    MatCheckboxModule, 
    MatSelectModule, 
    FormsModule, 
    MatFormFieldModule,
    NgFor, 
    CommonModule, 
    ReactiveFormsModule, 
    RouterModule,
    TranslocoModule
  ],
  templateUrl: './without-comment-donation-access.component.html',
  styleUrl: './without-comment-donation-access.component.scss'
})
export class WithoutCommentDonationAccessComponent {
  hideName: boolean = false;
      subscribe: boolean = false;
    
      selectedLanguage = new FormControl('ua');
    
      someString:string = 'UA';
    
      languages = [
        {code: 'en', name: "EN"},
        {code: 'ua', name: "UA"}
      ];
    
      payButtonText: string;
    
      constructor(
        private languageService: LanguageService, 
        private cdr: ChangeDetectorRef,
        private eRef: ElementRef
      )
      {
    
      }
    
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

      previewURLs: string[] = []; // Список загруженных фото
          activeButtonIndex: number = -1;
          activeStartupButtonIndex: number = -1;
          activeSocialButtonIndex: number = -1;
          activeHumanitarianButtonIndex: number = -1;
          activeCategoryIndex: number = -1;
        
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
          
          isButtonActive2: boolean[] = [false, false, false];
        
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
        
      
}
