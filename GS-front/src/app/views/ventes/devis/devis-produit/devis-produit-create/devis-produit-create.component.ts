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


import {DevisProduitService} from "src/app/controller/services/ventes/devis/devis-produit.service";
import {DevisProduit} from "src/app/controller/entities/ventes/devis/devis-produit";
import {DevisProduitValidator} from "src/app/controller/validators/ventes/devis/devis-produit.validator";
import {ValidatorResult} from "@bshg/validation";
import {ProduitService} from "src/app/controller/services/produit/produit.service";
import {Produit} from "src/app/controller/entities/produit/produit";
import {DevisService} from "src/app/controller/services/ventes/devis/devis.service";
import {Devis} from "src/app/controller/entities/ventes/devis/devis";

@Component({
  selector: 'app-devis-produit-create',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective, NgTemplateOutlet,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, SpinnerComponent, IconDirective,
    FormCheckComponent, FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent,

  ],
  templateUrl: './devis-produit-create.component.html',
  styleUrl: './devis-produit-create.component.scss'
})
export class DevisProduitCreateComponent {
  protected sending = false
  protected standAlon = true

  @Input("getter") set setItemGetter(getter: () => DevisProduit) {
    this.itemGetter = getter
    this.standAlon = false
  }
  @Input("setter") set setItemSetter(setter: (value: DevisProduit ) => void) {
    this.itemSetter = setter
  }
  @Input("validator") set setValidator(validator: DevisProduitValidator) {
    this.validator = validator
  }

  private router = inject(Router)
  private service = inject(DevisProduitService)
  private produitService = inject(ProduitService)
  private devisService = inject(DevisService)

  protected validator = DevisProduitValidator.init(() => this.item)

  protected produitList!: Produit[]
  protected devisList!: Devis[]

  ngOnInit() {
    if(this.service.keepData) {
      let produitCreated = this.produitService.createdItemAfterReturn;
      if (produitCreated.created) {
        this.item.produit = produitCreated.item
        this.validator.produit.validate()
      }
      let devisCreated = this.devisService.createdItemAfterReturn;
      if (devisCreated.created) {
        this.item.devis = devisCreated.item
        this.validator.devis.validate()
      }
    } else { this.reset(false) }
    this.service.keepData = false

    this.loadProduitList()
    this.loadDevisList()
  }

  // LOAD DATA
  loadProduitList() {
    this.produitService.findAllOptimized().subscribe({
      next: data => this.produitList = data,
      error: err => console.log(err)
    })
  }
  loadDevisList() {
    this.devisService.findAllOptimized().subscribe({
      next: data => this.devisList = data,
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
        this.item = new DevisProduit()
        this.router.navigate(["/ventes/devis/devis-produit"]).then()
      },
      error: err => {
        this.sending = false
        console.log(err)
        this.validator.import(err.error as ValidatorResult< any>[])
      }
    })
  }

  reset(force = true) {
    if (force || this.item == null) this.item = new DevisProduit()
    this.validator.reset()
  }

  // GETTERS AND SETTERS
  public get items() {
    return this.service.items;
  }

  public set items(value) {
    this.service.items = value;
  }

  public get item(): DevisProduit {
    return this.itemGetter();
  }

  public set item(value: DevisProduit ) {
    this.itemSetter(value);
  }

  private itemGetter(): DevisProduit {
    return this.service.item;
  }

  private itemSetter(value: DevisProduit ) {
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


  public get devis(): Devis {
    if (this.item.devis == null)
      this.item.devis = new Devis()
    return this.item.devis;
  }
  public set devis(value: Devis ) {
    this.item.devis = value;
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
  public navigateToDevisCreate() {
    this.devisService.returnUrl = this.router.url
    this.service.keepData = true
    this.router.navigate(['/ventes/devis/devis/create']).then()
  }
  cancel(){
    this.item = new DevisProduit();
  }
  retour(){
    this.router.navigate(['/pays/pays/list']).then()
  }
  ////
}
