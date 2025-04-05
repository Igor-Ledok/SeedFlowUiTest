import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LanguageService } from '../services/language.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { details } from '../models/project/datails.interface';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    TranslocoModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent 
{  
  activeButtonIndex: number = -1;
  activeStartupButtonIndex: number = -1;
  activeSocialButtonIndex: number = -1;
  activeHumanitarianButtonIndex: number = -1;
  activeCategoryIndex: number = -1;

  projectPhotosSize: number = 0;
  projectPhotos: string[] = [];


  projectData: details = {} as details;


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



  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private eRef: ElementRef,
    private languageService: LanguageService,
    private projectService: ProjectService ) {}

  ngOnInit() 
  {
    this.route.url.subscribe(urlSegments => {
      this.activeTab = urlSegments.length > 1 ? urlSegments[1].path : 'general';
    });
    this.projectData = this.projectService.returnProjectDataDetails();

    this.projectPhotosSize = this.projectService.getProjectDataDetailsProjectPhotosSize();
    for (let i = 0; i < this.projectPhotosSize; i++){
      this.projectPhotos.push(this.projectService.returnProjectDataDetailsProjectPhotos(i));
    }

    const savedLanguage = localStorage.getItem('selectedLanguage') ||'ua'; 
    this.selectedLanguage.setValue(savedLanguage);
    this.onLanguageChange({ value: savedLanguage });
  }

  onFileSelectedDocx(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file: File = inputElement.files ? inputElement.files[0] : null;
  
    if (file) {
      const reader = new FileReader();
      this.projectData.selectedFileNameDocxB = file.name; // Отображаем название файла
      
      reader.onload = () => {
        
        // Пытаемся привести result к строке
        const base64File = reader.result as string;
  
        // Проверяем, если result является строкой
        if (typeof base64File === 'string') {
          console.log('Base64 файл: ', base64File);
          this.projectData.BudgetArticlesUrl = base64File; // Сохраняем base64 строку
        } else {
          console.error('Результат не строка');
        }
      };
      
      reader.readAsDataURL(file); // Читаем файл и конвертируем в Base64
    }
  }
  clearFile(): void {
    this.projectData.selectedFileNameDocxB = null;
    this.projectData.BudgetArticlesUrl = '';
    console.log('Файл видалено');
  }


  navigate(tabKey: string) {
    this.activeTab = tabKey;
    this.router.navigate(['/project-page', tabKey]); // Переключаемся с изменением URL
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    for (let file of input.files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.projectPhotos.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  removePhoto(index: number): void {
    this.projectPhotos.splice(index, 1);
  }

  changePhoto(index: number): void {
    // Триггерим клик по соответствующему input
    document.getElementById(`changePhotoInput${index}`)?.click();
  }
  
  onPhotoChanged(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Меняем фото по индексу
        this.projectPhotos[index] = e.target.result;
        console.log(`Фото с индексом ${index} изменено`);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  

  saveDetailData(): void {
    console.log('кнопка сохранить работает');
    this.projectService.getProjectDataDetails(this.projectData);
    //this.projectService.getProjectDataDetailsProjectPhotos();

    this.projectService.ProjectDataDetailsProjectPhotosClear();
    
    for (let i = 0; i < this.projectPhotos.length; i++){
      this.projectService.getProjectDataDetailsProjectPhotos(this.projectPhotos[i]);
    }
  }
  submitProject(): void {
    console.log('кнопка отправить работает');
  }
}
