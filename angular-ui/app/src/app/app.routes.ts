import { Routes } from '@angular/router';
import { AuthGuard } from './share/guards/auth.guard';
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
    title: 'Welcome!',
    canActivate: [AuthGuard]
  },
  {
    path: 'user-info',
    loadComponent: () =>
      import('./pages/user-info/user-info/user-info.component').then(
        (c) => c.UserInfoComponent
      ),
    pathMatch: 'full',
    title: 'Info',
    canActivate: [AuthGuard]
  },
  {
    path: 'choice',
    loadComponent: () =>
      import('./pages/btns/btns/btns.component').then((c) => c.BtnsComponent),
    pathMatch: 'full',
    title: 'Menu',
    canActivate: [AuthGuard]
  },
  {
    path: 'data-results',
    loadComponent: () =>
      import('./pages/results/results/results.component').then(
        (c) => c.ResultsComponent
      ),
    pathMatch: 'full',
    title: 'Observation Data',
    canActivate: [AuthGuard]
  },
  {
    path: 'description-plan',
    loadComponent: () =>
      import('./pages/description/description/description.component').then(
        (c) => c.DescriptionComponent
      ),
    pathMatch: 'full',
    title: 'Description Care Plan',
    canActivate: [AuthGuard]
  },
  {
    path: 'create-own-plan',
    loadComponent: () =>
      import('./pages/create-own-plan/create-plan/create-plan.component').then(
        (c) => c.CreatePlanComponent
      ),
    pathMatch: 'full',
    title: 'Create Your Plan',
    canActivate: [AuthGuard]
  },
  {
    path: 'tracker-calendar',
    loadComponent: () =>
      import('./pages/calendar/calendar/calendar.component').then(
        (c) => c.CalendarComponent
      ),
    pathMatch: 'full',
    title: 'Track Your Habbits',
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about-view/about-view.component').then(
        (c) => c.AboutViewComponent
      ),
    pathMatch: 'full',
    title: 'About',
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];
