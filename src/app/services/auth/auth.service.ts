import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private endpoint = '/api/auth';
  private apiUrl = environment.apiUrl + this.endpoint;

  constructor(private http: HttpClient) { }

  /**
   * Login request to backend
   */
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((res: any) => {
        if (res.accessToken) {
          this.storeTokens(res.accessToken, res.refreshToken);
        }
      })
    );
  }

  /**
   * Register new user
   */
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  /**
   * Refresh token request
   */
  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/refresh`, { refreshToken }).pipe(
      tap((res: any) => {
        if (res.accessToken) {
          this.storeTokens(res.accessToken, res.refreshToken);
        }
      })
    );
  }

  /**
   * Logout function
   */
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  /**
   * Get stored access token
   */
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  /**
   * Store tokens in local storage
   */
  private storeTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  /**
   * Get authentication headers for protected requests
   */
  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.getAccessToken()}`,
    });
  }
}
