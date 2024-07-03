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
import {ValidatorResult} from "@bshg/validation";
import {ProduitService} from "src/app/controller/services/produit/produit.service";
import {Produit} from "src/app/controller/entities/produit/produit";
import {CommandeService} from "src/app/controller/services/ventes/commande/commande.service";
import {Commande} from "src/app/controller/entities/ventes/commande/commande";

@Component({
  selector: 'app-commande-produit-create',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective, NgTemplateOutlet,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, SpinnerComponent, IconDirective,
    FormCheckComponent, FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent,

  ],
  templateUrl: './commande-produit-create.component.html',
  styleUrl: './commande-produit-create.component.scss'
})
export class CommandeProduitCreateComponent {
  protected sending = false
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
    } else { this.reset(false) }
    this.service.keepData = false

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
        this.item = new CommandeProduit()
        this.router.navigate(["/ventes/commande/commande-produit"]).then()
      },
      error: err => {
        this.sending = false
        console.log(err)
        this.validator.import(err.error as ValidatorResult< any>[])
      }
    })
  }

  reset(force = true) {
    if (force || this.item == null) this.item = new CommandeProduit()
    this.validator.reset()
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
  public navigateToCommandeCreate() {
    this.commandeService.returnUrl = this.router.url
    this.service.keepData = true
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
