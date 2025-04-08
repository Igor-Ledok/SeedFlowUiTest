import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs/internal/Observable';
import { UpdateUserDto } from '../models/user/update-user-dto';
import { SafeLocalStorageService } from './safe-local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService 
{
  constructor(private http: HttpClient, private storage: SafeLocalStorageService) { }

  baseUrl = environment.baseApiUrl + "api/user";
  twobaseUrl = environment.baseApiUrl + "api/auth";
  
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.storage.getItem('token')}` // Получение токена из localStorage
    });
  }


  create(request: CreateUserRequestDto): Observable<any> 
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.twobaseUrl + "/create", request, { headers });
  }

  getUserInfo(): Observable<{ user: UserInfo }> {
    return this.http.get<{ user: UserInfo }>(this.twobaseUrl + "/info", { headers: this.getHeaders() });
  }

  updateUser(user: UpdateUserDto): Observable<any> {
    return this.http.post(this.twobaseUrl + '/update', user, { headers: this.getHeaders() }); // путь к твоему API
  }
}

// Интерфейс для создания пользователя
export interface CreateUserRequestDto {
  email: string;
  password: string;
  isAutor: boolean;
}

export interface UserInfo {
  name: string;
  description: string;
  email: string;
  date: string;
  photo: string;
}
