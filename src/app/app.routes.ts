import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/landing/landing').then((m) => m.Landing),
    title: 'UNSMF — Tratamiento contra la diabetes',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
