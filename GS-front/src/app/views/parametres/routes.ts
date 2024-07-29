
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {title: 'Parametres'},
    children: [
      {
        path: 'parametresCompte',
        loadComponent: () => import('../pages/parametres-compte/parametres-compte.component').then(m => m.ParametresCompteComponent),
        data: {
          title: 'Paramètres du compte'
        }
      },
      {
        path: 'detailsEmploye',
        loadComponent: () => import('./details-employe/details-employe.component').then(m => m.DetailsEmployeComponent),
        data: {
          title: 'Details Employer'
        }
      },

      {
        path: '',
        redirectTo: 'alerte',
        pathMatch: 'full'
      },


    {
    path: 'entreprise',
    children: [
      {
        path: '',
        loadComponent: () => import('./entreprise/entreprise-list/entreprise-list.component').then(m => m.EntrepriseListComponent),
        data: {title: ' Entreprise'}
      },
      {
        path: 'create',
        loadComponent: () => import('./entreprise/entreprise-create/entreprise-create.component').then(m => m.EntrepriseCreateComponent),
        data: {title: 'Create Entreprise'}
      },
      {
        path: 'update',
        loadComponent: () => import('./entreprise/entreprise-update/entreprise-update.component').then(m => m.EntrepriseUpdateComponent),
        data: {title: 'update Entreprise'}
      },
    ]
    },


    {
    path: 'devises',
    children: [
      {
        path: '',
        loadComponent: () => import('./devises/devises-list/devises-list.component').then(m => m.DevisesListComponent),
        data: {title: 'Devises'}
      },
      {
        path: 'create',
        loadComponent: () => import('./devises/devises-create/devises-create.component').then(m => m.DevisesCreateComponent),
        data: {title: 'Create Devises'}
      },
      {
        path: 'update',
        loadComponent: () => import('./devises/devises-update/devises-update.component').then(m => m.DevisesUpdateComponent),
        data: {title: 'update Devises'}
      },
    ]
    },
    {
    path: 'nouvelle-devise',
    children: [
      {
        path: '',
        loadComponent: () => import('./nouvelle-devise/nouvelle-devise-list/nouvelle-devise-list.component').then(m => m.NouvelleDeviseListComponent),
        data: {title: 'NouvelleDevise'}
      },
      {
        path: 'create',
        loadComponent: () => import('./nouvelle-devise/nouvelle-devise-create/nouvelle-devise-create.component').then(m => m.NouvelleDeviseCreateComponent),
        data: {title: 'Create NouvelleDevise'}
      },
      {
        path: 'update',
        loadComponent: () => import('./nouvelle-devise/nouvelle-devise-update/nouvelle-devise-update.component').then(m => m.NouvelleDeviseUpdateComponent),
        data: {title: 'update NouvelleDevise'}
      },
    ]
    },
    {
    path: 'methode-paiement',
    children: [
      {
        path: '',
        loadComponent: () => import('./methode-paiement/methode-paiement-list/methode-paiement-list.component').then(m => m.MethodePaiementListComponent),
        data: {title: 'MethodePaiement'}
      },
      {
        path: 'create',
        loadComponent: () => import('./methode-paiement/methode-paiement-create/methode-paiement-create.component').then(m => m.MethodePaiementCreateComponent),
        data: {title: 'Create MethodePaiement'}
      },
      {
        path: 'update',
        loadComponent: () => import('./methode-paiement/methode-paiement-update/methode-paiement-update.component').then(m => m.MethodePaiementUpdateComponent),
        data: {title: 'update MethodePaiement'}
      },
    ]
    },
    {
    path: 'niveau-prix',
    children: [
      {
        path: '',
        loadComponent: () => import('./niveau-prix/niveau-prix-list/niveau-prix-list.component').then(m => m.NiveauPrixListComponent),
        data: {title: 'NiveauPrix'}
      },
      {
        path: 'create',
        loadComponent: () => import('./niveau-prix/niveau-prix-create/niveau-prix-create.component').then(m => m.NiveauPrixCreateComponent),
        data: {title: 'Create NiveauPrix'}
      },
      {
        path: 'update',
        loadComponent: () => import('./niveau-prix/niveau-prix-update/niveau-prix-update.component').then(m => m.NiveauPrixUpdateComponent),
        data: {title: 'update NiveauPrix'}
      },
    ]
    },
    {
    path: 'taxe',
    children: [
      {
        path: '',
        loadComponent: () => import('./taxe/taxe-list/taxe-list.component').then(m => m.TaxeListComponent),
        data: {title: 'Taxe'}
      },
      {
        path: 'create',
        loadComponent: () => import('./taxe/taxe-create/taxe-create.component').then(m => m.TaxeCreateComponent),
        data: {title: 'Create Taxe'}
      },
      {
        path: 'update',
        loadComponent: () => import('./taxe/taxe-update/taxe-update.component').then(m => m.TaxeUpdateComponent),
        data: {title: 'update Taxe'}
      },
    ]
    }
    ]
  }
];

