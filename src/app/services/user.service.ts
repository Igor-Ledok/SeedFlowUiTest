import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService 
{
  constructor(private http: HttpClient) { }

  baseUrl = environment.baseApiUrl + "/user/";
  
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` // Получение токена из localStorage
    });
  }


  create(request: CreateUserRequestDto): Observable<any> 
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.baseUrl + "create", request, { headers });
  }

  getUserInfo(): Observable<{ user: UserInfo }> {
    return this.http.get<{ user: UserInfo }>("https://localhost:7193/api/auth/info", { headers: this.getHeaders() });
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
}
