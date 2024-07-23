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
import {ValidatorResult} from "@bshg/validation";
import {NiveauStockService} from "src/app/controller/services/inventaire/niveau-stock.service";
import {NiveauStock} from "src/app/controller/entities/inventaire/niveau-stock";
import {DevisesService} from "src/app/controller/services/parametres/devises.service";
import {Devises} from "src/app/controller/entities/parametres/devises";
import {TaxeService} from "src/app/controller/services/parametres/taxe.service";
import {Taxe} from "src/app/controller/entities/parametres/taxe";
import {ProduitNiveauPrixService} from "src/app/controller/services/produit/produit-niveau-prix.service";
import {ProduitNiveauPrix} from "src/app/controller/entities/produit/produit-niveau-prix";

import {FournisseurService} from "src/app/controller/services/contacts/fournisseur.service";
import {Fournisseur} from "src/app/controller/entities/contacts/fournisseur";
import {EntrepriseService} from "src/app/controller/services/parametres/entreprise.service";
import {Entreprise} from "src/app/controller/entities/parametres/entreprise";
import {NiveauStockCreateComponent} from "src/app/views/inventaire/niveau-stock/niveau-stock-create/niveau-stock-create.component";
import {NiveauStockValidator} from "src/app/controller/validators/inventaire/niveau-stock.validator";
import {NiveauPrixService} from "../../../../controller/services/parametres/niveau-prix.service";
import {StatutNiveauPrixEnum} from "../../../../controller/enums/statut-niveau-prix-enum";
import {ToasterService} from "../../../../toaster/controller/toaster.service";
import {EntrepriseSelectedService} from "../../../../controller/shared/entreprise-selected.service";

@Component({
  selector: 'app-produit-create',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective, NgTemplateOutlet,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, SpinnerComponent, IconDirective,
    FormCheckComponent, FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent,
    NiveauStockCreateComponent,
  ],
  templateUrl: './produit-create.component.html',
  styleUrl: './produit-create.component.scss'
})
export class ProduitCreateComponent {
  protected sending = false
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
  private niveauPrixService = inject(NiveauPrixService)
  private toasterService = inject(ToasterService)
  private entrepriseSelectedService = inject(EntrepriseSelectedService);

  protected validator = ProduitValidator.init(() => this.item)

  protected devisesList!: Devises[]
  protected taxeList!: Taxe[]
  protected fournisseurList!: Fournisseur[]
  protected entrepriseList!: Entreprise[]

  ngOnInit() {

    this.loadEntreprise();

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

    } else { this.reset(false) }
    this.service.keepData = false
    this.item.niveauStock = new NiveauStock()

    this.niveauPrixService.findAll().subscribe({
      next: value => {
        this.item.produitNiveauPrix = value.map(item => {
          let inst = new ProduitNiveauPrix()
          inst.niveauPrix = item
          return inst
        })
      }
    })

    this.loadDevisesList()
    this.loadTaxeList()
    this.loadFournisseurList()
    this.loadEntrepriseList()
  }

  // LOAD DATA


  loadEntreprise() {
    this.entrepriseService.findById(this.entrepriseSelectedService.getEntrepriseSelected()).subscribe({
      next: entreprise => {
        this.item.entreprise = entreprise;
        console.log("entre :",this.item.entreprise);
      },
      error: err => console.log(err)
    });
  }

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
    this.fournisseurService.getFournisseurs(this.entrepriseSelectedService.getEntrepriseSelected()).subscribe({
      next: data => {
        this.fournisseurList = data;
      },
      error: err => console.log(err)
    })
  }

  loadEntrepriseList() {
    this.entrepriseService.findAllOptimized().subscribe({
      next: data => this.entrepriseList = data,
      error: err => console.log(err)
    })
  }
  create() {
    this.item.disponible = this.item.niveauStockInitial;
    console.log(this.item)
    if (!this.validator.validate()) {
      console.log(this.validator);
      return;
    }
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
        this.item = new Produit()
        this.router.navigate(["/produit/produit"]).then()
        this.toasterService.toast({message: "Un nouveau produit a été ajouté", color: "success"})

      },
      error: err => {
        this.sending = false
        console.log(err)
        this.validator.import(err.error as ValidatorResult< any>[])
      }
    })
  }

  reset(force = true) {
    if (force || this.item == null) this.item = new Produit()
    this.validator.reset()
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



  public get returnUrl() {
    return this.service.returnUrl;
  }

  public get toReturn() {
    return this.service.toReturn();
  }

  public navigateToDevisesCreate() {
    this.devisesService.returnUrl = this.router.url
    this.service.keepData = true
    this.router.navigate(['/parametres/devises/create']).then()
  }
  public navigateToTaxeCreate() {
    this.taxeService.returnUrl = this.router.url
    this.service.keepData = true
    this.router.navigate(['/parametres/taxe/create']).then()
  }
  public navigateToFournisseurCreate() {
    this.fournisseurService.returnUrl = this.router.url
    this.service.keepData = true
    this.router.navigate(['/contacts/fournisseur/create']).then()
  }
  public navigateToEntrepriseCreate() {
    this.entrepriseService.returnUrl = this.router.url
    this.service.keepData = true
    this.router.navigate(['/parametres/entreprise/create']).then()
  }
  cancel(){
    this.item = new Produit();
  }
  retour(){
    this.router.navigate(['/pays/pays/list']).then()
  }
  ////

  filterProduitNivquxPrix(type: StatutNiveauPrixEnum): ProduitNiveauPrix[] {
    return this.item.produitNiveauPrix?.filter(item => item.niveauPrix?.type == type) || []
  }

  protected StatutNiveauPrixEnum = StatutNiveauPrixEnum
}
