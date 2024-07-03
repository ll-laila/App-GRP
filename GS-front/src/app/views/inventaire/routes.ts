
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {title: 'Inventaire'},
    children: [
      {
        path: '',
        redirectTo: 'niveau-stock',
        pathMatch: 'full'
      },
    {
    path: 'niveau-stock',
    children: [
      {
        path: '',
        loadComponent: () => import('./niveau-stock/niveau-stock-list/niveau-stock-list.component').then(m => m.NiveauStockListComponent),
        data: {title: 'NiveauStock'}
      },
      {
        path: 'create',
        loadComponent: () => import('./niveau-stock/niveau-stock-create/niveau-stock-create.component').then(m => m.NiveauStockCreateComponent),
        data: {title: 'Create NiveauStock'}
      },
      {
        path: 'update',
        loadComponent: () => import('./niveau-stock/niveau-stock-update/niveau-stock-update.component').then(m => m.NiveauStockUpdateComponent),
        data: {title: 'update NiveauStock'}
      },
    ]
    },
    {
    path: '',
    data: {title: ''},
    children: [
      {
          path: 'boncommande',
          data: {title: 'Boncommande'},
          loadChildren: () => import('./boncommande/routes').then((m) => m.routes)
      },
      {
          path: 'livraison',
          data: {title: 'Livraison'},
          loadChildren: () => import('./livraison/routes').then((m) => m.routes)
      },
    ]
    },
    ]
  }
];

