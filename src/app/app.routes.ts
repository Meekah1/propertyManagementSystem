// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { PropertyListComponent } from './components/property-list/property-list';
import { PropertyEditComponent } from './components/property-edit/property-edit';
import { LoginComponent } from './components/login/login';

export const routes: Routes = [
  { path: '', redirectTo: '/properties', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'properties',
    component: PropertyListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'properties/add',
    component: PropertyEditComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'properties/edit/:id',
    component: PropertyEditComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  { path: '**', redirectTo: '/properties' },
];
