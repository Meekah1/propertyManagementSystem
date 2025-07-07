import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbCollapseModule],
  templateUrl: '../navbar/navbar.html',
  styleUrls: ['../navbar/navbar.scss'],
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}

  isCollapsed = true;

  logout(): void {
    this.authService.logout();
    window.location.href = '/login';
  }
}
