import { Component, inject, Input } from '@angular/core';
import {
  FormSelectDirective, ColComponent, FormControlDirective,
  FormFloatingDirective, FormLabelDirective, RowComponent,
  CardComponent, CardBodyComponent, CardHeaderComponent, SpinnerComponent,
  InputGroupComponent, ButtonDirective, NavComponent, NavItemComponent,
  FormCheckComponent, FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent
} from "@coreui/angular";
import {FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {IconDirective} from "@coreui/icons-angular";
import {NgTemplateOutlet} from "@angular/common";


import {FactureProduitService} from "src/app/controller/services/ventes/facture/facture-produit.service";
import {FactureProduit} from "src/app/controller/entities/ventes/facture/facture-produit";
import {FactureProduitValidator} from "src/app/controller/validators/ventes/facture/facture-produit.validator";
import {ValidatorResult} from "@bshg/validation";
import {ProduitService} from "src/app/controller/services/produit/produit.service";
import {Produit} from "src/app/controller/entities/produit/produit";
import {FactureService} from "src/app/controller/services/ventes/facture/facture.service";
import {Facture} from "src/app/controller/entities/ventes/facture/facture";

@Component({
  selector: 'app-facture-produit-create',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective, NgTemplateOutlet,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, SpinnerComponent, IconDirective,
    FormCheckComponent, FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent,

  ],
  templateUrl: './facture-produit-create.component.html',
  styleUrl: './facture-produit-create.component.scss'
})
export class FactureProduitCreateComponent {
  protected sending = false
  protected standAlon = true

  @Input("getter") set setItemGetter(getter: () => FactureProduit) {
    this.itemGetter = getter
    this.standAlon = false
  }
  @Input("setter") set setItemSetter(setter: (value: FactureProduit ) => void) {
    this.itemSetter = setter
  }
  @Input("validator") set setValidator(validator: FactureProduitValidator) {
    this.validator = validator
  }

  private router = inject(Router)
  private service = inject(FactureProduitService)
  private produitService = inject(ProduitService)
  private factureService = inject(FactureService)
  private factureProduitService = inject(FactureProduitService)

  protected validator = FactureProduitValidator.init(() => this.item)

  protected produitList!: Produit[]
  protected factureList!: Facture[]

  ngOnInit() {
    if(this.service.keepData) {
      let produitCreated = this.produitService.createdItemAfterReturn;
      if (produitCreated.created) {
        this.item.produit = produitCreated.item
        this.validator.produit.validate()
      }
      let factureCreated = this.factureService.createdItemAfterReturn;
      if (factureCreated.created) {
        this.item.facture = factureCreated.item
        this.validator.facture.validate()
      }
    } else { this.reset(false) }
    this.service.keepData = false

    this.loadProduitList()
    this.loadFactureList()
  }

  // LOAD DATA
  loadProduitList() {
    this.produitService.findAllOptimized().subscribe({
      next: data => this.produitList = data,
      error: err => console.log(err)
    })
  }
  loadFactureList() {
    this.factureService.findAllOptimized().subscribe({
      next: data => this.factureList = data,
      error: err => console.log(err)
    })
  }


  // METHODS
  create() {
    console.log(this.item)
    if (!this.validator.validate()) return;
    this.sending = true;
    this.service.create().subscribe({
      next: data => {
        this.sending = false
        if (data == null) return
        if (this.toReturn) {
          this.item = data
          this.router.navigate([this.returnUrl]).then()
          return;
        }
        this.item = new FactureProduit()
        this.router.navigate(["/ventes/facture/facture-produit"]).then()
      },
      error: err => {
        this.sending = false
        console.log(err)
        this.validator.import(err.error as ValidatorResult< any>[])
      }
    })
  }

  reset(force = true) {
    if (force || this.item == null) this.item = new FactureProduit()
    this.validator.reset()
  }

  // GETTERS AND SETTERS
  public get items() {
    return this.service.items;
  }

  public set items(value) {
    this.service.items = value;
  }

  public get item(): FactureProduit {
    return this.itemGetter();
  }

  public set item(value: FactureProduit ) {
    this.itemSetter(value);
  }

  private itemGetter(): FactureProduit {
    return this.service.item;
  }

  private itemSetter(value: FactureProduit ) {
    this.service.item = value;
  }
  calculerTotal() {
    // Appeler la méthode calculerTotal du service
    this.factureProduitService.calculerTotal(this.item).subscribe(
      (response) => {
        // Traiter la réponse si nécessaire
        console.log(response);
      },
      (error) => {
        // Gérer les erreurs
        console.error(error);
      }
    );
  }
  public get produit(): Produit {
    if (this.item.produit == null)
      this.item.produit = new Produit()
    return this.item.produit;
  }
  public set produit(value: Produit ) {
    this.item.produit = value;
  }


  public get facture(): Facture {
    if (this.item.facture == null)
      this.item.facture = new Facture()
    return this.item.facture;
  }
  public set facture(value: Facture ) {
    this.item.facture = value;
  }



  public get returnUrl() {
    return this.service.returnUrl;
  }

  public get toReturn() {
    return this.service.toReturn();
  }

  public navigateToProduitCreate() {
    this.produitService.returnUrl = this.router.url
    this.service.keepData = true
    this.router.navigate(['/produit/produit/create']).then()
  }
  public navigateToFactureCreate() {
    this.factureService.returnUrl = this.router.url
    this.service.keepData = true
    this.router.navigate(['/ventes/facture/facture/create']).then()
  }
  cancel(){
    this.item = new FactureProduit();
  }
  retour(){
    this.router.navigate(['/pays/pays/list']).then()
  }
  ////
}
