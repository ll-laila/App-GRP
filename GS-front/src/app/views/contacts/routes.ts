
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {title: 'Contacts'},
    children: [
      {
        path: '',
        redirectTo: 'fournisseur',
        pathMatch: 'full'
      },
    {
    path: 'fournisseur',
    children: [
      {
        path: '',
        loadComponent: () => import('./fournisseur/fournisseur-list/fournisseur-list.component').then(m => m.FournisseurListComponent),
        data: {title: 'Fournisseur'}
      },
      {
        path: 'create',
        loadComponent: () => import('./fournisseur/fournisseur-create/fournisseur-create.component').then(m => m.FournisseurCreateComponent),
        data: {title: 'Create Fournisseur'}
      },
      {
        path: 'update',
        loadComponent: () => import('./fournisseur/fournisseur-update/fournisseur-update.component').then(m => m.FournisseurUpdateComponent),
        data: {title: 'update Fournisseur'}
      },
    ]
    },
    {
    path: 'client',
    children: [
      {
        path: '',
        loadComponent: () => import('./client/client-list/client-list.component').then(m => m.ClientListComponent),
        data: {title: 'Client'}
      },
      {
        path: 'create',
        loadComponent: () => import('./client/client-create/client-create.component').then(m => m.ClientCreateComponent),
        data: {title: 'Create Client'}
      },
      {
        path: 'update',
        loadComponent: () => import('./client/client-update/client-update.component').then(m => m.ClientUpdateComponent),
        data: {title: 'update Client'}
      },
    ]
    },
    {
    path: '',
    data: {title: ''},
    children: [
      {
          path: 'user',
          data: {title: 'User'},
          loadChildren: () => import('./user/routes').then((m) => m.routes)
      },
    ]
    },
    ]
  }
];

