
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {title: 'User'},
    children: [
        {
            path: '',
            redirectTo: 'employe',
            pathMatch: 'full'
        },
    {
    path: 'employe',
    children: [
      {
        path: '',
        loadComponent: () => import('./employe/employe-list/employe-list.component').then(m => m.EmployeListComponent),
        data: {title: 'Employe'}
      },
      {
        path: 'create',
        loadComponent: () => import('./employe/employe-create/employe-create.component').then(m => m.EmployeCreateComponent),
        data: {title: 'Create Employe'}
      },
      {
        path: 'update',
        loadComponent: () => import('./employe/employe-update/employe-update.component').then(m => m.EmployeUpdateComponent),
        data: {title: 'update Employe'}
      },
    ]
    },
    ]
  },
];


