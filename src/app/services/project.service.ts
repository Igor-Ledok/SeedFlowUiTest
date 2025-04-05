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

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projectData: ProjectData = {} as ProjectData;
  private teamMembers: TeamMember[] = [];
  private rewards: Reward[] = [];
  private projectPhotos: string[] = [];
  private selectedFileNameDocx: string = '';
  private selectedFileNameDocxB: string = '';
  
  baseUrl = environment.baseApiUrl + '/project';

  constructor(private http: HttpClient, private authService: AuthService) {}

  //Generel
  getProjectDataGenerel(general: general): void {
    this.projectData = { ...this.projectData, ...general };
    this.selectedFileNameDocx = general.selectedFileNameDocx;
  }
  returnProjectDataGeneral(): general {
    return {
      title: this.projectData.title,
      collectionAmount: this.projectData.collectionAmount,
      collectionDuration: this.projectData.collectionDuration,
      BudgetPlanUrl: this.projectData.BudgetPlan,
      YouTubeVideoUrl: this.projectData.YouTubeVideoUrl,
      MainPhotoUrl: this.projectData.MainPhotoUrl,
      selectedFileNameDocx: this.selectedFileNameDocx,
      selectedCategoryId: this.projectData.selectedCategoryId
    };
  }
  //Details
  getProjectDataDetails(details: details): void {
    this.projectData = { ...this.projectData, ...details };
    this.selectedFileNameDocxB = details.selectedFileNameDocxB;
  }
  getProjectDataDetailsProjectPhotos(projectPhotos: string): void {
    if (projectPhotos){
      this.projectPhotos.push(projectPhotos);
    }
  }
  getProjectDataDetailsProjectPhotosSize(): number {
    return this.projectPhotos.length;
  }
  returnProjectDataDetails(): details {
    const modeldetails = {
      shortDescription: this.projectData.shortDescription,
      detailedDescription: this.projectData.detailedDescription,
      phone: this.projectData.phone,
      telegram: this.projectData.telegram,
      viber: this.projectData.viber,
      whatsApp: this.projectData.whatsApp,
      linkedIn: this.projectData.linkedIn,
      email: this.projectData.email,
      address: this.projectData.address,
      BudgetArticlesUrl: this.projectData.BudgetArticlesUrl,
      instagram: this.projectData.instagram,
      facebook: this.projectData.facebook,
      telegramChannel: this.projectData.telegramChannel,
      twitter: this.projectData.twitter,
      linkedInGroup: this.projectData.linkedInGroup,
      selectedFileNameDocxB: this.selectedFileNameDocxB,
    };
    return modeldetails;
  }
  returnProjectDataDetailsProjectPhotos(index: number): string {
    return this.projectPhotos[index];
  }
  ProjectDataDetailsProjectPhotosClear(): void {
    this.projectPhotos = [];
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
  
    if (!this.projectData || Object.keys(this.projectData).length === 0) {
      console.error('No project data to send.');
      return throwError(() => new Error('No project data.'));
    }
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  
    const completeProjectData: CompleteProjectData = {
      project: this.projectData,
      teamMembers: this.teamMembers,
      rewards: this.rewards,
      projectPhoto: this.projectPhotos
    };

    console.log('Sending project data:', completeProjectData);
  
    return this.http.post("https://localhost:7193/api/project/add", completeProjectData, { headers:headers });
  }

  private handleError(error: HttpErrorResponse) {
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
    return this.http.get<ProjectList[]>("https://localhost:7193/api/project/list");
  }

  getTopics(): Observable<TopicDto[]> {
    return this.http.get<TopicDto[]>("https://localhost:7193/api/project/topics");
  }
}