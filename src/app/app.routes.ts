import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'projects', component: DashboardComponent }, // ✅ Redirect to Dashboard
  { path: '', redirectTo: '/login', pathMatch: 'full' } // ✅ Default route
];

export const appRouting = provideRouter(routes);
