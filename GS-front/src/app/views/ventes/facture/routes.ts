
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {title: 'Facture'},
    children: [
      {
        path: '',
        redirectTo: 'facture',
        pathMatch: 'full'
      },
    {
    path: 'facture',
    children: [
      {
        path: '',
        loadComponent: () => import('./facture/facture-list/facture-list.component').then(m => m.FactureListComponent),
        data: {title: 'Facture'}
      },
      {
        path: 'create',
        loadComponent: () => import('./facture/facture-create/facture-create.component').then(m => m.FactureCreateComponent),
        data: {title: 'Create Facture'}
      },
      {
        path: 'update',
        loadComponent: () => import('./facture/facture-update/facture-update.component').then(m => m.FactureUpdateComponent),
        data: {title: 'update Facture'}
      },
      {
        path: 'factureautre',
        loadComponent: () => import('./facture/facture-autre/facture-autre.component').then(m => m.FactureAutreComponent),
        data: {title: 'autre Facture'}
      },
      {
        path: 'facturepdf',
        loadComponent: () => import('./facture/facture-pdf/facture-pdf.component').then(m => m.FacturePdfComponent),
        data: {title: 'pdf Facture'}
      },
      {
        path: 'facturecommande',
        loadComponent: () => import('./facture/facture-commande/facture-commande.component').then(m => m.FactureCommandeComponent),
        data: {title: 'commande Facture'}
      },


    ]
    },
    ]
  }
];

