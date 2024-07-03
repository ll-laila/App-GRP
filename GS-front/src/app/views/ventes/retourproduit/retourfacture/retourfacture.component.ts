import {Component, inject, Input} from '@angular/core';
import {
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    ColComponent,
    FormControlDirective,
    FormFeedbackComponent,
    FormLabelDirective,
    FormSelectDirective,
    InputGroupComponent,
    NavComponent, NavItemComponent, RowComponent, SpinnerComponent, TableDirective
} from "@coreui/angular";
import {FormsModule} from "@angular/forms";
import {IconDirective} from "@coreui/icons-angular";
import {NgTemplateOutlet} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {FactureService} from "../../../../controller/services/ventes/facture/facture.service";
import {FactureProduitService} from "../../../../controller/services/ventes/facture/facture-produit.service";
import {RetourProduitService} from "../../../../controller/services/ventes/retourproduit/retour-produit.service";
import {FactureProduit} from "../../../../controller/entities/ventes/facture/facture-produit";
import {RetourProduit} from "../../../../controller/entities/ventes/retourproduit/retour-produit";
import {
  RetourProduitValidator
} from "../../../../controller/validators/ventes/retourproduit/retour-produit.validator";
import {ValidatorResult} from "@bshg/validation";
import {Client} from "../../../../controller/entities/contacts/client";
import {Entreprise} from "../../../../controller/entities/parametres/entreprise";
import {ClientService} from "../../../../controller/services/contacts/client.service";
import {EntrepriseService} from "../../../../controller/services/parametres/entreprise.service";
import {RetourProduitProduit} from "../../../../controller/entities/ventes/retourproduit/retour-produit-produit";
import {
  RetourProduitProduitService
} from "../../../../controller/services/ventes/retourproduit/retour-produit-produit.service";
import {Facture} from "../../../../controller/entities/ventes/facture/facture";
import {ToasterService} from "../../../../toaster/controller/toaster.service";

@Component({
  selector: 'app-retourfacture',
  standalone: true,
    imports: [
        ButtonDirective,
        CardBodyComponent,
        CardComponent,
        CardHeaderComponent,
        ColComponent,
        FormControlDirective,
        FormFeedbackComponent,
        FormLabelDirective,
        FormSelectDirective,
        FormsModule,
        IconDirective,
        InputGroupComponent,
        NavComponent,
        NavItemComponent,
        NgTemplateOutlet,
        RouterLink,
        RowComponent,
        SpinnerComponent,
        TableDirective
    ],
  templateUrl: './retourfacture.component.html',
  styleUrl: './retourfacture.component.scss'
})
export class RetourfactureComponent {
  private factureService = inject(FactureService)
  private factureProduitService = inject(FactureProduitService)
  private retourProduitService = inject(RetourProduitService)
  private entrepriseService = inject(EntrepriseService)
  private clientService = inject(ClientService)
  private retourProduitProduitService = inject(RetourProduitProduitService)

  private toasterService = inject(ToasterService)

  public set itemsFactureProduit(value: FactureProduit[]) {
    this.factureProduitService.items = value;
  }

  public get itemFactureProduit(): FactureProduit {

    return this.factureProduitService.item;
  }

  public set itemFactureProduit(value: FactureProduit ) {
    this.factureProduitService.item = value;
  }
  protected sending = false
  protected standAlon = true
  protected clientList!: Client[]
  protected entrepriseList!: Entreprise[]
  public get toReturn() {
    return this.retourProduitService.toReturn();
  }
  public get itemRP(): RetourProduitProduit {
    return this.retourProduitProduitService.item;
  }
  deleteretourProduitProduit(itemRP: RetourProduitProduit): void {
    this.item.retourProduitProduit = this.item.retourProduitProduit?.filter(item => item !== itemRP);
  }
  public set items(value : RetourProduit[]) {
    this.retourProduitService.items = value;
  }

  public get item(): RetourProduit {
    return this.retourProduitService.item;
  }

  public set item(value: RetourProduit ) {
    this.retourProduitService.item = value;
  }
  public get returnUrl() {
    return this.retourProduitService.returnUrl;
  }
  private router = inject(Router)

  cancel(){
    this.item = new RetourProduit();
  }
  retour(){
    this.router.navigate(['/pays/pays/list']).then()
  }
  reset(force = true) {
    if (force || this.item == null) this.item = new RetourProduit()
  }
  create() {
    console.log(this.item)
    this.sending = true;
    this.retourProduitService.create().subscribe({
      next: data => {
        this.sending = false
        if (data == null) return
        if (this.toReturn) {
          this.item = data
          this.router.navigate([this.returnUrl]).then()
          return;
        }
        this.item = new RetourProduit()
        this.router.navigate(["/ventes/retourproduit/retour-produit"]).then()
        this.toasterService.toast({message: "votre retour de produit a été effectué avec success", color: "success"})

      },
      error: err => {
        this.sending = false
        console.log(err)
      }
    })
  }
  public get client(): Client {
    if (this.item.client == null)
      this.item.client = new Client()
    return this.item.client;
  }
  public set client(value: Client ) {
    this.item.client = value;
  }
  public navigateToClientCreate() {
    this.clientService.returnUrl = this.router.url
    this.retourProduitService.keepData = true
    this.router.navigate(['/contacts/client/create']).then()
  }
  public navigateToEntrepriseCreate() {
    this.entrepriseService.returnUrl = this.router.url
    this.retourProduitService.keepData = true
    this.router.navigate(['/parametres/entreprise/create']).then()
  }

  public get entreprise(): Entreprise {
    if (this.item.entreprise == null)
      this.item.entreprise = new Entreprise()
    return this.item.entreprise;
  }
  public set entreprise(value: Entreprise ) {
    this.item.entreprise = value;
  }
  ngOnInit() {
    this.factureService.findById(this.itemF.id).subscribe({
      next: data => {
        this.factureService.item = data
      },
      error: err => console.log(err)
    })
  }
  public set itemsF(value:Facture[]) {
    this.factureService.items = value;
  }

  public get itemF(): Facture {
    return this.factureService.item;
  }

  public set itemF(value: Facture ) {
    this.factureService.item = value;
  }
}
