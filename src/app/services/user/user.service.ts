import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  roles: string[];
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  /**
   * Get current user profile
   */
  getCurrentUser(): Observable<User> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<User>(`${this.apiUrl}/api/users/me`, { headers });
  }
}
