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
import {ProduitService} from "src/app/controller/services/produit/produit.service";
import {Produit} from "src/app/controller/entities/produit/produit";
import {DevisService} from "src/app/controller/services/ventes/devis/devis.service";
import {Devis} from "src/app/controller/entities/ventes/devis/devis";

@Component({
  selector: 'app-devis-produit-update',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent, NgTemplateOutlet,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, FormCheckComponent, SpinnerComponent,
    FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent, IconDirective,

  ],
  templateUrl: './devis-produit-update.component.html',
  styleUrl: './devis-produit-update.component.scss'
})
export class DevisProduitUpdateComponent {
  protected isPartOfUpdateForm = false // true if it is used as part of other update component
  protected sending = false
  protected resetting = false
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

  ngAfterContentInit() {
    if (!this.isPartOfUpdateForm && this.item.id == null) this.router.navigate(["/ventes/devis/devis-produit"]).then()
  }

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
    } else { this.validator.reset() }

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
  update() {
    console.log(this.item)
    if (!this.validator.validate()) return;
    this.sending = true;
    this.service.update().subscribe({
      next: data => {
        this.sending = false
        if (data == null) return
        this.router.navigate(["/ventes/devis/devis-produit"]).then()
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



  public navigateToProduitCreate() {
    this.produitService.returnUrl = this.router.url
    this.router.navigate(['/produit/produit/create']).then()
  }
  public navigateToDevisCreate() {
    this.devisService.returnUrl = this.router.url
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
