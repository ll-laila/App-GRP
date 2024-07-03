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
import {ProduitService} from "src/app/controller/services/produit/produit.service";
import {Produit} from "src/app/controller/entities/produit/produit";
import {FactureService} from "src/app/controller/services/ventes/facture/facture.service";
import {Facture} from "src/app/controller/entities/ventes/facture/facture";

@Component({
  selector: 'app-facture-produit-update',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent, NgTemplateOutlet,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, FormCheckComponent, SpinnerComponent,
    FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent, IconDirective,

  ],
  templateUrl: './facture-produit-update.component.html',
  styleUrl: './facture-produit-update.component.scss'
})
export class FactureProduitUpdateComponent {
  protected isPartOfUpdateForm = false // true if it is used as part of other update component
  protected sending = false
  protected resetting = false
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

  protected validator = FactureProduitValidator.init(() => this.item)

  protected produitList!: Produit[]
  protected factureList!: Facture[]

  ngAfterContentInit() {
    if (!this.isPartOfUpdateForm && this.item.id == null) this.router.navigate(["/ventes/facture/facture-produit"]).then()
  }

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
    } else { this.validator.reset() }

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
  update() {
    console.log(this.item)
    if (!this.validator.validate()) return;
    this.sending = true;
    this.service.update().subscribe({
      next: data => {
        this.sending = false
        if (data == null) return
        this.router.navigate(["/ventes/facture/facture-produit"]).then()
      },
      error: err => {
        this.sending = false
        console.log(err)
      }
    })
  }

  reset() {
    this.resetting = true
    this.service.findById(this.item.id).subscribe({
      next: value => {
        this.item = value
        this.validator.reset()
        this.resetting = false
      },
      error: err => {
        console.log(err)
        this.resetting = false
      }
    })
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



  public navigateToProduitCreate() {
    this.produitService.returnUrl = this.router.url
    this.router.navigate(['/produit/produit/create']).then()
  }
  public navigateToFactureCreate() {
    this.factureService.returnUrl = this.router.url
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
