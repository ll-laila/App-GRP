import {Component, inject} from '@angular/core';
import {CommandeService} from "../../../../../controller/services/ventes/commande/commande.service";
import {Commande} from "../../../../../controller/entities/ventes/commande/commande";

@Component({
  selector: 'app-commande-pdf',
  standalone: true,
  imports: [],
  templateUrl: './commande-pdf.component.html',
  styleUrl: './commande-pdf.component.scss'
})
export class CommandePdfComponent {
private commandeService = inject(CommandeService)
  public set items(value:Commande[]) {
    this.commandeService.items = value;
  }

  public get item(): Commande {
    return this.commandeService.item;
  }

  public set item(value: Commande ) {
    this.commandeService.item = value;
  }
  ngOnInit() {
    this.commandeService.findById(this.item.id).subscribe({
      next: data => {
        this.commandeService.item = data
      },
      error: err => console.log(err)
    })
  }

}
