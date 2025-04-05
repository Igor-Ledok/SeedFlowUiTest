import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LanguageService } from '../services/language.service';
import { MatSelectModule } from '@angular/material/select';
import { TeamMember } from '../models/project/team-member.interface';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: 
  [
    CommonModule, 
    FormsModule, 
    RouterModule,
    TranslocoModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent {
  projectDataOld: TeamMember[] = [];
  sizeTeam: number = 0;
  sizeTeamOld: number = 0;
  private projectData: TeamMember[] = [];


  defaultPhoto = 'assets/default-avatar.png';
  teamMembers = [
    { photo: '', name: '', role: '', phone: '', viber: '', telegram: '', email: '' }
  ];

  addMember(): void {
    this.projectDataOld.push({name: '', role: '', phone: '', viber: '', telegram: '', email: '', UrlPhoto: 'none'});
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

    constructor(
      private eRef: ElementRef,
      private languageService: LanguageService,
      private projectService: ProjectService)
    {

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

    ngOnInit() {
      this.sizeTeamOld = this.projectService.getProjectDataTeamSize();
      for (let i = 0; i < this.sizeTeamOld; i++) {
        this.projectDataOld.push(this.projectService.returnProjectDataTeam(i));
      }
    }
    saveGeneralData(): void {
      this.sizeTeam = this.projectDataOld.length;
      for (let i = this.sizeTeamOld; i < this.sizeTeam; i++) {
        this.projectData.push(this.projectDataOld[i]); 
      }
      for (let i = 0; i < this.sizeTeam; i++) {
        console.log(this.projectData[i]);
        this.projectService.getProjectDataTeam(this.projectData[i]);
      }
    }

    uploadImage(event: any, index: number): void {
      const file = event.target.files[0];
    
      if (file) {
        const reader = new FileReader();
    
        reader.onload = (e: any) => {
          this.projectDataOld[index].UrlPhoto = e.target.result; // Сохраняем base64 строку
        };
    
        reader.readAsDataURL(file); // Преобразуем файл в base64
      }
    }

    submitProject(): void {
      console.log('submitProject');
      };
}
