import {Component, inject} from '@angular/core';
import {BonCommandeService} from "../../../../../controller/services/inventaire/boncommande/bon-commande.service";
import {
  BonCommandeProduitService
} from "../../../../../controller/services/inventaire/boncommande/bon-commande-produit.service";
import {BonCommande} from "../../../../../controller/entities/inventaire/boncommande/bon-commande";
import {BonCommandeProduit} from "../../../../../controller/entities/inventaire/boncommande/bon-commande-produit";
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-boncmdpdf',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boncmdpdf.component.html',
  styleUrl: './boncmdpdf.component.scss'
})
export class BoncmdpdfComponent {
  private bonCommandeService = inject(BonCommandeService)
  private bonCommandeProduitService = inject(BonCommandeProduitService)
  public logo?:string;
  public set items(value:BonCommande[]) {
    this.bonCommandeService.items = value;
  }

  public get item(): BonCommande {
    return this.bonCommandeService.item;
  }

  public set item(value: BonCommande ) {
    this.bonCommandeService.item = value;
  }


  public set itemsCmdPr(value:BonCommandeProduit[]) {
    this.bonCommandeProduitService.items = value;
  }

  public get itemCmdPr(): BonCommandeProduit {
    return this.bonCommandeProduitService.item;
  }

  public set itemCmdPr(value: BonCommandeProduit ) {
    this.bonCommandeProduitService.item = value;
  }
  imprimerFacture() {
    window.print();
  }



  ngOnInit() {
    this.bonCommandeService.findById(this.item.id).subscribe({
      next: data => {
        this.bonCommandeService.item = data;
        this.logo = data.entreprise?.logo;
      },
      error: err => console.log(err)
    })
  }


}
