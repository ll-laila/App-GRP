
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {title: 'Adresse'},
    children: [
      {
        path: '',
        redirectTo: 'adresse',
        pathMatch: 'full'
      },
    {
    path: 'adresse',
    children: [
      {
        path: '',
        loadComponent: () => import('./adresse/adresse-list/adresse-list.component').then(m => m.AdresseListComponent),
        data: {title: 'Adresse'}
      },
      {
        path: 'create',
        loadComponent: () => import('./adresse/adresse-create/adresse-create.component').then(m => m.AdresseCreateComponent),
        data: {title: 'Create Adresse'}
      },
      {
        path: 'update',
        loadComponent: () => import('./adresse/adresse-update/adresse-update.component').then(m => m.AdresseUpdateComponent),
        data: {title: 'update Adresse'}
      },
    ]
    },
    {
    path: 'pays',
    children: [
      {
        path: '',
        loadComponent: () => import('./pays/pays-list/pays-list.component').then(m => m.PaysListComponent),
        data: {title: 'Pays'}
      },
      {
        path: 'create',
        loadComponent: () => import('./pays/pays-create/pays-create.component').then(m => m.PaysCreateComponent),
        data: {title: 'Create Pays'}
      },
      {
        path: 'update',
        loadComponent: () => import('./pays/pays-update/pays-update.component').then(m => m.PaysUpdateComponent),
        data: {title: 'update Pays'}
      },
    ]
    },
    ]
  }
];

