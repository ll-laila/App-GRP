import {Component, inject} from '@angular/core';
import {
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    CardTextDirective, CardTitleDirective
} from "@coreui/angular";
import {DevisService} from "../../../../../controller/services/ventes/devis/devis.service";
import {Router} from "@angular/router";
import {BonCommandeService} from "../../../../../controller/services/inventaire/boncommande/bon-commande.service";

@Component({
  selector: 'app-boncmdautre',
  standalone: true,
    imports: [
        ButtonDirective,
        CardBodyComponent,
        CardComponent,
        CardHeaderComponent,
        CardTextDirective,
        CardTitleDirective
    ],
  templateUrl: './boncmdautre.component.html',
  styleUrl: './boncmdautre.component.scss'
})
export class BoncmdautreComponent {
  private bonCommandeService = inject(BonCommandeService)
  private router = inject(Router)
  public navigateToPdfCreate() {
    this.bonCommandeService.keepData = true
    this.router.navigate(['/inventaire/boncommande/bon-commande/boncmdpdf']).then()
  }
  public navigateToLivraisonCreate() {
    this.bonCommandeService.keepData = true
    this.router.navigate(['/inventaire/livraison/livraison/create']).then()
  }
}
