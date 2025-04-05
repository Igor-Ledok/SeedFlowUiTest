import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ProjectData } from '../models/project/project-data.interface';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { general } from '../models/project/general.interface';
import { details } from '../models/project/datails.interface';
import { TeamMember } from '../models/project/team-member.interface';
import { Reward } from '../models/project/reward.interface';
import { requisites } from '../models/project/requisites.interface';
import { environment } from '../../environment';
import { AuthService } from './auth.service';
import { CompleteProjectData } from '../models/project/completeproject-data';
import { ProjectList } from '../models/project/project-list-data';
import { TopicDto } from '../models/project/topic.interface';
import { detailsdescription } from '../models/project/datailsDescription.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projectData: ProjectData = {} as ProjectData;
  private teamMembers: TeamMember[] = [];
  private rewards: Reward[] = [];
  private projectPhotos: string[] = [];
  private Descriptions: detailsdescription[] = [];
  selectedFileNameDocx: string = '';
  BudgetArticlesFileName: string = '';
  
  baseUrl = environment.baseApiUrl + '/project';

  constructor(private http: HttpClient, private authService: AuthService) {}

  //Generel
  getProjectDataGenerel(general: general): void {
    this.projectData = { ...this.projectData, ...general };
    this.selectedFileNameDocx = general.selectedFileNameDocx;
  }
  returnProjectDataGeneral(): general {
    return {
      title: this.projectData.Title,
      collectionAmount: this.projectData.CollectionAmount,
      BudgetPlan: this.projectData.BudgetPlan,
      selectedFileNameDocx: this.selectedFileNameDocx,
      collectionDuration: this.projectData.CollectionDuration,
      BudgetPlanUrl: this.projectData.BudgetPlanUrl,
      YouTubeVideoUrl: this.projectData.YouTubeVideoUrl,
      MainPhotoUrl: this.projectData.MainPhotoUrl,
      selectedCategoryId: this.projectData.SelectedCategoryId,
    };
  }
  //Details
  getProjectDataDetails(details: details): void {
    this.projectData = { ...this.projectData, ...details };
    this.BudgetArticlesFileName = details.BudgetArticlesFileName;
  }
  getProjectDataDetailsProjectDescription(detailsDescription: detailsdescription): void {
    if (detailsDescription){
      this.Descriptions.push(detailsDescription);
    }
  }
  getProjectDataDetailsProjectPhotos(projectPhotos: string): void {
    if (projectPhotos){
      this.projectPhotos.push(projectPhotos);
    }
  }
  getProjectDataDetailsProjectPhotosSize(): number {
    return this.projectPhotos.length;
  }
  getProjectDataDetailsProjectDescriptionSize(): number {
    return this.Descriptions.length;
  }
  
  returnProjectDataDetails(): details {
    return {
      shortDescription: this.projectData.ShortDescription,
      phone: this.projectData.Phone,
      telegram: this.projectData.Telegram,
      viber: this.projectData.Viber,
      whatsApp: this.projectData.WhatsApp,
      linkedIn: this.projectData.LinkedIn,
      YouTubeVideoUrl: this.projectData.YouTubeVideoUrl,
      email: this.projectData.Email,
      address: this.projectData.Address, 
      BudgetArticles: this.projectData.BudgetArticles,
      BudgetArticlesUrl: this.projectData.BudgetArticlesUrl,
      BudgetArticlesFileName: this.BudgetArticlesFileName,
      instagram: this.projectData.Instagram,
      facebook: this.projectData.Facebook,
      telegramChannel: this.projectData.TelegramChannel,
      twitter: this.projectData.Twitter,
      linkedInGroup: this.projectData.LinkedInGroup
    };
  }
  returnProjectDataDetailsProjectDescription(index: number): detailsdescription {
    return this.Descriptions[index];
  }
  returnProjectDataDetailsProjectPhotos(index: number): string {
    return this.projectPhotos[index];
  }
  ProjectDataDetailsProjectPhotosClear(): void {
    this.projectPhotos = [];
  }
  ProjectDataDetailsProjectDescriptionClear() : void {
    this.Descriptions = [];
  }

  //Team
  getProjectDataTeam(team: TeamMember): void {
    if (team){
        this.teamMembers.push(team);
    }
  }
  returnProjectDataTeam(index: number): TeamMember {
    return this.teamMembers[index];
  }
  getProjectDataTeamSize(): number {
    return this.teamMembers.length;
  }
  //Rewards
  getProjectDataRewards(rewards: Reward): void {
    if (rewards){
        this.rewards.push(rewards);
    }
  }
  returnProjectDataRewards(index: number): Reward {
    return this.rewards[index];
  }
  getProjectDataRewardsSize(): number {
    return this.rewards.length;
  }
//Requiusits
  getProjectDataRequisites(requisites: requisites): void {
    this.projectData = { ...this.projectData, ...requisites };
  }
  returnProjectDataRequisites(): requisites {
    return this.projectData as requisites;
  }
//Uploads
    returnProjectDataUploads(): ProjectData {
        return this.projectData;
    }
    returnRewardsDataUploads(index: number): Reward {
        return this.rewards[index];
    }   
    returnteamMembersDataUploads(index: number): TeamMember {
        return this.teamMembers[index];
    } 



  
  // Для отправки данных на сервер
  sendProjectData(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage.');
      return throwError(() => new Error('Token not found.'));
    }
  
    if (!this.projectData) { // || Object.keys(this.projectData).length === 0
      console.error('No project data to send.');
      return throwError(() => new Error('No project data.'));
    }
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  
    const completeProjectData: CompleteProjectData = 
    {
      Project: this.projectData,
      TeamMembers: this.teamMembers,
      Rewards: this.rewards,
      ProjectPhoto: this.projectPhotos,
      Descriptions: this.Descriptions,
    };

    console.log('Sending project data:', completeProjectData);
  
    return this.http.post( this.baseUrl + "/add", completeProjectData, { headers:headers });
  }

  private handleError(error: HttpErrorResponse) 
  {
    debugger; // Добавляем debugger
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
    } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        console.log("Response body:", error.error);
        console.log("Status Code:", error.status);
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }


  getProjects(): Observable<ProjectList[]> {
    return this.http.get<ProjectList[]>(this.baseUrl + "/list");
  }
  getTopics(): Observable<TopicDto[]> {
    return this.http.get<TopicDto[]>(this.baseUrl + "/topics");
  }
}