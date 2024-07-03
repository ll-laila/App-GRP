import { Component, inject, Input } from '@angular/core';
import {
  FormSelectDirective, ColComponent, FormControlDirective,
  FormFloatingDirective, FormLabelDirective, RowComponent,
  CardComponent, CardBodyComponent, CardHeaderComponent, SpinnerComponent,
  InputGroupComponent, ButtonDirective, NavComponent, NavItemComponent,
  FormCheckComponent, FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent, TableDirective
} from "@coreui/angular";
import {FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {IconDirective} from "@coreui/icons-angular";
import {NgTemplateOutlet} from "@angular/common";


import {BonCommandeService} from "src/app/controller/services/inventaire/boncommande/bon-commande.service";
import {BonCommande} from "src/app/controller/entities/inventaire/boncommande/bon-commande";
import {BonCommandeValidator} from "src/app/controller/validators/inventaire/boncommande/bon-commande.validator";
import {LivraisonService} from "src/app/controller/services/inventaire/livraison/livraison.service";
import {Livraison} from "src/app/controller/entities/inventaire/livraison/livraison";
import {TaxeService} from "src/app/controller/services/parametres/taxe.service";
import {Taxe} from "src/app/controller/entities/parametres/taxe";
import {FournisseurService} from "src/app/controller/services/contacts/fournisseur.service";
import {Fournisseur} from "src/app/controller/entities/contacts/fournisseur";
import {DevisesService} from "src/app/controller/services/parametres/devises.service";
import {Devises} from "src/app/controller/entities/parametres/devises";
import {NiveauPrixService} from "src/app/controller/services/parametres/niveau-prix.service";
import {NiveauPrix} from "src/app/controller/entities/parametres/niveau-prix";
import {BonCommandeProduitService} from "src/app/controller/services/inventaire/boncommande/bon-commande-produit.service";
import {BonCommandeProduit} from "src/app/controller/entities/inventaire/boncommande/bon-commande-produit";
import {EntrepriseService} from "src/app/controller/services/parametres/entreprise.service";
import {Entreprise} from "src/app/controller/entities/parametres/entreprise";
import {LivraisonUpdateComponent} from "src/app/views/inventaire/livraison/livraison/livraison-update/livraison-update.component";
import {LivraisonValidator} from "src/app/controller/validators/inventaire/livraison/livraison.validator";
import {TypeRabaisEnum} from "src/app/controller/enums/type-rabais-enum";
import {StatutBonCommandeEnum} from "src/app/controller/enums/statut-bon-commande-enum";

@Component({
  selector: 'app-bon-commande-update',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent, NgTemplateOutlet,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, FormCheckComponent, SpinnerComponent,
    FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent, IconDirective,
    LivraisonUpdateComponent, TableDirective,
  ],
  templateUrl: './bon-commande-update.component.html',
  styleUrl: './bon-commande-update.component.scss'
})
export class BonCommandeUpdateComponent {
  protected isPartOfUpdateForm = false // true if it is used as part of other update component
  protected sending = false
  protected resetting = false
  protected standAlon = true

  @Input("getter") set setItemGetter(getter: () => BonCommande) {
    this.itemGetter = getter
    this.standAlon = false
  }
  @Input("setter") set setItemSetter(setter: (value: BonCommande ) => void) {
    this.itemSetter = setter
  }
  @Input("validator") set setValidator(validator: BonCommandeValidator) {
    this.validator = validator
  }

  private router = inject(Router)
  private service = inject(BonCommandeService)
  private taxeService = inject(TaxeService)
  private fournisseurService = inject(FournisseurService)
  private devisesService = inject(DevisesService)
  private niveauPrixService = inject(NiveauPrixService)
  private entrepriseService = inject(EntrepriseService)

  protected validator = BonCommandeValidator.init(() => this.item)
  //  .setLivraison(LivraisonValidator.init(() => this.livraison))

  protected taxeList!: Taxe[]
  protected fournisseurList!: Fournisseur[]
  protected devisesList!: Devises[]
  protected niveauPrixList!: NiveauPrix[]
  protected entrepriseList!: Entreprise[]

  ngAfterContentInit() {
    if (!this.isPartOfUpdateForm && this.item.id == null) this.router.navigate(["/inventaire/boncommande/bon-commande"]).then()
  }

  ngOnInit() {
    if(this.service.keepData) {
      let taxeCreated = this.taxeService.createdItemAfterReturn;
      if (taxeCreated.created) {
        this.item.taxe = taxeCreated.item
        this.validator.taxe.validate()
      }
      let taxeExpeditionCreated = this.taxeService.createdItemAfterReturn;
      if (taxeExpeditionCreated.created) {
        this.item.taxeExpedition = taxeExpeditionCreated.item
        this.validator.taxeExpedition.validate()
      }
      let fournisseurCreated = this.fournisseurService.createdItemAfterReturn;
      if (fournisseurCreated.created) {
        this.item.fournisseur = fournisseurCreated.item
        this.validator.fournisseur.validate()
      }
      let devisesCreated = this.devisesService.createdItemAfterReturn;
      if (devisesCreated.created) {
        this.item.devises = devisesCreated.item
        this.validator.devises.validate()
      }
      let niveauPrixCreated = this.niveauPrixService.createdItemAfterReturn;
      if (niveauPrixCreated.created) {
        this.item.niveauPrix = niveauPrixCreated.item
        //this.validator.niveauPrix.validate()
      }
     /* let entrepriseCreated = this.entrepriseService.createdItemAfterReturn;
      if (entrepriseCreated.created) {
        this.item.entreprise = entrepriseCreated.item
        this.validator.entreprise.validate()
      }*/
    } else { this.validator.reset() }

    this.loadTaxeList()
    this.loadFournisseurList()
    this.loadDevisesList()
    this.loadNiveauPrixList()
    this.loadEntrepriseList()
  }

  // LOAD DATA
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
  loadDevisesList() {
    this.devisesService.findAllOptimized().subscribe({
      next: data => this.devisesList = data,
      error: err => console.log(err)
    })
  }
  loadNiveauPrixList() {
    this.niveauPrixService.findAllOptimized().subscribe({
      next: data => this.niveauPrixList = data,
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
        this.router.navigate(["/inventaire/boncommande/bon-commande"]).then()
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

  public get item(): BonCommande {
    return this.itemGetter();
  }

  public set item(value: BonCommande ) {
    this.itemSetter(value);
  }

  private itemGetter(): BonCommande {
    return this.service.item;
  }

  private itemSetter(value: BonCommande ) {
    this.service.item = value;
  }

  public get livraison(): Livraison {
    if (this.item.livraison == null)
      this.item.livraison = new Livraison()
    return this.item.livraison;
  }
  public set livraison(value: Livraison ) {
    this.item.livraison = value;
  }

  protected livraisonGetter = () => this.livraison;
  protected livraisonSetter = (value: Livraison ) => this.livraison = value;

  public get taxe(): Taxe {
    if (this.item.taxe == null)
      this.item.taxe = new Taxe()
    return this.item.taxe;
  }
  public set taxe(value: Taxe ) {
    this.item.taxe = value;
  }


  public get taxeExpedition(): Taxe {
    if (this.item.taxeExpedition == null)
      this.item.taxeExpedition = new Taxe()
    return this.item.taxeExpedition;
  }
  public set taxeExpedition(value: Taxe ) {
    this.item.taxeExpedition = value;
  }


  public get fournisseur(): Fournisseur {
    if (this.item.fournisseur == null)
      this.item.fournisseur = new Fournisseur()
    return this.item.fournisseur;
  }
  public set fournisseur(value: Fournisseur ) {
    this.item.fournisseur = value;
  }


  public get devises(): Devises {
    if (this.item.devises == null)
      this.item.devises = new Devises()
    return this.item.devises;
  }
  public set devises(value: Devises ) {
    this.item.devises = value;
  }


  public get niveauPrix(): NiveauPrix {
    if (this.item.niveauPrix == null)
      this.item.niveauPrix = new NiveauPrix()
    return this.item.niveauPrix;
  }
  public set niveauPrix(value: NiveauPrix ) {
    this.item.niveauPrix = value;
  }


  public get entreprise(): Entreprise {
    if (this.item.entreprise == null)
      this.item.entreprise = new Entreprise()
    return this.item.entreprise;
  }
  public set entreprise(value: Entreprise ) {
    this.item.entreprise = value;
  }



  public navigateToTaxeCreate() {
    this.taxeService.returnUrl = this.router.url
    this.router.navigate(['/parametres/taxe/create']).then()
  }
  public navigateToFournisseurCreate() {
    this.fournisseurService.returnUrl = this.router.url
    this.router.navigate(['/contacts/fournisseur/create']).then()
  }
  public navigateToDevisesCreate() {
    this.devisesService.returnUrl = this.router.url
    this.router.navigate(['/parametres/devises/create']).then()
  }
  public navigateToNiveauPrixCreate() {
    this.niveauPrixService.returnUrl = this.router.url
    this.router.navigate(['/parametres/niveau-prix/create']).then()
  }
  public navigateToEntrepriseCreate() {
    this.entrepriseService.returnUrl = this.router.url
    this.router.navigate(['/parametres/entreprise/create']).then()
  }

  ////
    protected typeRabaisEnumList = Object.values(TypeRabaisEnum)
    protected statutBonCommandeEnumList = Object.values(StatutBonCommandeEnum)
  cancel(){
    this.item = new BonCommande();
  }

}
