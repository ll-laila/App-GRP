import {Component, inject} from '@angular/core';
import {CardBodyComponent, CardComponent, CardHeaderComponent} from "@coreui/angular";
import {LivraisonService} from "../../../../../controller/services/inventaire/livraison/livraison.service";
import {Router} from "@angular/router";
import {Livraison} from "../../../../../controller/entities/inventaire/livraison/livraison";

@Component({
  selector: 'app-livraison-autre',
  standalone: true,
  imports: [
    CardHeaderComponent,
    CardBodyComponent,
    CardComponent
  ],
  templateUrl: './livraison-autre.component.html',
  styleUrl: './livraison-autre.component.scss'
})
export class LivraisonAutreComponent {

  private livraisonService = inject(LivraisonService)
  private router = inject(Router)

  public set items(value:Livraison[]) {
    this.livraisonService.items = value;
  }

  public get item(): Livraison {
    return this.livraisonService.item;
  }

  public set item(value: Livraison ) {
    this.livraisonService.item = value;
  }
  public navigateToLivraisonPdfCreate() {
    this.livraisonService.keepData = true
    this.router.navigate(['/inventaire/livraison/livraison/livraisonpdf']).then()
  }

}
