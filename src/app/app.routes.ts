import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: 'UNSMF — Tratamiento contra la diabetes',
  },
  {
    path: 'asistente',
    loadComponent: () =>
      import('./pages/asistente/asistente-page').then((m) => m.AsistentePage),
    title: 'Asistente — UNSMF',
  },
  {
    path: 'calculadora',
    loadComponent: () =>
      import('./pages/calculadora/calculadora-page').then((m) => m.CalculadoraPage),
    title: 'Calculadora de riesgo — UNSMF',
  },
  {
    path: 'comentarios',
    loadComponent: () =>
      import('./pages/comentarios/comentarios-page').then((m) => m.ComentariosPage),
    title: 'Comunidad — UNSMF',
  },
  {
    path: 'plan-alimentario',
    loadComponent: () =>
      import('./pages/plan-alimentario/plan-alimentario-page').then((m) => m.PlanAlimentarioPage),
    title: 'Plan alimentario — UNSMF',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
