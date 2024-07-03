import {Component, inject} from '@angular/core';
import {FactureService} from "../../../../../controller/services/ventes/facture/facture.service";
import {Facture} from "../../../../../controller/entities/ventes/facture/facture";

@Component({
  selector: 'app-facture-pdf',
  standalone: true,
  imports: [],
  templateUrl: './facture-pdf.component.html',
  styleUrl: './facture-pdf.component.scss'
})
export class FacturePdfComponent {
  private factureService = inject(FactureService)
  public set items(value:Facture[]) {
    this.factureService.items= value;
  }

  public get item(): Facture {

    return this.factureService.item;
  }

  public set item(value: Facture ) {
    this.factureService.item = value;
  }

  ngOnInit() {
    this.factureService.findById(this.item.id).subscribe({
        next: data => {
            this.factureService.item = data
        },
        error: err => console.log(err)
    })
  }



}

