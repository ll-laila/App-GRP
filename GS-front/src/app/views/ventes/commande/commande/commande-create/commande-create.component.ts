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


import {CommandeService} from "src/app/controller/services/ventes/commande/commande.service";
import {Commande} from "src/app/controller/entities/ventes/commande/commande";
import {CommandeValidator} from "src/app/controller/validators/ventes/commande/commande.validator";
import {ValidatorResult} from "@bshg/validation";
import {FactureService} from "src/app/controller/services/ventes/facture/facture.service";
import {Facture} from "src/app/controller/entities/ventes/facture/facture";
import {CommandeExpedition} from "src/app/controller/entities/ventes/commande-expedition";
import {TaxeService} from "src/app/controller/services/parametres/taxe.service";
import {Taxe} from "src/app/controller/entities/parametres/taxe";
import {ClientService} from "src/app/controller/services/contacts/client.service";
import {Client} from "src/app/controller/entities/contacts/client";
import {DevisesService} from "src/app/controller/services/parametres/devises.service";
import {Devises} from "src/app/controller/entities/parametres/devises";
import {NiveauPrixService} from "src/app/controller/services/parametres/niveau-prix.service";
import {NiveauPrix} from "src/app/controller/entities/parametres/niveau-prix";
import {AdresseService} from "src/app/controller/services/adresse/adresse.service";
import {Adresse} from "src/app/controller/entities/adresse/adresse";
import {CommandeProduitService} from "src/app/controller/services/ventes/commande/commande-produit.service";
import {CommandeProduit} from "src/app/controller/entities/ventes/commande/commande-produit";
import {EntrepriseService} from "src/app/controller/services/parametres/entreprise.service";
import {Entreprise} from "src/app/controller/entities/parametres/entreprise";
import {FactureCreateComponent} from "src/app/views/ventes/facture/facture/facture-create/facture-create.component";
import {FactureValidator} from "src/app/controller/validators/ventes/facture/facture.validator";
import {AdresseCreateComponent} from "src/app/views/adresse/adresse/adresse-create/adresse-create.component";
import {AdresseValidator} from "src/app/controller/validators/adresse/adresse.validator";
import {TypeRabaisEnum} from "src/app/controller/enums/type-rabais-enum";
import {StatutCommandeEnum} from "src/app/controller/enums/statut-commande-enum";
import {FactureProduit} from "../../../../../controller/entities/ventes/facture/facture-produit";
import {Produit} from "../../../../../controller/entities/produit/produit";
import {ProduitService} from "../../../../../controller/services/produit/produit.service";
import {ToasterService} from "../../../../../toaster/controller/toaster.service";

@Component({
  selector: 'app-commande-create',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective, NgTemplateOutlet,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, SpinnerComponent, IconDirective,
    FormCheckComponent, FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent,
    FactureCreateComponent, AdresseCreateComponent, TableDirective,
  ],
  templateUrl: './commande-create.component.html',
  styleUrl: './commande-create.component.scss'
})
export class CommandeCreateComponent {
  protected sending = false
  protected standAlon = true

  @Input("getter") set setItemGetter(getter: () => Commande) {
    this.itemGetter = getter
    this.standAlon = false
  }
  @Input("setter") set setItemSetter(setter: (value: Commande ) => void) {
    this.itemSetter = setter
  }
  @Input("validator") set setValidator(validator: CommandeValidator) {
    this.validator = validator
  }

  private router = inject(Router)
  private service = inject(CommandeService)
  private taxeService = inject(TaxeService)
  private clientService = inject(ClientService)
  private devisesService = inject(DevisesService)
  private niveauPrixService = inject(NiveauPrixService)
  private entrepriseService = inject(EntrepriseService)
  private commandeProduitService = inject(CommandeProduitService)
  private produitService = inject(ProduitService)
  private factureService = inject(FactureService)
  private formBuilder: FormBuilder= inject(FormBuilder)
  private toasterService = inject(ToasterService)

  protected validator = CommandeValidator.init(() => this.item)
  //  .setFacture(FactureValidator.init(() => this.facture))
    //.setAddressFacturation(AdresseValidator.init(() => this.addressFacturation))
    //.setAddressExpedition(AdresseValidator.init(() => this.addressExpedition))

  protected taxeList!: Taxe[]
  protected clientList!: Client[]
  protected devisesList!: Devises[]
  protected niveauPrixList!: NiveauPrix[]
  protected entrepriseList!: Entreprise[]
  protected produitList!: Produit[]
  protected readonly TypeRabaisEnum = TypeRabaisEnum;


  ngOnInit() {
    if(this.service.keepData) {
      let taxeCreated = this.taxeService.createdItemAfterReturn;
      if (taxeCreated.created) {
        this.item.taxe = taxeCreated.item
       // this.validator.taxe.validate()
      }
      let taxeExpeditionCreated = this.taxeService.createdItemAfterReturn;
      if (taxeExpeditionCreated.created) {
        this.item.taxeExpedition = taxeExpeditionCreated.item
      //  this.validator.taxeExpedition.validate()
      }
      let clientCreated = this.clientService.createdItemAfterReturn;
      if (clientCreated.created) {
        this.item.client = clientCreated.item
        this.validator.client.validate()
      }
      let devisesCreated = this.devisesService.createdItemAfterReturn;
      if (devisesCreated.created) {
        this.item.devises = devisesCreated.item
      //  this.validator.devises.validate()
      }
      let entrepriseCreated = this.entrepriseService.createdItemAfterReturn;
      if (entrepriseCreated.created) {
        this.item.entreprise = entrepriseCreated.item
        this.validator.entreprise.validate()
      }
      let niveauPrixCreated = this.niveauPrixService.createdItemAfterReturn;
      if (niveauPrixCreated.created) {
        this.item.niveauPrix = niveauPrixCreated.item
      }

    } else { this.reset(false) }
    this.service.keepData = false
    this.item.facture = new Facture()
    this.item.addressFacturation = new Adresse()
    this.item.addressExpedition = new Adresse()

    this.loadTaxeList()
    this.loadProduitList()

    this.loadClientList()
    this.loadDevisesList()
    this.loadNiveauPrixList()
    this.loadEntrepriseList()
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

  loadProduitList() {
    this.produitService.findAll().subscribe({
      next: data => this.produitList = data,
      error: err => console.log(err)
    })
  }
  // LOAD DATA
  loadTaxeList() {
    this.taxeService.findAllOptimized().subscribe({
      next: data => this.taxeList = data,
      error: err => console.log(err)
    })
  }
  loadClientList() {
    this.clientService.findAllOptimized().subscribe({
      next: data => this.clientList = data,
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

  create() {
    console.log(this.item)
    if (!this.validator.validate()){
      console.log(this.validator);
    return;}
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
        this.router.navigate(["/ventes/commande/commande/autre"]).then()
        this.toasterService.toast({message: "Une nouvelle commande a été ajouté", color: "success"})

        // this.router.navigate(["/ventes/commande/commande"]).then()
      },
      error: err => {
        this.sending = false
        console.log(err)
        this.validator.import(err.error as ValidatorResult< any>[])
      }
    })
  }

  calculerSommeSousTotal(commandeProduits: CommandeProduit[]): string {
    const somme = commandeProduits.reduce((total, commandeProduit) => {
      if (commandeProduit?.quantite && commandeProduit?.prix) {
        return total + (commandeProduit.quantite * commandeProduit.prix);
      } else {
        return total;
      }
    }, 0);
    this.item.sousTotal = somme
    return somme.toFixed(2);
  }
  calculerSommeTotale(commandeProduitList: CommandeProduit[]): number {
    const sommeTotale = commandeProduitList.reduce((somme, commandeProduit) => {
      const total = this.calculerTotal(commandeProduit);
      console.log(`Total pour ${commandeProduit.produit?.nom}: ${total}`);
      return somme + total;
    }, 0);

    const sommeTotaleFormatee = parseFloat(sommeTotale.toFixed(2));
    console.log(`Somme totale formatée: ${sommeTotaleFormatee}`);
    this.item.total = sommeTotaleFormatee;
    return sommeTotaleFormatee;
  }
  calculerSommeQuantite(commandeProduitList: CommandeProduit[]): number {
    let number = commandeProduitList.reduce((sommeQuantite, commandeProduit) => {
      return sommeQuantite + (commandeProduit.quantite || 0);
    }, 0);
    this.item.totalUnites = number
    return number;
  }


  reset(force = true) {
    if (force || this.item == null) this.item = new Commande()
    this.validator.reset()
  }

  // GETTERS AND SETTERS
  public get items() {
    return this.service.items;
  }

  public set items(value) {
    this.service.items = value;
  }

  public get item(): Commande {
    return this.itemGetter();
  }
  public get commandeProduit(): CommandeProduit[] {
    if (this.item.commandeProduit == null)
      this.item.commandeProduit = []
    return this.item.commandeProduit;
  }
  public set item(value: Commande ) {
    this.itemSetter(value);
  }

  private itemGetter(): Commande {
    return this.service.item;
  }

  private itemSetter(value: Commande ) {
    this.service.item = value;
  }

  public get facture(): Facture {
    if (this.item.facture == null)
      this.item.facture = new Facture()
    return this.item.facture;
  }
  public set facture(value: Facture ) {
    this.item.facture = value;
  }
  public addCommandeProduits(produit: Produit): void {
    console.log(produit);
    if (this.item.commandeProduit == null) {
      this.item.commandeProduit = [];
    }

    // this.produitniveauxPrix.findByProduitId(produit.id).subscribe(data => produit.produitNiveauPrix = data);
    let commandeProduit = new CommandeProduit();
    commandeProduit.produit = produit
    console.log("produit",produit);
    commandeProduit.disque = 0
    commandeProduit.quantite = 1
    produit.disponible = produit?.niveauStockInitial - commandeProduit?.quantite;
    console.log("disponible",produit.disponible);
    commandeProduit.disponible = produit.disponible
    console.log(commandeProduit.disponible);
    // factureProduit.prix = produit.produitNiveauPrix?.filter(it => it.niveauPrix?.id == this.item.niveauPrix?.id)[0]?.prix

    commandeProduit.prix = produit?.produitNiveauPrix?.filter(it => it.niveauPrix?.id == this?.client?.niveauPrix)[0]?.prix || produit.prixGros;

    console.log( "niveau prix du client",this?.client?.niveauPrix?.id);
    console.log(commandeProduit.prix);
    commandeProduit.total = this.calculerTotal(this.itemCP);
    console.log(commandeProduit.total);

    this.item.commandeProduit = [...this.item.commandeProduit, commandeProduit]
    console.log(this.item.commandeProduit)
  }
  calculerTotal(  commandeProduit: CommandeProduit):number {

    console.log(this.item)
    if (commandeProduit.produit) {      console.log("...............")
      let prixProduit = 0;
      commandeProduit?.produit?.produitNiveauPrix?.forEach(e => {
        if(this.item.niveauPrix?.id == e.niveauPrix?.id) {
          console.log("hello");
          prixProduit =  e.prix;
        }

      });
      console.log("prixProduit",prixProduit)
      let sousTotal = commandeProduit.quantite * prixProduit;
      console.log("sousTotal",sousTotal)
      let taxeProduit = commandeProduit.produit.taxe ? commandeProduit.produit.taxe?.tauxImposition : 0.0;
      console.log("taxeProduit",taxeProduit)
      let taxeFacture =this.taxeList?.filter(it => it.id == this.item.taxe?.id)[0]?.tauxImposition;
      console.log(this.item.taxe)
      let taxeExpedition = commandeProduit?.commande?.taxeExpedition != null ? commandeProduit?.commande?.taxeExpedition?.tauxImposition : 0.0;
      console.log("taxeExpedition", taxeExpedition)
      // let disponible = item.produit?.niveauStockInitial-item.quantite;
      //nconsole.log("disponible", disponible)
      if(this.item.typeRabais !=null && this.item.typeRabais == this.TypeRabaisEnum.POURCENTAGE){
        let totalAvecTaxe = sousTotal * (1 + ((taxeFacture + taxeProduit + taxeExpedition) / 100));
        console.log("totalAvecTaxe",totalAvecTaxe)
        if (taxeFacture == undefined) taxeFacture=0;
        let disque = totalAvecTaxe * (this.item.rabais / 100);
        console.log("disque",disque)
        let totalFinal = totalAvecTaxe - disque;
        console.log("totalFinal",totalFinal)
        return totalFinal;}
      if(this.item?.typeRabais !=null && this.item?.typeRabais == this.TypeRabaisEnum.MONTANT){
        let totalAvecTaxe = sousTotal * (1 + ((taxeFacture + taxeProduit + taxeExpedition) / 100));
        console.log("totalAvecTaxe",totalAvecTaxe)
        if (taxeFacture == undefined) taxeFacture=0;
        let disque = this.item.rabais;
        console.log("disque",disque)
        let totalFinal = totalAvecTaxe - disque;
        console.log("totalFinal",totalFinal)
        return totalFinal;
      }
    }
    return 0;
  }


  protected factureGetter = () => this.facture;
  protected factureSetter = (value: Facture ) => this.facture = value;
  deleteCommandeProduit(itemFP: CommandeProduit): void {
    this.item.commandeProduit = this.item.commandeProduit?.filter(item => item !== itemFP);
  }
  public get itemCP(): CommandeProduit {
    return this.commandeProduitService.item;
  }
  public get addressFacturation(): Adresse {
    if (this.item.addressFacturation == null)
      this.item.addressFacturation = new Adresse()
    return this.item.addressFacturation;
  }
  public set addressFacturation(value: Adresse ) {
    this.item.addressFacturation = value;
  }

  protected addressFacturationGetter = () => this.addressFacturation;
  protected addressFacturationSetter = (value: Adresse ) => this.addressFacturation = value;

  public get addressExpedition(): Adresse {
    if (this.item.addressExpedition == null)
      this.item.addressExpedition = new Adresse()
    return this.item.addressExpedition;
  }
  public set addressExpedition(value: Adresse ) {
    this.item.addressExpedition = value;
  }

  protected addressExpeditionGetter = () => this.addressExpedition;
  protected addressExpeditionSetter = (value: Adresse ) => this.addressExpedition = value;

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


  public get client(): Client {
    if (this.item.client == null)
      this.item.client = new Client()
    return this.item.client;
  }
  public set client(value: Client ) {
    this.item.client = value;
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
  public navigateToClientCreate() {
    this.clientService.returnUrl = this.router.url
    this.service.keepData = true
    this.router.navigate(['/contacts/client/create']).then()
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
    protected statutCommandeEnumList = Object.values(StatutCommandeEnum)
  cancel(){
    this.item = new Commande();
  }
  retour(){
    this.router.navigate(['/pays/pays/list']).then()
  }
}
