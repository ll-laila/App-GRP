
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {title: 'Boncommande'},
    children: [
      {
        path: '',
        redirectTo: 'bon-commande',
        pathMatch: 'full'
      },
    {
    path: 'bon-commande',
    children: [
      {
        path: '',
        loadComponent: () => import('./bon-commande/bon-commande-list/bon-commande-list.component').then(m => m.BonCommandeListComponent),
        data: {title: 'BonCommande'}
      },
      {
        path: 'create',
        loadComponent: () => import('./bon-commande/bon-commande-create/bon-commande-create.component').then(m => m.BonCommandeCreateComponent),
        data: {title: 'Create BonCommande'}
      },
      {
        path: 'update',
        loadComponent: () => import('./bon-commande/bon-commande-update/bon-commande-update.component').then(m => m.BonCommandeUpdateComponent),
        data: {title: 'update BonCommande'}
      },
      {
        path: 'boncmdautre',
        loadComponent: () => import('./bon-commande/boncmdautre/boncmdautre.component').then(m => m.BoncmdautreComponent),
        data: {title: 'boncmdautre BonCommande'}
      },
      {
        path: 'boncmdpdf',
        loadComponent: () => import('./bon-commande/boncmdpdf/boncmdpdf.component').then(m => m.BoncmdpdfComponent),
        data: {title: 'boncmdpdf BonCommande'}
      },
    ]
    },
    ]
  }
];

