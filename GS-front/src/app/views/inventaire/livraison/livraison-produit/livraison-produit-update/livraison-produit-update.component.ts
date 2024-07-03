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

@Component({
  selector: 'app-livraison-produit-update',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent, NgTemplateOutlet,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, FormCheckComponent, SpinnerComponent,
    FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent, IconDirective,

  ],
  templateUrl: './livraison-produit-update.component.html',
  styleUrl: './livraison-produit-update.component.scss'
})
export class LivraisonProduitUpdateComponent {
  protected isPartOfUpdateForm = false // true if it is used as part of other update component
  protected sending = false
  protected resetting = false
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

  ngAfterContentInit() {
    if (!this.isPartOfUpdateForm && this.item.id == null) this.router.navigate(["/inventaire/livraison/livraison-produit"]).then()
  }

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
    } else { this.validator.reset() }

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
  update() {
    console.log(this.item)
    if (!this.validator.validate()) return;
    this.sending = true;
    this.service.update().subscribe({
      next: data => {
        this.sending = false
        if (data == null) return
        this.router.navigate(["/inventaire/livraison/livraison-produit"]).then()
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



  public navigateToProduitCreate() {
    this.produitService.returnUrl = this.router.url
    this.router.navigate(['/produit/produit/create']).then()
  }
  public navigateToLivraisonCreate() {
    this.livraisonService.returnUrl = this.router.url
    this.router.navigate(['/inventaire/livraison/livraison/create']).then()
  }
  cancel(){
    this.item = new LivraisonProduit();
  }


  ////
}
