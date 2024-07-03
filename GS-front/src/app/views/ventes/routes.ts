
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {title: 'Ventes'},
    children: [
      {
        path: '',
        redirectTo: 'commande-expedition',
        pathMatch: 'full'
      },

    {
    path: 'paiement',
    children: [
      {
        path: '',
        loadComponent: () => import('./paiement/paiement-list/paiement-list.component').then(m => m.PaiementListComponent),
        data: {title: 'Paiement'}
      },
      {
        path: 'create',
        loadComponent: () => import('./paiement/paiement-create/paiement-create.component').then(m => m.PaiementCreateComponent),
        data: {title: 'Create Paiement'}
      },
      {
        path: 'update',
        loadComponent: () => import('./paiement/paiement-update/paiement-update.component').then(m => m.PaiementUpdateComponent),
        data: {title: 'update Paiement'}
      },
    ]
    },
    {
    path: '',
    data: {title: ''},
    children: [

      {
          path: 'commande',
          data: {title: 'Commande'},
          loadChildren: () => import('./commande/routes').then((m) => m.routes)
      },
      {
          path: 'facture',
          data: {title: 'Facture'},
          loadChildren: () => import('./facture/routes').then((m) => m.routes)
      },
      {
          path: 'devis',
          data: {title: 'Devis'},
          loadChildren: () => import('./devis/routes').then((m) => m.routes)
      },
      {
          path: 'retourproduit',
          data: {title: 'Retourproduit'},
          loadChildren: () => import('./retourproduit/routes').then((m) => m.routes)
      },

    ]
    },
    ]
  }
];

