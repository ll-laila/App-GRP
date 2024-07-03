import {Component, inject, OnInit} from '@angular/core';
import {FactureService} from "../../../../../controller/services/ventes/facture/facture.service";
import {Facture} from "../../../../../controller/entities/ventes/facture/facture";

@Component({
  selector: 'app-facture-detail',
  standalone: true,
  imports: [],
  templateUrl: './facture-detail.component.html',
  styleUrl: './facture-detail.component.scss'
})
export class FactureDetailComponent implements OnInit{
  private factureService = inject(FactureService)
  public set items(value) {
    this.factureService.items= value;
  }

  public get item(): Facture {
    return this.factureService.item;
  }

  public set item(value: Facture ) {
    this.factureService.item = value;
  }

  public get items() {
    return this.factureService.items;
  }

  ngOnInit(): void {
    this.factureretour()

  }
  factureretour() {
    this.factureService.findById(this.item.id).subscribe({
      next: value => {
        this.item = value
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
