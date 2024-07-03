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


import {ProduitService} from "src/app/controller/services/produit/produit.service";
import {Produit} from "src/app/controller/entities/produit/produit";
import {ProduitValidator} from "src/app/controller/validators/produit/produit.validator";
import {NiveauStockService} from "src/app/controller/services/inventaire/niveau-stock.service";
import {NiveauStock} from "src/app/controller/entities/inventaire/niveau-stock";
import {DevisesService} from "src/app/controller/services/parametres/devises.service";
import {Devises} from "src/app/controller/entities/parametres/devises";
import {TaxeService} from "src/app/controller/services/parametres/taxe.service";
import {Taxe} from "src/app/controller/entities/parametres/taxe";
import {ProduitNiveauPrixService} from "src/app/controller/services/produit/produit-niveau-prix.service";
import {ProduitNiveauPrix} from "src/app/controller/entities/produit/produit-niveau-prix";


import {EstimationProduit} from "src/app/controller/entities/ventes/estimation/estimation-produit";
import {CommandeProduitService} from "src/app/controller/services/ventes/commande/commande-produit.service";
import {CommandeProduit} from "src/app/controller/entities/ventes/commande/commande-produit";
import {FactureProduitService} from "src/app/controller/services/ventes/facture/facture-produit.service";
import {FactureProduit} from "src/app/controller/entities/ventes/facture/facture-produit";
import {DevisProduitService} from "src/app/controller/services/ventes/devis/devis-produit.service";
import {DevisProduit} from "src/app/controller/entities/ventes/devis/devis-produit";
import {RetourProduitProduitService} from "src/app/controller/services/ventes/retourproduit/retour-produit-produit.service";
import {RetourProduitProduit} from "src/app/controller/entities/ventes/retourproduit/retour-produit-produit";
import {NoteCreditProduit} from "src/app/controller/entities/ventes/notecredit/note-credit-produit";

import {RemboursementProduit} from "src/app/controller/entities/ventes/remboursement/remboursement-produit";
import {BonCommandeProduitService} from "src/app/controller/services/inventaire/boncommande/bon-commande-produit.service";
import {BonCommandeProduit} from "src/app/controller/entities/inventaire/boncommande/bon-commande-produit";
import {LivraisonProduitService} from "src/app/controller/services/inventaire/livraison/livraison-produit.service";
import {LivraisonProduit} from "src/app/controller/entities/inventaire/livraison/livraison-produit";
import {FournisseurService} from "src/app/controller/services/contacts/fournisseur.service";
import {Fournisseur} from "src/app/controller/entities/contacts/fournisseur";
import {EntrepriseService} from "src/app/controller/services/parametres/entreprise.service";
import {Entreprise} from "src/app/controller/entities/parametres/entreprise";
import {NiveauStockUpdateComponent} from "src/app/views/inventaire/niveau-stock/niveau-stock-update/niveau-stock-update.component";
import {NiveauStockValidator} from "src/app/controller/validators/inventaire/niveau-stock.validator";

@Component({
  selector: 'app-produit-update',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent, NgTemplateOutlet,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, FormCheckComponent, SpinnerComponent,
    FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent, IconDirective,
    NiveauStockUpdateComponent,
  ],
  templateUrl: './produit-update.component.html',
  styleUrl: './produit-update.component.scss'
})
export class ProduitUpdateComponent {
  protected isPartOfUpdateForm = false // true if it is used as part of other update component
  protected sending = false
  protected resetting = false
  protected standAlon = true

  @Input("getter") set setItemGetter(getter: () => Produit) {
    this.itemGetter = getter
    this.standAlon = false
  }
  @Input("setter") set setItemSetter(setter: (value: Produit ) => void) {
    this.itemSetter = setter
  }
  @Input("validator") set setValidator(validator: ProduitValidator) {
    this.validator = validator
  }

  private router = inject(Router)
  private service = inject(ProduitService)
  private devisesService = inject(DevisesService)
  private taxeService = inject(TaxeService)
  private fournisseurService = inject(FournisseurService)
  private entrepriseService = inject(EntrepriseService)

  protected validator = ProduitValidator.init(() => this.item)
  //  .setNiveauStock(NiveauStockValidator.init(() => this.niveauStock))

  protected devisesList!: Devises[]
  protected taxeList!: Taxe[]
  protected fournisseurList!: Fournisseur[]
  protected entrepriseList!: Entreprise[]

  ngAfterContentInit() {
    if (!this.isPartOfUpdateForm && this.item.id == null) this.router.navigate(["/produit/produit"]).then()
  }

  ngOnInit() {
    if(this.service.keepData) {
      let devisesCreated = this.devisesService.createdItemAfterReturn;
      if (devisesCreated.created) {
        this.item.devises = devisesCreated.item
        this.validator.devises.validate()
      }
      let taxeCreated = this.taxeService.createdItemAfterReturn;
      if (taxeCreated.created) {
        this.item.taxe = taxeCreated.item
        this.validator.taxe.validate()
      }
      let fournisseurCreated = this.fournisseurService.createdItemAfterReturn;
      if (fournisseurCreated.created) {
        this.item.fournisseur = fournisseurCreated.item
        this.validator.fournisseur.validate()
      }

    } else { this.validator.reset() }

    this.loadDevisesList()
    this.loadTaxeList()
    this.loadFournisseurList()
    this.loadEntrepriseList()
  }

  // LOAD DATA
  loadDevisesList() {
    this.devisesService.findAllOptimized().subscribe({
      next: data => this.devisesList = data,
      error: err => console.log(err)
    })
  }
  loadTaxeList() {
    this.taxeService.findAllOptimized().subscribe({
      next: data => this.taxeList = data,
      error: err => console.log(err)
    })
  }
  loadFournisseurList() {
    this.fournisseurService.findAllOptimized().subscribe({
      next: data => this.fournisseurList = data,
      error: err => console.log(err)
    })
  }
  loadEntrepriseList() {
    this.entrepriseService.findAllOptimized().subscribe({
      next: data => this.entrepriseList = data,
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
        this.router.navigate(["/produit/produit"]).then()
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

  public get item(): Produit {
    return this.itemGetter();
  }

  public set item(value: Produit ) {
    this.itemSetter(value);
  }

  private itemGetter(): Produit {
    return this.service.item;
  }

  private itemSetter(value: Produit ) {
    this.service.item = value;
  }

  public get niveauStock(): NiveauStock {
    if (this.item.niveauStock == null)
      this.item.niveauStock = new NiveauStock()
    return this.item.niveauStock;
  }
  public set niveauStock(value: NiveauStock ) {
    this.item.niveauStock = value;
  }

  protected niveauStockGetter = () => this.niveauStock;
  protected niveauStockSetter = (value: NiveauStock ) => this.niveauStock = value;

  public get devises(): Devises {
    if (this.item.devises == null)
      this.item.devises = new Devises()
    return this.item.devises;
  }
  public set devises(value: Devises ) {
    this.item.devises = value;
  }


  public get taxe(): Taxe {
    if (this.item.taxe == null)
      this.item.taxe = new Taxe()
    return this.item.taxe;
  }
  public set taxe(value: Taxe ) {
    this.item.taxe = value;
  }


  public get fournisseur(): Fournisseur {
    if (this.item.fournisseur == null)
      this.item.fournisseur = new Fournisseur()
    return this.item.fournisseur;
  }
  public set fournisseur(value: Fournisseur ) {
    this.item.fournisseur = value;
  }


  public get entreprise(): Entreprise {
    if (this.item.entreprise == null)
      this.item.entreprise = new Entreprise()
    return this.item.entreprise;
  }
  public set entreprise(value: Entreprise ) {
    this.item.entreprise = value;
  }



  public navigateToDevisesCreate() {
    this.devisesService.returnUrl = this.router.url
    this.router.navigate(['/parametres/devises/create']).then()
  }
  public navigateToTaxeCreate() {
    this.taxeService.returnUrl = this.router.url
    this.router.navigate(['/parametres/taxe/create']).then()
  }
  public navigateToFournisseurCreate() {
    this.fournisseurService.returnUrl = this.router.url
    this.router.navigate(['/contacts/fournisseur/create']).then()
  }
  public navigateToEntrepriseCreate() {
    this.entrepriseService.returnUrl = this.router.url
    this.router.navigate(['/parametres/entreprise/create']).then()
  }
  cancel(){
    this.item = new Produit();
  }
  retour(){
    this.router.navigate(['/pays/pays/list']).then()
  }

  ////
}
