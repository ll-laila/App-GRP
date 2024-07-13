import {Component, inject} from '@angular/core';
import {FactureService} from "../../../../../controller/services/ventes/facture/facture.service";
import {CommandeService} from "../../../../../controller/services/ventes/commande/commande.service";
import {Facture} from "../../../../../controller/entities/ventes/facture/facture";
import {Commande} from "../../../../../controller/entities/ventes/commande/commande";
import {CommandeProduitService} from "../../../../../controller/services/ventes/commande/commande-produit.service";
import {CommandeProduit} from "../../../../../controller/entities/ventes/commande/commande-produit";
import {FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {FactureValidator} from "../../../../../controller/validators/ventes/facture/facture.validator";
import {
  ButtonDirective,
  CardBodyComponent, CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormControlDirective,
  FormFeedbackComponent, FormLabelDirective, FormSelectDirective, InputGroupComponent,
  NavComponent,
  NavItemComponent,
  RowComponent, SpinnerComponent, TableDirective
} from "@coreui/angular";
import {ValidatorResult} from "@bshg/validation";
import {TypeRabaisEnum} from "../../../../../controller/enums/type-rabais-enum";
import {Taxe} from "../../../../../controller/entities/parametres/taxe";
import {TaxeService} from "../../../../../controller/services/parametres/taxe.service";
import {Client} from "../../../../../controller/entities/contacts/client";
import {ClientService} from "../../../../../controller/services/contacts/client.service";
import {Devises} from "../../../../../controller/entities/parametres/devises";
import {DevisesService} from "../../../../../controller/services/parametres/devises.service";
import {Produit} from "../../../../../controller/entities/produit/produit";
import {IconDirective} from "@coreui/icons-angular";
import {NgTemplateOutlet} from "@angular/common";
import {FactureProduit} from "../../../../../controller/entities/ventes/facture/facture-produit";

@Component({
  selector: 'app-facture-commande',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    NavItemComponent,
    NavComponent,
    FormFeedbackComponent,
    FormControlDirective,
    RowComponent,
    FormSelectDirective,
    ColComponent,
    InputGroupComponent,
    TableDirective,
    CardHeaderComponent,
    CardBodyComponent,
    CardComponent,
    SpinnerComponent,
    IconDirective,
    ButtonDirective,
    FormLabelDirective,
    NgTemplateOutlet
  ],
  templateUrl: './facture-commande.component.html',
  styleUrl: './facture-commande.component.scss'
})
export class FactureCommandeComponent {
  protected sending = false
  protected standAlon = true
  private factureService = inject(FactureService)

  private taxeService = inject(TaxeService)
  private commandeService = inject(CommandeService)
  private commandeProduitService = inject(CommandeProduitService)
  private clientService = inject(ClientService)
  private devisesService = inject(DevisesService)
  protected validator = FactureValidator.init(() => this.itemFacture)
  private router = inject(Router)
  protected typeRabaisEnumList = Object.values(TypeRabaisEnum)
  protected produitList!: Produit[]

  public set itemsFacture(value:Facture[]) {
    this.factureService.items = value;
  }
  reset(force = true) {
    if (force || this.itemFacture == null) this.itemFacture = new Facture()
    this.validator.reset()
  }
  public get itemFacture(): Facture {
    return this.factureService.item;
  }
  public get toReturn() {
    return this.factureService.toReturn();
  }
  public set itemFacture(value: Facture ) {
    this.factureService.item = value;
  }
  cancel() {
    this.itemFacture = new Facture();
  }


  public set itemsCommande(value: Commande[]) {
    this.commandeService.items = value;
  }
  protected taxeList!: Taxe[]
  public navigateToTaxeCreate() {
    this.taxeService.returnUrl = this.router.url
    this.factureService.keepData = true
    this.router.navigate(['/parametres/taxe/create']).then()
  }

  public navigateToClientCreate() {
    this.clientService.returnUrl = this.router.url
    this.factureService.keepData = true
    this.router.navigate(['/contacts/client/create']).then()
  }
  protected clientList!: Client[]
  public get client(): Client {
    if (this.itemFacture.client == null)
      this.itemFacture.client = new Client()
    return this.itemFacture.client;
  }

  public set client(value: Client) {
    this.itemFacture.client = value;
  }

  public get itemCommande(): Commande {
    return this.commandeService.item;
  }
  public get returnUrl() {
    return this.factureService.returnUrl;
  }
  public set itemCommande(value: Commande ) {
    this.commandeService.item = value;
  }
  public set itemsCommandeProduit(value: CommandeProduit[]) {
    this.commandeProduitService.items = value;
  }

  public get itemCommandeProduit(): CommandeProduit {
    return this.commandeProduitService.item;
  }

  public set itemCommandeProduit(value: CommandeProduit ) {
    this.commandeProduitService.item = value;
  }
  ngOnInit() {
    this.commandeService.findById(this.itemCommande.id).subscribe({
      next: data => {
        this.commandeService.item = data;
        console.log(this.commandeService.item);
      },
      error: err => console.log(err)
    });
  }

  retour() {
      this.router.navigate(['/ventes/facture/facture']).then()
  }
  create() {
    console.log(this.itemFacture)
    if (!this.validator.validate()) {
      console.log(this.validator);
      return;
    }
    this.sending = true;
    this.factureService.create().subscribe({
      next: data => {
        this.sending = false
        if (data == null) return
        this.itemFacture = data
        if (this.toReturn) {
          this.router.navigate([this.returnUrl]).then()
          return;
        }
        //this.router.navigate(["/ventes/facture/facture/factureautre"]).then()
         this.router.navigate(["/ventes/facture/facture"]).then()
      },
      error: err => {
        this.sending = false
        console.log(err)
        this.validator.import(err.error as ValidatorResult<any>[])
      }
    })
    this.router.navigate(["/ventes/facture/autre"]).then()
  }
  public get devises(): Devises {
    if (this.itemFacture.devises == null)
      this.itemFacture.devises = new Devises()
    return this.itemFacture.devises;
  }

  public set devises(value: Devises) {
    this.itemFacture.devises = value;
  }
  public navigateToDevisesCreate() {
    this.devisesService.returnUrl = this.router.url
    this.factureService.keepData = true
    this.router.navigate(['/parametres/devises/create']).then()
  }
  protected devisesList!: Devises[]
  public get taxe(): Taxe {
    if (this.itemFacture.taxe == null)
      this.itemFacture.taxe = new Taxe()
    return this.itemFacture.taxe;
  }

  public set taxe(value: Taxe) {
    this.itemFacture.taxe = value;
  }
  deleteFactureProduit(itemCommandeProduit: CommandeProduit): void {
    this.itemCommande.commandeProduit = this.itemCommande.commandeProduit?.filter(item => item !== itemCommandeProduit);
  }

}
