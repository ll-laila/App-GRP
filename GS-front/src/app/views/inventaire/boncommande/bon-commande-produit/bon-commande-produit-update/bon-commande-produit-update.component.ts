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
import {ProduitService} from "src/app/controller/services/produit/produit.service";
import {Produit} from "src/app/controller/entities/produit/produit";
import {BonCommandeService} from "src/app/controller/services/inventaire/boncommande/bon-commande.service";
import {BonCommande} from "src/app/controller/entities/inventaire/boncommande/bon-commande";

@Component({
  selector: 'app-bon-commande-produit-update',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent, NgTemplateOutlet,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, FormCheckComponent, SpinnerComponent,
    FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent, IconDirective,

  ],
  templateUrl: './bon-commande-produit-update.component.html',
  styleUrl: './bon-commande-produit-update.component.scss'
})
export class BonCommandeProduitUpdateComponent {
  protected isPartOfUpdateForm = false // true if it is used as part of other update component
  protected sending = false
  protected resetting = false
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

  ngAfterContentInit() {
    if (!this.isPartOfUpdateForm && this.item.id == null) this.router.navigate(["/inventaire/boncommande/bon-commande-produit"]).then()
  }

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
    } else { this.validator.reset() }

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
  update() {
    console.log(this.item)
    if (!this.validator.validate()) return;
    this.sending = true;
    this.service.update().subscribe({
      next: data => {
        this.sending = false
        if (data == null) return
        this.router.navigate(["/inventaire/boncommande/bon-commande-produit"]).then()
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



  public navigateToProduitCreate() {
    this.produitService.returnUrl = this.router.url
    this.router.navigate(['/produit/produit/create']).then()
  }
  public navigateToBonCommandeCreate() {
    this.bonCommandeService.returnUrl = this.router.url
    this.router.navigate(['/inventaire/boncommande/bon-commande/create']).then()
  }
  cancel(){
    this.item = new BonCommandeProduit();
  }

  ////
}
