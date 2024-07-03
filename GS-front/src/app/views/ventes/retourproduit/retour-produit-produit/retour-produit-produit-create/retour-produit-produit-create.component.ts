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


import {RetourProduitProduitService} from "src/app/controller/services/ventes/retourproduit/retour-produit-produit.service";
import {RetourProduitProduit} from "src/app/controller/entities/ventes/retourproduit/retour-produit-produit";
import {RetourProduitProduitValidator} from "src/app/controller/validators/ventes/retourproduit/retour-produit-produit.validator";
import {ValidatorResult} from "@bshg/validation";
import {ProduitService} from "src/app/controller/services/produit/produit.service";
import {Produit} from "src/app/controller/entities/produit/produit";
import {RetourProduitService} from "src/app/controller/services/ventes/retourproduit/retour-produit.service";
import {RetourProduit} from "src/app/controller/entities/ventes/retourproduit/retour-produit";

@Component({
  selector: 'app-retour-produit-produit-create',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective, NgTemplateOutlet,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, SpinnerComponent, IconDirective,
    FormCheckComponent, FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent,

  ],
  templateUrl: './retour-produit-produit-create.component.html',
  styleUrl: './retour-produit-produit-create.component.scss'
})
export class RetourProduitProduitCreateComponent {
  protected sending = false
  protected standAlon = true

  @Input("getter") set setItemGetter(getter: () => RetourProduitProduit) {
    this.itemGetter = getter
    this.standAlon = false
  }
  @Input("setter") set setItemSetter(setter: (value: RetourProduitProduit ) => void) {
    this.itemSetter = setter
  }
  @Input("validator") set setValidator(validator: RetourProduitProduitValidator) {
    this.validator = validator
  }

  private router = inject(Router)
  private service = inject(RetourProduitProduitService)
  private produitService = inject(ProduitService)
  private retourProduitService = inject(RetourProduitService)

  protected validator = RetourProduitProduitValidator.init(() => this.item)

  protected produitList!: Produit[]
  protected retourProduitList!: RetourProduit[]

  ngOnInit() {
    if(this.service.keepData) {
      let produitCreated = this.produitService.createdItemAfterReturn;
      if (produitCreated.created) {
        this.item.produit = produitCreated.item
        this.validator.produit.validate()
      }
      let retourProduitCreated = this.retourProduitService.createdItemAfterReturn;
      if (retourProduitCreated.created) {
        this.item.retourProduit = retourProduitCreated.item
        this.validator.retourProduit.validate()
      }
    } else { this.reset(false) }
    this.service.keepData = false

    this.loadProduitList()
    this.loadRetourProduitList()
  }

  // LOAD DATA
  loadProduitList() {
    this.produitService.findAllOptimized().subscribe({
      next: data => this.produitList = data,
      error: err => console.log(err)
    })
  }
  loadRetourProduitList() {
    this.retourProduitService.findAllOptimized().subscribe({
      next: data => this.retourProduitList = data,
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
        this.item = new RetourProduitProduit()
        this.router.navigate(["/ventes/retourproduit/retour-produit-produit"]).then()
      },
      error: err => {
        this.sending = false
        console.log(err)
        this.validator.import(err.error as ValidatorResult< any>[])
      }
    })
  }

  reset(force = true) {
    if (force || this.item == null) this.item = new RetourProduitProduit()
    this.validator.reset()
  }

  // GETTERS AND SETTERS
  public get items() {
    return this.service.items;
  }

  public set items(value) {
    this.service.items = value;
  }

  public get item(): RetourProduitProduit {
    return this.itemGetter();
  }

  public set item(value: RetourProduitProduit ) {
    this.itemSetter(value);
  }

  private itemGetter(): RetourProduitProduit {
    return this.service.item;
  }

  private itemSetter(value: RetourProduitProduit ) {
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


  public get retourProduit(): RetourProduit {
    if (this.item.retourProduit == null)
      this.item.retourProduit = new RetourProduit()
    return this.item.retourProduit;
  }
  public set retourProduit(value: RetourProduit ) {
    this.item.retourProduit = value;
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
  public navigateToRetourProduitCreate() {
    this.retourProduitService.returnUrl = this.router.url
    this.service.keepData = true
    this.router.navigate(['/ventes/retourproduit/retour-produit/create']).then()
  }
  cancel(){
    this.item = new RetourProduitProduit();
  }
  retour(){
    this.router.navigate(['/pays/pays/list']).then()
  }
  ////
}
