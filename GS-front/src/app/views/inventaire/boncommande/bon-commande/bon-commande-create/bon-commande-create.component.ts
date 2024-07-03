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


import {BonCommandeService} from "src/app/controller/services/inventaire/boncommande/bon-commande.service";
import {BonCommande} from "src/app/controller/entities/inventaire/boncommande/bon-commande";
import {BonCommandeValidator} from "src/app/controller/validators/inventaire/boncommande/bon-commande.validator";
import {ValidatorResult} from "@bshg/validation";
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
import {LivraisonCreateComponent} from "src/app/views/inventaire/livraison/livraison/livraison-create/livraison-create.component";
import {LivraisonValidator} from "src/app/controller/validators/inventaire/livraison/livraison.validator";
import {TypeRabaisEnum} from "src/app/controller/enums/type-rabais-enum";
import {StatutBonCommandeEnum} from "src/app/controller/enums/statut-bon-commande-enum";
import {FactureProduit} from "../../../../../controller/entities/ventes/facture/facture-produit";
import {Produit} from "../../../../../controller/entities/produit/produit";
import {ProduitService} from "../../../../../controller/services/produit/produit.service";
import {ToasterService} from "../../../../../toaster/controller/toaster.service";

@Component({
  selector: 'app-bon-commande-create',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective, NgTemplateOutlet,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, SpinnerComponent, IconDirective,
    FormCheckComponent, FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent,
    LivraisonCreateComponent, TableDirective,
  ],
  templateUrl: './bon-commande-create.component.html',
  styleUrl: './bon-commande-create.component.scss'
})
export class BonCommandeCreateComponent {
  protected sending = false
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
  private bonCommandeProduitService = inject(BonCommandeProduitService)
  private produitService = inject(ProduitService)
  private formBuilder: FormBuilder= inject(FormBuilder)
  private toasterService = inject(ToasterService)

  protected validator = BonCommandeValidator.init(() => this.item)
  //  .setLivraison(LivraisonValidator.init(() => this.livraison))

  protected taxeList!: Taxe[]
  protected fournisseurList!: Fournisseur[]
  protected devisesList!: Devises[]
  protected niveauPrixList!: NiveauPrix[]
  protected entrepriseList!: Entreprise[]
  protected produitList!: Produit[]

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
       // this.validator.niveauPrix.validate()
      }
      let entrepriseCreated = this.entrepriseService.createdItemAfterReturn;
      if (entrepriseCreated.created) {
        this.item.entreprise = entrepriseCreated.item
        this.validator.entreprise.validate()
      }
    } else { this.reset(false) }
    this.service.keepData = false
    this.item.livraison = new Livraison()

    this.loadTaxeList()
    this.loadFournisseurList()
    this.loadDevisesList()
    this.loadNiveauPrixList()
    this.loadEntrepriseList()
    this.loadProduitList()
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
  create() {
    console.log(this.item)
    if (!this.validator.validate()){
      console.log(this.validator);
   return;  }
    this.sending = true;
    this.service.create().subscribe({
      next: data => {
        this.sending = false
        if (data == null) return
        this.item = data
        if (this.toReturn) {

          this.router.navigate([this.returnUrl]).then()
          return;
        }
        this.router.navigate(["/inventaire/boncommande/bon-commande/boncmdautre"]).then()
        this.toasterService.toast({message: "Un nouveau bon de commande a été ajouté", color: "success"})

      },
      error: err => {
        this.sending = false
        console.log(err)
        this.validator.import(err.error as ValidatorResult< any>[])
      }
    })
  }

  reset(force = true) {
    if (force || this.item == null) this.item = new BonCommande()
    this.validator.reset()
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
  public navigateToDevisesCreate() {
    this.devisesService.returnUrl = this.router.url
    this.service.keepData = true
    this.router.navigate(['/parametres/devises/create']).then()
  }
  public navigateToNiveauPrixCreate() {
    this.niveauPrixService.returnUrl = this.router.url
    this.service.keepData = true
    this.router.navigate(['/parametres/niveau-prix/create']).then()
  }
  public navigateToEntrepriseCreate() {
    this.entrepriseService.returnUrl = this.router.url
    this.service.keepData = true
    this.router.navigate(['/parametres/entreprise/create']).then()
  }

  ////
    protected typeRabaisEnumList = Object.values(TypeRabaisEnum)
    protected statutBonCommandeEnumList = Object.values(StatutBonCommandeEnum)
  cancel(){
    this.item = new BonCommande();
  }
  protected readonly TypeRabaisEnum = TypeRabaisEnum;

  retour(){
    this.router.navigate(['/inventaire/boncommande/bon-commande//list']).then()
  }
  public set bonCmdProduits(value:BonCommandeProduit[]) {
    this.bonCommandeProduitService.items = value;
  }

  public get bonCmdProduit(): BonCommandeProduit {
    return this.bonCommandeProduitService.item;
  }

  public set bonCmdProduit(value: BonCommandeProduit ) {
    this.bonCommandeProduitService.item = value;
  }
  public get bonCmdProduits(): BonCommandeProduit[] {
    if (this.item.bonCommandeProduit == null)
      this.item.bonCommandeProduit = []
    return this.item.bonCommandeProduit;
  }
  calculerTotal(bonCommandeProduit: BonCommandeProduit): number {
    console.log(this.item);
    // Vérifier si factureProduit1.produit existe
    if (bonCommandeProduit.produit) {
      let prix = bonCommandeProduit.prix || 0;

      bonCommandeProduit.produit.produitNiveauPrix?.forEach(e => {
        if (this.item.niveauPrix?.id == e.niveauPrix?.id) {
          console.log("Niveau de prix trouvé...");
          prix = e.prix;
        }
      });
      console.log("prixProduit", prix);
      // Calculer le sous-total
      let sousTotal = (bonCommandeProduit.quantite * prix);
      console.log("sousTotal", sousTotal);

      // Obtenir la taxe du produit
      let taxeProduit = bonCommandeProduit.produit.taxe ? bonCommandeProduit.produit.taxe.tauxImposition : 0.0;
      console.log("taxeProduit", taxeProduit);

      // Obtenir la taxe de la facture
      let taxeFacture = this.taxeList?.find(it => it.id == this.item.taxe?.id)?.tauxImposition || 0.0;
      console.log("taxeFacture", taxeFacture);

      let totalFinal = 0; // Initialisation par défaut

      // Si le type de rabais est un pourcentage
      if (this.item.typeRabais != null && this.item.typeRabais == this.TypeRabaisEnum.POURCENTAGE) {
        let totalAvecTaxe = sousTotal * (1 + ((taxeFacture + taxeProduit) / 100));
        console.log("totalAvecTaxe (pourcentage)", totalAvecTaxe);

        let disque = totalAvecTaxe * (this.item.rabais / 100);
        console.log("disque (pourcentage)", disque);

        totalFinal = totalAvecTaxe - disque; // Calcul du total final
        console.log("totalFinal (pourcentage)", totalFinal);
      }
      // Si le type de rabais est un montant fixe
      else if (this.item.typeRabais != null && this.item.typeRabais == this.TypeRabaisEnum.MONTANT) {
        let totalAvecTaxe = sousTotal * (1 + ((taxeFacture + taxeProduit) / 100));
        console.log("totalAvecTaxe (montant)", totalAvecTaxe);

        let disque = this.item.rabais;
        console.log("disque (montant)", disque);

        totalFinal = totalAvecTaxe - disque; // Calcul du total final
        console.log("totalFinal (montant)", totalFinal);
      }

      totalFinal *= bonCommandeProduit.quantite || 1;
      totalFinal -= bonCommandeProduit.disque || 0;
      totalFinal = parseFloat(totalFinal.toFixed(2)); // Formater le total avec 2 chiffres après la virgule
      bonCommandeProduit.total = totalFinal;
      return totalFinal; // Retourne la valeur correcte de totalFinal
    }

    console.log("Produit non trouvé...");
    return 0; // Si aucun produit n'est trouvé, retourne 0
  }
  deleteBonCmdProduit(itemFP: FactureProduit): void {
    this.item.bonCommandeProduit = this.item.bonCommandeProduit?.filter(item => item !== itemFP);
  }
  public addBonCmdProduits(produit: Produit): void {
    console.log(produit);
    if (this.item.bonCommandeProduit == null) {
      this.item.bonCommandeProduit = [];
    }

// this.produitniveauxPrix.findByProduitId(produit.id).subscribe(data => produit.produitNiveauPrix = data);
    let bonCommandeProduit = new BonCommandeProduit();
    bonCommandeProduit.produit = produit
    console.log("produit", produit);
    bonCommandeProduit.disque = 0
    bonCommandeProduit.quantite = 1
    produit.disponible = produit?.niveauStockInitial - bonCommandeProduit?.quantite;
    console.log("disponible", produit.disponible);
    bonCommandeProduit.disponible = produit.disponible
    console.log(bonCommandeProduit.disponible);
// bonCommandeProduit.prix = produit.produitNiveauPrix?.filter(it => it.niveauPrix?.id == this.item.niveauPrix?.id)[0]?.prix

    bonCommandeProduit.prix = produit?.produitNiveauPrix?.filter(it => it.niveauPrix?.id == this.fournisseur?.niveauPrix?.id)[0]?.prix || produit.prixGros;
    console.log("client", this.fournisseur);
    console.log("niveau prix du client", this?.fournisseur.niveauPrix);
    console.log(bonCommandeProduit.prix);
    bonCommandeProduit.total = this.calculerTotal(bonCommandeProduit);
    console.log(bonCommandeProduit.total);

    this.item.bonCommandeProduit = [...this.item.bonCommandeProduit, bonCommandeProduit]
    console.log(this.item.bonCommandeProduit)
  }

  calculerSommeSousTotal(bonCmdProduits: BonCommandeProduit[]): string {
    const somme = bonCmdProduits.reduce((total, bonCmdProduit) => {
      if (bonCmdProduit?.quantite && bonCmdProduit?.prix) {
        return total + (bonCmdProduit.quantite * bonCmdProduit.prix);
      } else {
        return total;
      }
    }, 0);
    this.item.sousTotal = somme
    return somme.toFixed(2);
  }
  calculerSommeTotale(bonCommandeProduitList: BonCommandeProduit[]): number {
    const sommeTotale = bonCommandeProduitList.reduce((somme, bonCmdProduit) => {
      const total = this.calculerTotal(bonCmdProduit);
      console.log(`Total pour ${bonCmdProduit.produit?.nom}: ${total}`);
      return somme + total;
    }, 0);

    const sommeTotaleFormatee = parseFloat(sommeTotale.toFixed(2));
    console.log(`Somme totale formatée: ${sommeTotaleFormatee}`);
    this.item.total = sommeTotaleFormatee;
    return sommeTotaleFormatee;
  }
  calculerSommeQuantite(bonCommandeProduitList: BonCommandeProduit[]): number {
    let number = bonCommandeProduitList.reduce((sommeQuantite, bonCmdProduit) => {
      return sommeQuantite + (bonCmdProduit.quantite || 0);
    }, 0);
    this.item.totalUnites = number
    return number;
  }
  loadProduitList() {
    this.produitService.findAll().subscribe({
      next: data => this.produitList = data,
      error: err => console.log(err)
    })
  }
}
