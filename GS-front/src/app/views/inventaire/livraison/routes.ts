
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {title: 'Livraison'},
    children: [
      {
        path: '',
        redirectTo: 'livraison',
        pathMatch: 'full'
      },
    {
    path: 'livraison',
    children: [
      {
        path: '',
        loadComponent: () => import('./livraison/livraison-list/livraison-list.component').then(m => m.LivraisonListComponent),
        data: {title: 'Livraison'}
      },
      {
        path: 'create',
        loadComponent: () => import('./livraison/livraison-create/livraison-create.component').then(m => m.LivraisonCreateComponent),
        data: {title: 'Create Livraison'}
      },
      {
        path: 'update',
        loadComponent: () => import('./livraison/livraison-update/livraison-update.component').then(m => m.LivraisonUpdateComponent),
        data: {title: 'update Livraison'}
      },
      {
        path: 'livraisonpdf',
        loadComponent: () => import('./livraison/livraison-pdf/livraison-pdf.component').then(m => m.LivraisonPdfComponent),
        data: {title: 'livraisonpdf Livraison'}
      },
    ]
    },
    ]
  }
];

