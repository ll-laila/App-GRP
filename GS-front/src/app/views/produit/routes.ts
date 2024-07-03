
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {title: 'Produit'},
    children: [
      {
        path: '',
        redirectTo: 'produit',
        pathMatch: 'full'
      },
    {
    path: 'produit',
    children: [
      {
        path: '',
        loadComponent: () => import('./produit/produit-list/produit-list.component').then(m => m.ProduitListComponent),
        data: {title: 'Produit'}
      },
      {
        path: 'create',
        loadComponent: () => import('./produit/produit-create/produit-create.component').then(m => m.ProduitCreateComponent),
        data: {title: 'Create Produit'}
      },
      {
        path: 'update',
        loadComponent: () => import('./produit/produit-update/produit-update.component').then(m => m.ProduitUpdateComponent),
        data: {title: 'update Produit'}
      },
    ]
    },
    ]
  }
];

