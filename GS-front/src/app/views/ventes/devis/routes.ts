
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {title: 'Devis'},
    children: [
      {
        path: '',
        redirectTo: 'devis',
        pathMatch: 'full'
      },
    {
    path: 'devis',
    children: [
      {
        path: '',
        loadComponent: () => import('./devis/devis-list/devis-list.component').then(m => m.DevisListComponent),
        data: {title: 'Devis'}
      },
      {
        path: 'create',
        loadComponent: () => import('./devis/devis-create/devis-create.component').then(m => m.DevisCreateComponent),
        data: {title: 'Create Devis'}
      },
      {
        path: 'update',
        loadComponent: () => import('./devis/devis-update/devis-update.component').then(m => m.DevisUpdateComponent),
        data: {title: 'update Devis'}
      },
      {
        path: 'devispdf',
        loadComponent: () => import('./devis/devis-pdf/devis-pdf.component').then(m => m.DevisPdfComponent),
        data: {title: 'devispdf Devis'}
      },
      {
        path: 'devisautre',
        loadComponent: () => import('./devis/devis-autre/devis-autre.component').then(m => m.DevisAutreComponent),
        data: {title: 'devisautre Devis'}
      },
    ]
    },
    ]
  }
];

