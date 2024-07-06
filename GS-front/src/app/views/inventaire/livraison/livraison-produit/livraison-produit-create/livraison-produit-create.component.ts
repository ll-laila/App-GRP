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


import {LivraisonProduitService} from "src/app/controller/services/inventaire/livraison/livraison-produit.service";
import {LivraisonProduit} from "src/app/controller/entities/inventaire/livraison/livraison-produit";
import {LivraisonProduitValidator} from "src/app/controller/validators/inventaire/livraison/livraison-produit.validator";
import {ProduitService} from "src/app/controller/services/produit/produit.service";
import {Produit} from "src/app/controller/entities/produit/produit";
import {LivraisonService} from "src/app/controller/services/inventaire/livraison/livraison.service";
import {Livraison} from "src/app/controller/entities/inventaire/livraison/livraison";
import {ValidatorResult} from "@bshg/validation";

@Component({
  selector: 'app-livraison-produit-create',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective, NgTemplateOutlet,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, SpinnerComponent, IconDirective,
    FormCheckComponent, FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent,

  ],
  templateUrl: './livraison-produit-create.component.html',
  styleUrl: './livraison-produit-create.component.scss'
})
export class LivraisonProduitCreateComponent {
  protected sending = false
  protected standAlon = true

  @Input("getter") set setItemGetter(getter: () => LivraisonProduit) {
    this.itemGetter = getter
    this.standAlon = false
  }
  @Input("setter") set setItemSetter(setter: (value: LivraisonProduit ) => void) {
    this.itemSetter = setter
  }
  @Input("validator") set setValidator(validator: LivraisonProduitValidator) {
    this.validator = validator
  }

  private router = inject(Router)
  private service = inject(LivraisonProduitService)
  private produitService = inject(ProduitService)
  private livraisonService = inject(LivraisonService)

  protected validator = LivraisonProduitValidator.init(() => this.item)

  protected produitList!: Produit[]
  protected livraisonList!: Livraison[]

  ngOnInit() {
    if(this.service.keepData) {
      let produitCreated = this.produitService.createdItemAfterReturn;
      if (produitCreated.created) {
        this.item.produit = produitCreated.item
        this.validator.produit.validate()
      }
      let livraisonCreated = this.livraisonService.createdItemAfterReturn;
      if (livraisonCreated.created) {
        this.item.livraison = livraisonCreated.item
        this.validator.livraison.validate()
      }
    } else { this.reset(false) }
    this.service.keepData = false

    this.loadProduitList()
    this.loadLivraisonList()
  }

  // LOAD DATA
  loadProduitList() {
    this.produitService.findAllOptimized().subscribe({
      next: data => this.produitList = data,
      error: err => console.log(err)
    })
  }
  loadLivraisonList() {
    this.livraisonService.findAllOptimized().subscribe({
      next: data => this.livraisonList = data,
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
        console.log("this one :"+this.item);

        this.item = new LivraisonProduit()
        this.router.navigate(["/inventaire/livraison/livraison-produit"]).then()
      },
      error: err => {
        this.sending = false
        console.log(err)
        this.validator.import(err.error as ValidatorResult< any>[])
      }
    })
  }

  reset(force = true) {
    if (force || this.item == null) this.item = new LivraisonProduit()
    this.validator.reset()
  }

  // GETTERS AND SETTERS
  public get items() {
    return this.service.items;
  }

  public set items(value) {
    this.service.items = value;
  }

  public get item(): LivraisonProduit {
    return this.itemGetter();
  }

  public set item(value: LivraisonProduit ) {
    this.itemSetter(value);
  }

  private itemGetter(): LivraisonProduit {
    return this.service.item;
  }

  private itemSetter(value: LivraisonProduit ) {
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


  public get livraison(): Livraison {
    if (this.item.livraison == null)
      this.item.livraison = new Livraison()
    return this.item.livraison;
  }
  public set livraison(value: Livraison ) {
    this.item.livraison = value;
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
  public navigateToLivraisonCreate() {
    this.livraisonService.returnUrl = this.router.url
    this.service.keepData = true
    this.router.navigate(['/inventaire/livraison/livraison/create']).then()
  }
  cancel(){
    this.item = new LivraisonProduit();
  }

  retour(){
    this.router.navigate(['/pays/pays/list']).then()
  }

  ////
}
