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


import {CommandeProduitService} from "src/app/controller/services/ventes/commande/commande-produit.service";
import {CommandeProduit} from "src/app/controller/entities/ventes/commande/commande-produit";
import {CommandeProduitValidator} from "src/app/controller/validators/ventes/commande/commande-produit.validator";
import {ProduitService} from "src/app/controller/services/produit/produit.service";
import {Produit} from "src/app/controller/entities/produit/produit";
import {CommandeService} from "src/app/controller/services/ventes/commande/commande.service";
import {Commande} from "src/app/controller/entities/ventes/commande/commande";

@Component({
  selector: 'app-commande-produit-update',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent, NgTemplateOutlet,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, FormCheckComponent, SpinnerComponent,
    FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent, IconDirective,

  ],
  templateUrl: './commande-produit-update.component.html',
  styleUrl: './commande-produit-update.component.scss'
})
export class CommandeProduitUpdateComponent {
  protected isPartOfUpdateForm = false // true if it is used as part of other update component
  protected sending = false
  protected resetting = false
  protected standAlon = true

  @Input("getter") set setItemGetter(getter: () => CommandeProduit) {
    this.itemGetter = getter
    this.standAlon = false
  }
  @Input("setter") set setItemSetter(setter: (value: CommandeProduit ) => void) {
    this.itemSetter = setter
  }
  @Input("validator") set setValidator(validator: CommandeProduitValidator) {
    this.validator = validator
  }

  private router = inject(Router)
  private service = inject(CommandeProduitService)
  private produitService = inject(ProduitService)
  private commandeService = inject(CommandeService)

  protected validator = CommandeProduitValidator.init(() => this.item)

  protected produitList!: Produit[]
  protected commandeList!: Commande[]

  ngAfterContentInit() {
    if (!this.isPartOfUpdateForm && this.item.id == null) this.router.navigate(["/ventes/commande/commande-produit"]).then()
  }

  ngOnInit() {
    if(this.service.keepData) {
      let produitCreated = this.produitService.createdItemAfterReturn;
      if (produitCreated.created) {
        this.item.produit = produitCreated.item
        this.validator.produit.validate()
      }
      let commandeCreated = this.commandeService.createdItemAfterReturn;
      if (commandeCreated.created) {
        this.item.commande = commandeCreated.item
        this.validator.commande.validate()
      }
    } else { this.validator.reset() }

    this.loadProduitList()
    this.loadCommandeList()
  }

  // LOAD DATA
  loadProduitList() {
    this.produitService.findAllOptimized().subscribe({
      next: data => this.produitList = data,
      error: err => console.log(err)
    })
  }
  loadCommandeList() {
    this.commandeService.findAllOptimized().subscribe({
      next: data => this.commandeList = data,
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
        this.router.navigate(["/ventes/commande/commande-produit"]).then()
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

  public get item(): CommandeProduit {
    return this.itemGetter();
  }

  public set item(value: CommandeProduit ) {
    this.itemSetter(value);
  }

  private itemGetter(): CommandeProduit {
    return this.service.item;
  }

  private itemSetter(value: CommandeProduit ) {
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


  public get commande(): Commande {
    if (this.item.commande == null)
      this.item.commande = new Commande()
    return this.item.commande;
  }
  public set commande(value: Commande ) {
    this.item.commande = value;
  }



  public navigateToProduitCreate() {
    this.produitService.returnUrl = this.router.url
    this.router.navigate(['/produit/produit/create']).then()
  }
  public navigateToCommandeCreate() {
    this.commandeService.returnUrl = this.router.url
    this.router.navigate(['/ventes/commande/commande/create']).then()
  }
  cancel(){
    this.item = new CommandeProduit();
  }
  retour(){
    this.router.navigate(['/pays/pays/list']).then()
  }
  ////
}
