import { Component, inject, Input } from '@angular/core';
import {CommonModule, NgForOf} from '@angular/common';
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
import {TypeRabaisEnum} from "src/app/controller/enums/type-rabais-enum";

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
import {Produit} from "../../../../../controller/entities/produit/produit";
import {ProduitService} from "../../../../../controller/services/produit/produit.service";
import {EntrepriseSelectedService} from "../../../../../controller/shared/entreprise-selected.service";

@Component({
  selector: 'app-livraison-create',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective, NgTemplateOutlet,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, SpinnerComponent, IconDirective,
    FormCheckComponent, FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent, TableDirective, NgForOf,

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

  private router = inject(Router);
  private service = inject(LivraisonService);
  private taxeService = inject(TaxeService);
  private fournisseurService = inject(FournisseurService);
  private entrepriseService = inject(EntrepriseService);
  private livraisonProduitService = inject(LivraisonProduitService);
  private bonCommandeProduitService = inject(BonCommandeProduitService);
  private bonCommandeService = inject(BonCommandeService);
  private formBuilder: FormBuilder= inject(FormBuilder);
  private toasterService = inject(ToasterService);
  private produitService = inject(ProduitService);
  private entrepriseSelectedService = inject(EntrepriseSelectedService);

  protected validator = LivraisonValidator.init(() => this.item)

  protected taxeList!: Taxe[];
  protected fournisseurList!: Fournisseur[];
  protected entrepriseList!: Entreprise[];
  protected typeRabaisEnumList = Object.values(TypeRabaisEnum)
  protected readonly TypeRabaisEnum = TypeRabaisEnum;
  protected bonCommandeList: BonCommande[] = [];
  protected bonCommandeSelected: BonCommande = new BonCommande();
  protected totalUnites: any;
  protected remiseGlobal: any;
  protected sousTotal: any;
  protected total: any;



  ngOnInit() {

    this.loadEntreprise();

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

    } else { this.reset(false) }
    this.service.keepData = false;
    this.generateCode();
    this.loadTaxeList();
    this.loadFournisseurList();

  }


  // METHOD

  //////////////////////////////////  Create ////////////////////////////////////////
  create() {
    // this.findBncmd();
    console.log(this.item)
    this.service.create().subscribe({
      next: data => {
        this.item = data;
        this.item = new Livraison()
        this.router.navigate(["/inventaire/livraison/livraison/livraisonpdf"]).then()
        this.toasterService.toast({message: "Un nouveau livraison a été ajouté", color: "success"})

      },
      error: err => {
        this.sending = false
        console.log(err)
        this.validator.import(err.error as ValidatorResult< any>[])
      }
    })
  }

  //////////////////////////////////////////////////////////////////////////////////////

  generateCode(): void {
    const randomNumber = Math.floor(Math.random() * 1000000);
    this.item.code = 'L' + randomNumber.toString().padStart(6, '0');
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


  reset(force = true) {
    if (force || this.item == null) this.item = new Livraison()
    this.validator.reset()
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

  public navigateToBonCommandeCreate() {
    this.entrepriseService.returnUrl = this.router.url
    this.service.keepData = true
    this.router.navigate(['/inventaire/boncommande/create']).then()
  }


  cancel(){
    this.item = new Livraison();
  }

  retour(){
    this.router.navigate(['/pays/pays/list']).then()
  }

  public get returnUrl() {
    return this.service.returnUrl;
  }

  public get toReturn() {
    return this.service.toReturn();
  }

  deleteFactureProduit(itemLP: LivraisonProduit): void {
    this.item.livraisonProduit = this.item.livraisonProduit?.filter(item => item !== itemLP);
  }


  findBncmd() {
    this.bonCommandeService.findById(this.item.bonCommande?.id).subscribe({
      next: data => {
        this.item.bonCommande = data;
        this.item.fournisseur = data.fournisseur;
        this.item.dateCreation = data.dateCreation;
        this.item.dateExpedition = data.dateExpedition;
        this.item.entreprise = data.entreprise;
      },
      error: err => console.log(err)
    })
  }


  selectBonComd(event: any) {
    const selectedId = event.target.value;
    const selectedBonCommande = this.bonCommandeList.find(it => it.id === parseInt(selectedId, 10));
    if (selectedBonCommande) {
      this.bonCommandeSelected = selectedBonCommande;
      this.mapBonCommandeToLivraison(selectedBonCommande);
    }
  }

  mapBonCommandeToLivraison(bonCommande: BonCommande) {
    this.item.bonCommande = bonCommande;
    console.log(bonCommande);

    this.item.fournisseur = bonCommande.fournisseur;
    this.item.dateCreation = bonCommande.dateCreation;
    this.item.dateExpedition = bonCommande.dateExpedition;
    this.item.entreprise = bonCommande.entreprise;
    this.item.totalUnites = bonCommande.totalUnites;
    this.item.remiseGlobal = bonCommande.remiseGlobal;
    this.item.sousTotal = bonCommande.sousTotal;
    this.item.total = bonCommande.total;
    this.item.taxeExpedition = bonCommande.taxeExpedition;

    this.item.livraisonProduit = bonCommande.bonCommandeProduit?.map(bonCommandeProduit => {
      const livraisonProduit = new LivraisonProduit();
      livraisonProduit.id = bonCommandeProduit.id;
      livraisonProduit.total = bonCommandeProduit.total;
      livraisonProduit.quantite = bonCommandeProduit.quantite;
      livraisonProduit.disque = bonCommandeProduit.disque;
      livraisonProduit.produit = bonCommandeProduit.produit;
      livraisonProduit.prix = bonCommandeProduit.prix;
      console.log( livraisonProduit.prix );
      return livraisonProduit;
    }) || [];
  }

  trackById(index: number, item: BonCommande): number {
    return item.id;
  }

  public get livraisonProduit(): LivraisonProduit[] {
    if (!this.item.livraisonProduit) {
      this.item.livraisonProduit = [];
    }
    return this.item.livraisonProduit;
  }

  selectFournisseur() {
    this.boncmds(this.fournisseur.id);
  }

  boncmds(id: number): void {
    this.bonCommandeService.findByIdFor(id).subscribe({
      next: (data) => {
        this.bonCommandeList = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }





  // GETTERS AND SETTERS//////////////////////////////////////////////////////////

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

  public set entreprise(value: Entreprise ) {
    this.item.entreprise = value;
  }


  public get bonCmd(): BonCommande {
     if (this.item.bonCommande == null)
       this.item.bonCommande = new BonCommande()
     return this.item.bonCommande;
   }

   public set bonCmd(value: BonCommande ) {
     this.item.bonCommande = value;
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






}
