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
    path: 'welcome',
    loadComponent: () =>
      import('./pages/greetings/greetings/greetings.component').then(
        (c) => c.GreetingsComponent
      ),
    pathMatch: 'full',
    title: 'Welcome!'
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
    path: 'choice',
    loadComponent: () =>
      import('./pages/btns/btns/btns.component').then((c) => c.BtnsComponent),
    pathMatch: 'full',
    title: 'Menu'
  },
  {
    path: 'data-results',
    loadComponent: () =>
      import('./pages/results/results/results.component').then(
        (c) => c.ResultsComponent
      ),
    pathMatch: 'full',
    title: 'Results'
  },
  {
    path: 'plan',
    loadComponent: () =>
      import('./pages/description/description/description.component').then(
        (c) => c.DescriptionComponent
      ),
    pathMatch: 'full',
    title: 'Plan'
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
