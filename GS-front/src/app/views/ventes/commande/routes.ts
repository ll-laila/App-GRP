
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {title: 'Commande'},
    children: [
      {
        path: '',
        redirectTo: 'commande',
        pathMatch: 'full'
      },
    {
    path: 'commande',
    children: [
      {
        path: '',
        loadComponent: () => import('./commande/commande-list/commande-list.component').then(m => m.CommandeListComponent),
        data: {title: 'Commande'}
      },
      {
        path: 'create',
        loadComponent: () => import('./commande/commande-create/commande-create.component').then(m => m.CommandeCreateComponent),
        data: {title: 'Create Commande'}
      },
      {
        path: 'update',
        loadComponent: () => import('./commande/commande-update/commande-update.component').then(m => m.CommandeUpdateComponent),
        data: {title: 'update Commande'}
      },
      {
        path: 'autre',
        loadComponent: () => import('./commande/commande-autre/commande-autre.component').then(m => m.CommandeAutreComponent),
        data: {title: 'autre Commande'}
      },
      {
        path: 'commandePdf',
        loadComponent: () => import('./commande/commande-pdf/commande-pdf.component').then(m => m.CommandePdfComponent),
        data: {title: 'commandePdf Commande'}
      },
    ]
    },
    ]
  }
];

