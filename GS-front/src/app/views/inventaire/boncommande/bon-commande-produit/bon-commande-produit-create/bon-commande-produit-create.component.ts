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


import {BonCommandeProduitService} from "src/app/controller/services/inventaire/boncommande/bon-commande-produit.service";
import {BonCommandeProduit} from "src/app/controller/entities/inventaire/boncommande/bon-commande-produit";
import {BonCommandeProduitValidator} from "src/app/controller/validators/inventaire/boncommande/bon-commande-produit.validator";
import {ValidatorResult} from "@bshg/validation";
import {ProduitService} from "src/app/controller/services/produit/produit.service";
import {Produit} from "src/app/controller/entities/produit/produit";
import {BonCommandeService} from "src/app/controller/services/inventaire/boncommande/bon-commande.service";
import {BonCommande} from "src/app/controller/entities/inventaire/boncommande/bon-commande";

@Component({
  selector: 'app-bon-commande-produit-create',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective, NgTemplateOutlet,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, SpinnerComponent, IconDirective,
    FormCheckComponent, FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent,

  ],
  templateUrl: './bon-commande-produit-create.component.html',
  styleUrl: './bon-commande-produit-create.component.scss'
})
export class BonCommandeProduitCreateComponent {
  protected sending = false
  protected standAlon = true

  @Input("getter") set setItemGetter(getter: () => BonCommandeProduit) {
    this.itemGetter = getter
    this.standAlon = false
  }
  @Input("setter") set setItemSetter(setter: (value: BonCommandeProduit ) => void) {
    this.itemSetter = setter
  }
  @Input("validator") set setValidator(validator: BonCommandeProduitValidator) {
    this.validator = validator
  }

  private router = inject(Router)
  private service = inject(BonCommandeProduitService)
  private produitService = inject(ProduitService)
  private bonCommandeService = inject(BonCommandeService)

  protected validator = BonCommandeProduitValidator.init(() => this.item)

  protected produitList!: Produit[]
  protected bonCommandeList!: BonCommande[]

  ngOnInit() {
    if(this.service.keepData) {
      let produitCreated = this.produitService.createdItemAfterReturn;
      if (produitCreated.created) {
        this.item.produit = produitCreated.item
        this.validator.produit.validate()
      }
      let bonCommandeCreated = this.bonCommandeService.createdItemAfterReturn;
      if (bonCommandeCreated.created) {
        this.item.bonCommande = bonCommandeCreated.item
        this.validator.bonCommande.validate()
      }
    } else { this.reset(false) }
    this.service.keepData = false

    this.loadProduitList()
    this.loadBonCommandeList()
  }

  // LOAD DATA
  loadProduitList() {
    this.produitService.findAllOptimized().subscribe({
      next: data => this.produitList = data,
      error: err => console.log(err)
    })
  }
  loadBonCommandeList() {
    this.bonCommandeService.findAllOptimized().subscribe({
      next: data => this.bonCommandeList = data,
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
        this.item = new BonCommandeProduit()
        this.router.navigate(["/inventaire/boncommande/bon-commande-produit"]).then()
      },
      error: err => {
        this.sending = false
        console.log(err)
        this.validator.import(err.error as ValidatorResult< any>[])
      }
    })
  }

  reset(force = true) {
    if (force || this.item == null) this.item = new BonCommandeProduit()
    this.validator.reset()
  }

  // GETTERS AND SETTERS
  public get items() {
    return this.service.items;
  }

  public set items(value) {
    this.service.items = value;
  }

  public get item(): BonCommandeProduit {
    return this.itemGetter();
  }

  public set item(value: BonCommandeProduit ) {
    this.itemSetter(value);
  }

  private itemGetter(): BonCommandeProduit {
    return this.service.item;
  }

  private itemSetter(value: BonCommandeProduit ) {
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


  public get bonCommande(): BonCommande {
    if (this.item.bonCommande == null)
      this.item.bonCommande = new BonCommande()
    return this.item.bonCommande;
  }
  public set bonCommande(value: BonCommande ) {
    this.item.bonCommande = value;
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
  public navigateToBonCommandeCreate() {
    this.bonCommandeService.returnUrl = this.router.url
    this.service.keepData = true
    this.router.navigate(['/inventaire/boncommande/bon-commande/create']).then()
  }
  cancel(){
    this.item = new BonCommandeProduit();
  }
  retour(){
    this.router.navigate(['/inventaire/boncommande/bon-commande/list']).then()
  }
  ////
}
