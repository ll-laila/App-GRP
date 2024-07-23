import { Component, inject, Input } from '@angular/core';
import {
  FormSelectDirective,
  ColComponent,
  FormControlDirective,
  FormFloatingDirective,
  FormLabelDirective,
  RowComponent,
  CardComponent,
  CardBodyComponent,
  CardHeaderComponent,
  SpinnerComponent,
  InputGroupComponent,
  ButtonDirective,
  NavComponent,
  NavItemComponent,
  FormCheckComponent,
  FormCheckLabelDirective,
  FormCheckInputDirective,
  FormFeedbackComponent,
  TableDirective,
  ModalComponent, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent
} from "@coreui/angular";
import {FormBuilder, FormGroup, FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {IconDirective} from "@coreui/icons-angular";
import {NgTemplateOutlet} from "@angular/common";


import {DevisService} from "src/app/controller/services/ventes/devis/devis.service";
import {Devis} from "src/app/controller/entities/ventes/devis/devis";
import {DevisValidator} from "src/app/controller/validators/ventes/devis/devis.validator";
import {ValidatorResult} from "@bshg/validation";
import {PaiementService} from "src/app/controller/services/ventes/paiement.service";
import {Paiement} from "src/app/controller/entities/ventes/paiement";
import {RetourProduitService} from "src/app/controller/services/ventes/retourproduit/retour-produit.service";
import {RetourProduit} from "src/app/controller/entities/ventes/retourproduit/retour-produit";
import {TaxeService} from "src/app/controller/services/parametres/taxe.service";
import {Taxe} from "src/app/controller/entities/parametres/taxe";
import {ClientService} from "src/app/controller/services/contacts/client.service";
import {Client} from "src/app/controller/entities/contacts/client";
import {DevisesService} from "src/app/controller/services/parametres/devises.service";
import {Devises} from "src/app/controller/entities/parametres/devises";
import {NiveauPrixService} from "src/app/controller/services/parametres/niveau-prix.service";
import {NiveauPrix} from "src/app/controller/entities/parametres/niveau-prix";
import {DevisProduitService} from "src/app/controller/services/ventes/devis/devis-produit.service";
import {DevisProduit} from "src/app/controller/entities/ventes/devis/devis-produit";
import {EntrepriseService} from "src/app/controller/services/parametres/entreprise.service";
import {Entreprise} from "src/app/controller/entities/parametres/entreprise";
import {PaiementCreateComponent} from "src/app/views/ventes/paiement/paiement-create/paiement-create.component";
import {PaiementValidator} from "src/app/controller/validators/ventes/paiement.validator";
import {RetourProduitCreateComponent} from "src/app/views/ventes/retourproduit/retour-produit/retour-produit-create/retour-produit-create.component";
import {RetourProduitValidator} from "src/app/controller/validators/ventes/retourproduit/retour-produit.validator";
import {TypeRabaisEnum} from "src/app/controller/enums/type-rabais-enum";
import {StatutDevisEnum} from "src/app/controller/enums/statut-devis-enum";
import {Produit} from "../../../../../controller/entities/produit/produit";
import {CommandeProduit} from "../../../../../controller/entities/ventes/commande/commande-produit";
import {ProduitService} from "../../../../../controller/services/produit/produit.service";
import {ToasterService} from "../../../../../toaster/controller/toaster.service";
import {EntrepriseSelectedService} from "../../../../../controller/shared/entreprise-selected.service";
import {Employe} from "../../../../../controller/entities/contacts/user/employe";
import {TokenService} from "../../../../../controller/auth/services/token.service";
import {UserInfosService} from "../../../../../controller/shared/user-infos.service";
import {EmployeService} from "../../../../../controller/services/contacts/user/employe.service";

@Component({
  selector: 'app-devis-create',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective, NgTemplateOutlet,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, SpinnerComponent, IconDirective,
    FormCheckComponent, FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent,
    PaiementCreateComponent, RetourProduitCreateComponent, TableDirective, ModalComponent, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent,
  ],
  templateUrl: './devis-create.component.html',
  styleUrl: './devis-create.component.scss'
})
export class DevisCreateComponent {
  protected sending = false
  protected standAlon = true
  protected produitList!: Produit[]

  @Input("getter") set setItemGetter(getter: () => Devis) {
    this.itemGetter = getter
    this.standAlon = false
  }
  @Input("setter") set setItemSetter(setter: (value: Devis ) => void) {
    this.itemSetter = setter
  }
  @Input("validator") set setValidator(validator: DevisValidator) {
    this.validator = validator
  }
  private toasterService = inject(ToasterService)

  private router = inject(Router)
  private service = inject(DevisService)
  private taxeService = inject(TaxeService)
  private clientService = inject(ClientService)
  private devisesService = inject(DevisesService)
  private niveauPrixService = inject(NiveauPrixService)
  private entrepriseService = inject(EntrepriseService)
  private devisProduitSevice = inject(DevisProduitService)
  private produitService = inject(ProduitService)
  private formBuilder: FormBuilder= inject(FormBuilder)
  private entrepriseSelectedService = inject(EntrepriseSelectedService);
  protected readonly TypeRabaisEnum = TypeRabaisEnum;
  private tokenService = inject(TokenService);
  private userInfosService = inject(UserInfosService);
  private employeService = inject(EmployeService);


  protected validator = DevisValidator.init(() => this.item)
   // .setPaiement(PaiementValidator.init(() => this.paiement))
    //.setRetourProduit(RetourProduitValidator.init(() => this.retourProduit))

  protected taxeList!: Taxe[]
  protected clientList!: Client[]
  protected devisesList!: Devises[]
  protected niveauPrixList!: NiveauPrix[]
  protected entrepriseList!: Entreprise[]
  public entreprises!: Entreprise[];

  ngOnInit() {

    this.loadEntreprise();

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
      let clientCreated = this.clientService.createdItemAfterReturn;
      if (clientCreated.created) {
        this.item.client = clientCreated.item
        this.validator.client.validate()
      }
      let devisesCreated = this.devisesService.createdItemAfterReturn;
      if (devisesCreated.created) {
        this.item.devises = devisesCreated.item
        this.validator.devises.validate()
      }
      let niveauPrixCreated = this.niveauPrixService.createdItemAfterReturn;
      if (niveauPrixCreated.created) {
        this.item.niveauPrix = niveauPrixCreated.item
      }

    } else { this.reset(false) }
    this.service.keepData = false
    this.item.paiement = new Paiement()
    this.item.retourProduit = new RetourProduit()

    this.loadTaxeList()
    this.loadDevisesList()
    this.loadNiveauPrixList()
    this.loadEntrepriseList()
    this.loadProduitList()

    const newVar = this.tokenService.getRole()?.some(it => it == "ADMIN") ? 1 : 0;

    if (newVar == 1) {
      this.getClientsForAdmin();
    } else {
      this.getClientsForEmploye();
    }

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
    this.produitService.findByEntrepriseId(this.entrepriseSelectedService.getEntrepriseSelected()).subscribe({
      next: data => this.produitList = data,
      error: err => console.log(err)
    })
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


  getClientsForAdmin() {
    if (this.entrepriseSelectedService.getEntrepriseSelected() != 0) {
      this.clientService.getClients(this.entrepriseSelectedService.getEntrepriseSelected()).subscribe({
        next: data => {
          this.clientList = data;
          console.log("Clients :",data);
        },
        error: err => console.log(err)
      })
    } else {
      this.entrepriseService.findByAdmin(this.userInfosService.getUsername()).subscribe((res: Entreprise[]) => {
        this.entreprises = res
        console.log("Entreprises: ", this.entreprises);
        if (this.entreprises && this.entreprises.length > 0) {
          this.clientService.getClients(this.entreprises[0].id).subscribe({
            next: data => {
              this.clientList = data;
              console.log("Clients :",data);
            },
            error: err => console.log(err)
          })
        } else {
          console.log('Aucune entreprise trouvée.');
        }
      }, error => {
        console.log(error);
      });
    }
  }


  getClientsForEmploye() {
    if (this.entrepriseSelectedService.getEntrepriseSelected() != 0) {
      this.clientService.getClients(this.entrepriseSelectedService.getEntrepriseSelected()).subscribe({
        next: data => {
          this.clientList = data;
          console.log("Clients :",data);
        },
        error: err => console.log(err)
      })
    } else {
      this.employeService.findByUserName(this.userInfosService.getUsername()).subscribe((res: Employe) => {
        console.log("empId: ", res.id);
        this.entrepriseService.findEntreprisesAdroitAcces(res.id).subscribe((reslt: Entreprise[]) => {
          this.entreprises = reslt;
          console.log("EntreprisesÀdroit: ", this.entreprises);
          if (this.entreprises && this.entreprises.length > 0) {
            this.clientService.getClients(this.entrepriseSelectedService.getEntrepriseSelected()).subscribe({
              next: data => {
                this.clientList = data;
                console.log("Clients :",data);
              },
              error: err => console.log(err)
            })
          }
        }, error => {
          console.log(error);
        });
      }, error => {
        console.log(error);
      });
    }
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
    if (!this.validator.validate()) {
      console.log(this.validator);
      return;
    }
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
        this.router.navigate(["/ventes/devis/devis/devisautre"]).then()
        this.toasterService.toast({message: "Un nouveau devis a été ajouté", color: "success"})

      },
      error: err => {
        this.sending = false
        console.log(err)
        this.validator.import(err.error as ValidatorResult< any>[])
      }
    })
  }

  reset(force = true) {
    if (force || this.item == null) this.item = new Devis()
    this.validator.reset()
  }

  // GETTERS AND SETTERS
  public get items() {
    return this.service.items;
  }

  public set items(value) {
    this.service.items = value;
  }

  public get item(): Devis {
    return this.itemGetter();
  }

  public set item(value: Devis ) {
    this.itemSetter(value);
  }

  private itemGetter(): Devis {
    return this.service.item;
  }

  private itemSetter(value: Devis ) {
    this.service.item = value;
  }

  public get paiement(): Paiement {
    if (this.item.paiement == null)
      this.item.paiement = new Paiement()
    return this.item.paiement;
  }
  public set paiement(value: Paiement ) {
    this.item.paiement = value;
  }

  protected paiementGetter = () => this.paiement;
  protected paiementSetter = (value: Paiement ) => this.paiement = value;

  public get retourProduit(): RetourProduit {
    if (this.item.retourProduit == null)
      this.item.retourProduit = new RetourProduit()
    return this.item.retourProduit;
  }
  public set retourProduit(value: RetourProduit ) {
    this.item.retourProduit = value;
  }

  protected retourProduitGetter = () => this.retourProduit;
  protected retourProduitSetter = (value: RetourProduit ) => this.retourProduit = value;

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

  public get devisProduit(): DevisProduit[] {
    if (this.item.devisProduit == null)
      this.item.devisProduit = []
    return this.item.devisProduit;
  }
  deleteDevisProduit(itemDP: DevisProduit): void {
    this.item.devisProduit = this.item.devisProduit?.filter(item => item !== itemDP);
  }
  calculerSommeSousTotal(devieProduits: DevisProduit[]): string {
    const somme = devieProduits.reduce((total, devieProduit) => {
      if (devieProduit?.quantite && devieProduit?.prix) {
        return total + (devieProduit.quantite * devieProduit.prix);
      } else {
        return total;
      }
    }, 0);
    this.item.sousTotal = somme
    return somme.toFixed(2);
  }
  calculerSommeTotale(devieProduitList: DevisProduit[]): number {
    const sommeTotale = devieProduitList.reduce((somme, devieProduit) => {
      const total = this.calculerTotal(devieProduit);
      console.log(`Total pour ${devieProduit.produit?.nom}: ${total}`);
      return somme + total;
    }, 0);

    const sommeTotaleFormatee = parseFloat(sommeTotale.toFixed(2));
    console.log(`Somme totale formatée: ${sommeTotaleFormatee}`);
    this.item.total = sommeTotaleFormatee;
    return sommeTotaleFormatee;
  }
  calculerSommeQuantite(devieProduitList: DevisProduit[]): number {
    let number = devieProduitList.reduce((sommeQuantite, devieProduit) => {
      return sommeQuantite + (devieProduit.quantite || 0);
    }, 0);
    this.item.totalUnites = number
    return number;
  }


  calculerTotal(  devisProduit: DevisProduit):number {

    console.log(this.item)
    if (devisProduit.produit) {      console.log("...............")
      let prixProduit = 0;
      devisProduit?.produit?.produitNiveauPrix?.forEach(e => {
        if(this.item.niveauPrix?.id == e.niveauPrix?.id) {
          console.log("hello");
          prixProduit =  e.prix;
        }

      });
      console.log("prixProduit",prixProduit)
      let sousTotal = devisProduit.quantite * prixProduit;
      console.log("sousTotal",sousTotal)
      let taxeProduit = devisProduit.produit.taxe ? devisProduit.produit.taxe?.tauxImposition : 0.0;
      console.log("taxeProduit",taxeProduit)
      let taxeFacture =this.taxeList?.filter(it => it.id == this.item.taxe?.id)[0]?.tauxImposition;
      console.log(this.item.taxe)
      let taxeExpedition = devisProduit?.devis?.taxeExpedition != null ? devisProduit?.devis?.taxeExpedition?.tauxImposition : 0.0;
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


  public addDevieProuits(produit: Produit): void {
    console.log(produit);
    if (this.item.devisProduit == null) {
      this.item.devisProduit = [];
    }

    // this.produitniveauxPrix.findByProduitId(produit.id).subscribe(data => produit.produitNiveauPrix = data);
    let devisProduit = new DevisProduit();
    devisProduit.produit = produit
    console.log("produit",produit);
    devisProduit.disque = 0
    devisProduit.quantite = 1
    produit.disponible = produit?.niveauStockInitial - devisProduit?.quantite;
    console.log("disponible",produit.disponible);
    devisProduit.disponible = produit.disponible
    console.log(devisProduit.disponible);
    // factureProduit.prix = produit.produitNiveauPrix?.filter(it => it.niveauPrix?.id == this.item.niveauPrix?.id)[0]?.prix

    devisProduit.prix = produit?.produitNiveauPrix?.filter(it => it.niveauPrix?.id == this?.client?.niveauPrix?.id)[0]?.prix || produit.prixGros;


    console.log( "niveau prix du client",this?.client?.niveauPrix?.id);
    console.log(devisProduit.prix);
    devisProduit.total = this.calculerTotal(this.itemDP);
    console.log(devisProduit.total);

    this.item.devisProduit = [...this.item.devisProduit, devisProduit]
    console.log(this.item.devisProduit)
  }
  public get returnUrl() {
    return this.service.returnUrl;
  }
  public get itemDP(): DevisProduit {
    return this.devisProduitSevice.item;
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
    protected statutDevisEnumList = Object.values(StatutDevisEnum)
  cancel(){
    this.item = new Devis();
  }
  retour(){
    this.router.navigate(['/pays/pays/list']).then()
  }
  printReport(): void {
    window.print();
  }

}
