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
import {NgForOf, NgTemplateOutlet} from "@angular/common";


import {LivraisonService} from "src/app/controller/services/inventaire/livraison/livraison.service";
import {Livraison} from "src/app/controller/entities/inventaire/livraison/livraison";
import {LivraisonValidator} from "src/app/controller/validators/inventaire/livraison/livraison.validator";
import {TaxeService} from "src/app/controller/services/parametres/taxe.service";
import {Taxe} from "src/app/controller/entities/parametres/taxe";
import {FournisseurService} from "src/app/controller/services/contacts/fournisseur.service";
import {Fournisseur} from "src/app/controller/entities/contacts/fournisseur";
import {LivraisonProduitService} from "src/app/controller/services/inventaire/livraison/livraison-produit.service";
import {LivraisonProduit} from "src/app/controller/entities/inventaire/livraison/livraison-produit";
import {EntrepriseService} from "src/app/controller/services/parametres/entreprise.service";
import {Entreprise} from "src/app/controller/entities/parametres/entreprise";
import {StatutLivraisonEnum} from "src/app/controller/enums/statut-livraison-enum";
import {BonCommande} from "../../../../../controller/entities/inventaire/boncommande/bon-commande";
import {ToasterService} from "../../../../../toaster/controller/toaster.service";
import {BonCommandeService} from "../../../../../controller/services/inventaire/boncommande/bon-commande.service";
import {EntrepriseSelectedService} from "../../../../../controller/shared/entreprise-selected.service";

@Component({
  selector: 'app-livraison-update',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent, NgTemplateOutlet,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, FormCheckComponent, SpinnerComponent,
    FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent, IconDirective, NgForOf, TableDirective,

  ],
  templateUrl: './livraison-update.component.html',
  styleUrl: './livraison-update.component.scss'
})
export class LivraisonUpdateComponent {
  protected isPartOfUpdateForm = false // true if it is used as part of other update component
  protected sending = false
  protected resetting = false
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
  private bonCommandeService = inject(BonCommandeService);
  private taxeService = inject(TaxeService);
  private toasterService = inject(ToasterService);
  private fournisseurService = inject(FournisseurService);
  private entrepriseService = inject(EntrepriseService);
  private entrepriseSelectedService = inject(EntrepriseSelectedService);

  protected validator = LivraisonValidator.init(() => this.item)

  protected taxeList!: Taxe[];
  protected fournisseurList!: Fournisseur[];
  protected entrepriseList!: Entreprise[];
  protected bonCommandeList: BonCommande[] = [];
  protected bonCommandeSelected: BonCommande = new BonCommande();

  ngAfterContentInit() {
    if (!this.isPartOfUpdateForm && this.item.id == null) this.router.navigate(["/inventaire/livraison/livraison"]).then()
  }

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

    } else { this.validator.reset() }

    this.loadTaxeList();
    this.loadFournisseurList();
    // @ts-ignore
    this.boncmds(this.item.fournisseur.id);
   // this.findBncmd();
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

  loadEntrepriseList() {
    this.entrepriseService.findAllOptimized().subscribe({
      next: data => this.entrepriseList = data,
      error: err => console.log(err)
    })
  }

  // METHODS
  update() {
    console.log(this.item)
    //if (!this.validator.validate()) return;
  //  this.sending = true;
    this.service.update().subscribe({
      next: data => {
     //   this.sending = false
      //  if (data == null) return
        this.router.navigate(["/inventaire/livraison/livraison"]).then();
        this.toasterService.toast({message: "le livraison a été modifié", color: "success"})

      },
      error: err => {
        this.sending = false
        console.log(err)
      }
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
      return livraisonProduit;
    }) || [];
  }

  trackById(index: number, item: BonCommande): number {
    return item.id;
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

  ////
    protected statutLivraisonEnumList = Object.values(StatutLivraisonEnum)
  cancel(){
    this.item = new Livraison();
  }

}
