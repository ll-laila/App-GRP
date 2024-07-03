import { Component, inject, Input } from '@angular/core';
import {
  FormSelectDirective, ColComponent, FormControlDirective,
  FormFloatingDirective, FormLabelDirective, RowComponent,
  CardComponent, CardBodyComponent, CardHeaderComponent, SpinnerComponent,
  InputGroupComponent, ButtonDirective, NavComponent, NavItemComponent,
  FormCheckComponent, FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent, TableDirective
} from "@coreui/angular";
import {FormBuilder, FormGroup, FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {IconDirective} from "@coreui/icons-angular";
import {NgTemplateOutlet} from "@angular/common";


import {LivraisonService} from "src/app/controller/services/inventaire/livraison/livraison.service";
import {Livraison} from "src/app/controller/entities/inventaire/livraison/livraison";
import {LivraisonValidator} from "src/app/controller/validators/inventaire/livraison/livraison.validator";
import {ValidatorResult} from "@bshg/validation";
import {TaxeService} from "src/app/controller/services/parametres/taxe.service";
import {Taxe} from "src/app/controller/entities/parametres/taxe";
import {FournisseurService} from "src/app/controller/services/contacts/fournisseur.service";
import {Fournisseur} from "src/app/controller/entities/contacts/fournisseur";
import {LivraisonProduitService} from "src/app/controller/services/inventaire/livraison/livraison-produit.service";
import {LivraisonProduit} from "src/app/controller/entities/inventaire/livraison/livraison-produit";
import {EntrepriseService} from "src/app/controller/services/parametres/entreprise.service";
import {Entreprise} from "src/app/controller/entities/parametres/entreprise";
import {StatutLivraisonEnum} from "src/app/controller/enums/statut-livraison-enum";
import {FactureProduit} from "../../../../../controller/entities/ventes/facture/facture-produit";
import {
  BonCommandeProduitService
} from "../../../../../controller/services/inventaire/boncommande/bon-commande-produit.service";
import {BonCommandeService} from "../../../../../controller/services/inventaire/boncommande/bon-commande.service";
import {BonCommandeProduit} from "../../../../../controller/entities/inventaire/boncommande/bon-commande-produit";
import {BonCommande} from "../../../../../controller/entities/inventaire/boncommande/bon-commande";
import {ToasterService} from "../../../../../toaster/controller/toaster.service";

@Component({
  selector: 'app-livraison-create',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective, NgTemplateOutlet,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, SpinnerComponent, IconDirective,
    FormCheckComponent, FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent, TableDirective,

  ],
  templateUrl: './livraison-create.component.html',
  styleUrl: './livraison-create.component.scss'
})
export class LivraisonCreateComponent {
  protected sending = false
  protected standAlon = true

  @Input("getter") set setItemGetter(getter: () => Livraison) {
    this.itemGetter = getter
    this.standAlon = false
  }
  @Input("setter") set setItemSetter(setter: (value: Livraison ) => void) {
    this.itemSetter = setter
  }
  @Input("validator") set setValidator(validator: LivraisonValidator) {
    this.validator = validator
  }

  private router = inject(Router)
  private service = inject(LivraisonService)
  private taxeService = inject(TaxeService)
  private fournisseurService = inject(FournisseurService)
  private entrepriseService = inject(EntrepriseService)
  private livraisonProduitService = inject(LivraisonProduitService)
  private bonCommandeProduitService = inject(BonCommandeProduitService)
  private bonCommandeService = inject(BonCommandeService)
  private formBuilder: FormBuilder= inject(FormBuilder)
  private toasterService = inject(ToasterService)

  protected validator = LivraisonValidator.init(() => this.item)

  protected taxeList!: Taxe[]
  protected fournisseurList!: Fournisseur[]
  protected entrepriseList!: Entreprise[]

  ngOnInit() {
    if(this.service.keepData) {
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
     let entrepriseCreated = this.entrepriseService.createdItemAfterReturn;
      if (entrepriseCreated.created) {
        this.item.entreprise = entrepriseCreated.item
        this.validator.entreprise.validate()
      }
    } else { this.reset(false) }
    this.service.keepData = false

    this.loadTaxeList()
    this.loadFournisseurList()
    this.loadEntrepriseList()
    this.bncmd();
    this.clientForm = this.formBuilder.group({
      code: [{value: this.generateCode(), disabled: true}]

    });
    this.service.getNextCode().subscribe({
      next: value => this.item.code = value.code,
      error: err => console.log(err)
    })
  }
  currentCodeNumber: number = 1;

  clientForm !: FormGroup;
  generateCode(): string {
    return 'I' + this.currentCodeNumber.toString().padStart(7, '0');
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
  loadEntrepriseList() {
    this.entrepriseService.findAllOptimized().subscribe({
      next: data => this.entrepriseList = data,
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
        this.item = new Livraison()
        this.router.navigate(["/inventaire/livraison/livraison"]).then()
        this.toasterService.toast({message: "Un nouveau livraison a été ajouté", color: "success"})

      },
      error: err => {
        this.sending = false
        console.log(err)
        this.validator.import(err.error as ValidatorResult< any>[])
      }
    })
  }

  calculerSommeSousTotal(livraisonProduitList: LivraisonProduit[]): string {
    const somme = livraisonProduitList.reduce((total, livraisonProduit) => {
      if (livraisonProduit?.quantite && livraisonProduit?.prix) {
        return total + (livraisonProduit.quantite * livraisonProduit.prix);
      } else {
        return total;
      }
    }, 0);
    this.item.sousTotal = somme
    return somme.toFixed(2);
  }



  reset(force = true) {
    if (force || this.item == null) this.item = new Livraison()
    this.validator.reset()
  }
  public get livraisonProduit(): LivraisonProduit[] {
    if (this.item.livraisonProduit == null)
      this.item.livraisonProduit = []
    return this.item.livraisonProduit;
  }


  // GETTERS AND SETTERS
  public get items() {
    return this.service.items;
  }

  public set items(value: Livraison[]) {
    this.service.items = value;
  }

  public get item(): Livraison {
    return this.itemGetter();
  }

  public set item(value: Livraison ) {
    this.itemSetter(value);
  }

  private itemGetter(): Livraison {
    return this.service.item;
  }

  private itemSetter(value: Livraison ) {
    this.service.item = value;
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


  public get entreprise(): Entreprise {
    if (this.item.entreprise == null)
      this.item.entreprise = new Entreprise()
    return this.item.entreprise;
  }

  public get bonCmd(): BonCommande {
    if (this.item.bonCommande == null)
      this.item.bonCommande = new BonCommande()
    return this.item.bonCommande;
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

  ////
    protected statutLivraisonEnumList = Object.values(StatutLivraisonEnum)
  cancel(){
    this.item = new Livraison();
  }

  retour(){
    this.router.navigate(['/pays/pays/list']).then()
  }

  deleteFactureProduit(itemLP: LivraisonProduit): void {
    this.item.livraisonProduit = this.item.livraisonProduit?.filter(item => item !== itemLP);
  }



  public set itemsLP(value:LivraisonProduit[]) {
    this.livraisonProduitService.items = value;
  }

  public get itemLP(): LivraisonProduit {
    return this.livraisonProduitService.item;
  }

  public set itemLP(value: LivraisonProduit ) {
    this.livraisonProduitService.item = value;
  }
  public set cmdprds(value: BonCommandeProduit[]) {
    this.bonCommandeProduitService.items = value;
  }

  public get cmdprd(): BonCommandeProduit {
    return this.bonCommandeProduitService.item;
  }

  public set cmdprd(value: BonCommandeProduit ) {
    this.bonCommandeProduitService.item = value;
  }
  public set bnCmds(value:BonCommande[])  {
    this.bonCommandeService.items = value;
  }

  public get bnCmd(): BonCommande {
    console.log(this.bonCommandeService.item);
    return this.bonCommandeService.item;
  }

  public get bonCommandeProduit() {
    console.log(this.bonCommandeService.item.bonCommandeProduit);
    return this.bonCommandeService.item.bonCommandeProduit;
  }

  public set bnCmd(value: BonCommande ) {
    this.bonCommandeService.item = value;
  }
  bncmd() {
    this.bonCommandeService.findById(this.bnCmd.id).subscribe({
      next: data => {
        this.item.bonCommande = data
        this.item.fournisseur = data.fournisseur
        this.item.dateCreation = data.dateCreation
        this.item.dateExpedition = data.dateExpedition
        this.item.entreprise = data.entreprise
      },
      error: err => console.log(err)
    })
  }


}
