import { Routes } from '@angular/router';
// import { AuthGuard } from './share/guards/auth.guard';
// import { DataGuard } from './share/guards/data.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'about'
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./pages/auth-page/auth/auth.component').then(
        (c) => c.AuthComponent
      ),
    pathMatch: 'full',
    title: 'Auth'
  },
  {
    path: 'user-info',
    loadComponent: () =>
      import('./pages/user-info/user-info/user-info.component').then(
        (c) => c.UserInfoComponent
      ),
    pathMatch: 'full',
    title: 'Info'
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about-view/about-view.component').then(
        (c) => c.AboutViewComponent
      ),
    pathMatch: 'full',
    title: 'About'
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];
