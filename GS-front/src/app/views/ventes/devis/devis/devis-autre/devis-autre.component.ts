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

@Component({
  selector: 'app-devis-autre',
  standalone: true,
  imports: [
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    CardTextDirective,
    CardTitleDirective
  ],
  templateUrl: './devis-autre.component.html',
  styleUrl: './devis-autre.component.scss'
})
export class DevisAutreComponent {
  private devisService = inject(DevisService)
  private router = inject(Router)
  public navigateToPdfCreate() {
    this.devisService.keepData = true
    this.router.navigate(['/ventes/devis/devis/devispdf']).then()
  }
}
