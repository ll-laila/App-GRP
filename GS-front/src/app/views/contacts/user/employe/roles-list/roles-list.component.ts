import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as bootstrap from 'bootstrap';
import {NgForOf} from "@angular/common";
import {PermissionsAcces} from "../../../../../controller/entities/contacts/user/PermissionsAcces";

@Component({
  selector: 'app-roles-list',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent {
    @Input() permissions: any = [];
    @Output() confirmed = new EventEmitter<any>();


  ngOnInit() {
      this.permissions = [
          // Ventes - Factures
          { nom: 'ajouter facture', etat: false , entrepriseId: -1},
          { nom: 'modifier facture', etat: false  , entrepriseId: -1},
          { nom: 'supprimer facture', etat: false , entrepriseId: -1 },
          /*// Clients
          { nom: 'ajouter client', etat: false },
          { nom: 'modifier client', etat: false },
          { nom: 'supprimer client', etat: false },
          // Fournisseurs
          { nom: 'ajouter fournisseur', etat: false },
          { nom: 'modifier fournisseur', etat: false },
          { nom: 'supprimer fournisseur', etat: false },
          // Produits
          { nom: 'ajouter produit', etat: false },
          { nom: 'modifier produit', etat: false },
          { nom: 'supprimer produit', etat: false },
          // Ventes - Commandes
          { nom: 'ajouter commande', etat: false },
          { nom: 'modifier commande', etat: false },
          { nom: 'supprimer commande', etat: false },
          // Ventes - Devis
          { nom: 'ajouter devis', etat: false },
          { nom: 'modifier devis', etat: false },
          { nom: 'supprimer devis', etat: false },
          // Ventes - Retours Produits
          { nom: 'ajouter retour produit', etat: false },
          { nom: 'modifier retour produit', etat: false },
          { nom: 'supprimer retour produit', etat: false },
          // Ventes - Paiements
          { nom: 'ajouter paiement', etat: false },
          { nom: 'modifier paiement', etat: false },
          { nom: 'supprimer paiement', etat: false },
          // Inventaire - Niveau de stock
          { nom: 'ajouter niveau stock', etat: false },
          { nom: 'modifier niveau stock', etat: false },
          { nom: 'supprimer niveau stock', etat: false },
          // Inventaire - Bons de commande
          { nom: 'ajouter bon commande', etat: false },
          { nom: 'modifier bon commande', etat: false },
          { nom: 'supprimer bon commande', etat: false },
          // Inventaire - Bons de facture
          { nom: 'ajouter bon facture', etat: false },
          { nom: 'modifier bon facture', etat: false },
          { nom: 'supprimer bon facture', etat: false },
          // Paramètres - Entreprise
          { nom: 'ajouter entreprise', etat: false },
          { nom: 'modifier entreprise', etat: false },
          { nom: 'supprimer entreprise', etat: false },*/
      ];

  }

    closeModal() {
        const modalElement = document.getElementById('confirmationModal');
        if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
            modal.hide();
        }
    }

  onPermissionChange(permission: any) {
    permission.etat = permission.etat !== true;
  }

  confirmPermissions() {
        const confirmedPermissions = this.permissions.filter((permission: any) => permission.etat);
        this.confirmed.emit(confirmedPermissions);
        this.closeModal();
  }

}
