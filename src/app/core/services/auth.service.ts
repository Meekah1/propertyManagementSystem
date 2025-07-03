import { Injectable } from '@angular/core';
import { Role, User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: User | null = null;

  login(username: string, password: string): boolean {
    const users: User[] = [
      { id: 1, username: 'admin', password: 'admin123', role: Role.Admin },
      { id: 2, username: 'user', password: 'user123', role: Role.User },
    ];

    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    if (!this.currentUser) {
      const user = localStorage.getItem('currentUser');
      if (user) {
        this.currentUser = JSON.parse(user);
      }
    }
    return this.currentUser;
  }

  isAdmin(): boolean {
    return this.getCurrentUser()?.role === Role.Admin;
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
  // Start with just login() first, then add other methods
}
