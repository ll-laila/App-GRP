
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {title: 'Retourproduit'},
    children: [
      {
        path: '',
        redirectTo: 'retour-produit',
        pathMatch: 'full'
      },
    {
    path: 'retour-produit',
    children: [
      {
        path: '',
        loadComponent: () => import('./retour-produit/retour-produit-list/retour-produit-list.component').then(m => m.RetourProduitListComponent),
        data: {title: 'RetourProduit'}
      },
      {
        path: 'create',
        loadComponent: () => import('./retour-produit/retour-produit-create/retour-produit-create.component').then(m => m.RetourProduitCreateComponent),
        data: {title: 'Create RetourProduit'}
      },
      {
        path: 'update',
        loadComponent: () => import('./retour-produit/retour-produit-update/retour-produit-update.component').then(m => m.RetourProduitUpdateComponent),
        data: {title: 'update RetourProduit'}
      },
      {
        path: 'retourfacture',
        loadComponent: () => import('./retourfacture/retourfacture.component').then(m => m.RetourfactureComponent),
        data: {title: 'retourfacture RetourProduit'}
      },

    ]
    },
    ]
  }
];


