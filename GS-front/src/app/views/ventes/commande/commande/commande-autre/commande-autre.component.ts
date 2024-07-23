import {Component, inject} from '@angular/core';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  CardTextDirective, CardTitleDirective
} from "@coreui/angular";
import {Router, RouterLink} from "@angular/router";
import {FactureService} from "../../../../../controller/services/ventes/facture/facture.service";
import {Facture} from "../../../../../controller/entities/ventes/facture/facture";
import {CommandeService} from "../../../../../controller/services/ventes/commande/commande.service";
import {Paiement} from "../../../../../controller/entities/ventes/paiement";
import {Client} from "../../../../../controller/entities/contacts/client";
import {ClientService} from "../../../../../controller/services/contacts/client.service";
import { HttpClient } from "@angular/common/http";
import {Commande} from "../../../../../controller/entities/ventes/commande/commande";
import {ToasterService} from "../../../../../toaster/controller/toaster.service";

@Component({
  selector: 'app-commande-autre',
  standalone: true,
  imports: [
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    CardTextDirective,
    CardTitleDirective,
    RouterLink
  ],
  templateUrl: './commande-autre.component.html',
  styleUrl: './commande-autre.component.scss'
})
export class CommandeAutreComponent {
  private factureService = inject(FactureService)
  private router = inject(Router)
private commandeService = inject(CommandeService)
private clientService = inject(ClientService)
  public httpClient : HttpClient = inject(HttpClient);

  public set items(value :Facture[]) {
    this.factureService.items = value;
  }

  public get itemF(): Facture {
    return this.factureService.item;
  }
  public get item(): Commande {
    return this.commandeService.item;
  }
  public get returnUrl() {
    return this.commandeService.returnUrl;
  }
  public set item(value: Facture ) {
    this.factureService.item = value;
  }
  public navigateToPdfCommandeCreate() {
    this.factureService.returnUrl = this.router.url
    this.commandeService.keepData = true
    this.router.navigate(['/ventes/commande/commande/commandePdf']).then()
  }

  public navigateToFactureCommandeCreate() {
    this.factureService.returnUrl = this.router.url
    this.commandeService.keepData = true
    this.router.navigate(['/ventes/facture/facture/facturecommande']).then()
  }

  ngOnInit() {
    if (this.commandeService.keepData) {
      let taxeCreated = this.factureService.createdItemAfterReturn;
      if (taxeCreated.created) {
        this.item = taxeCreated.item
        console.log(this.item);
        this.commandeService.commandeFacture(this.item.id, taxeCreated.item.id).subscribe({
          next: () => {
            this.factureService.createdItemAfterReturn.created = false;
            this.factureService.createdItemAfterReturn.item = new Facture();
          },
        })
      }
    } else {
      this.item.client = new Client();
      this.loadClientList()
      this.fetchData()
    }

    this.commandeService.keepData = false;
  }
  protected clientList!: Client[]
  data: any;

  fetchData() {
    this.httpClient.get('https://jsonplaceholder.typicode.com/posts').subscribe((data : any ) => {
      console.log(data);
      this.data = data;
    });
  }

  loadClientList() {
    this.clientService.findAllOptimized().subscribe({
      next: data => this.clientList = data,
      error: err => console.log(err)
    })
  }




}
