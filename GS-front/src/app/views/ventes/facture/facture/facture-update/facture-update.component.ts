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


import {FactureService} from "src/app/controller/services/ventes/facture/facture.service";
import {Facture} from "src/app/controller/entities/ventes/facture/facture";
import {FactureValidator} from "src/app/controller/validators/ventes/facture/facture.validator";
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
import {AdresseService} from "src/app/controller/services/adresse/adresse.service";
import {Adresse} from "src/app/controller/entities/adresse/adresse";
import {FactureProduitService} from "src/app/controller/services/ventes/facture/facture-produit.service";
import {FactureProduit} from "src/app/controller/entities/ventes/facture/facture-produit";
import {EntrepriseService} from "src/app/controller/services/parametres/entreprise.service";
import {Entreprise} from "src/app/controller/entities/parametres/entreprise";
import {PaiementUpdateComponent} from "src/app/views/ventes/paiement/paiement-update/paiement-update.component";
import {PaiementValidator} from "src/app/controller/validators/ventes/paiement.validator";
import {RetourProduitUpdateComponent} from "src/app/views/ventes/retourproduit/retour-produit/retour-produit-update/retour-produit-update.component";
import {RetourProduitValidator} from "src/app/controller/validators/ventes/retourproduit/retour-produit.validator";
import {AdresseUpdateComponent} from "src/app/views/adresse/adresse/adresse-update/adresse-update.component";
import {AdresseValidator} from "src/app/controller/validators/adresse/adresse.validator";
import {TypeRabaisEnum} from "src/app/controller/enums/type-rabais-enum";
import {StatutFactureEnum} from "src/app/controller/enums/statut-facture-enum";
import {Employe} from "../../../../../controller/entities/contacts/user/employe";
import {TokenService} from "../../../../../controller/auth/services/token.service";
import {UserInfosService} from "../../../../../controller/shared/user-infos.service";
import {EntrepriseSelectedService} from "../../../../../controller/shared/entreprise-selected.service";
import {EmployeService} from "../../../../../controller/services/contacts/user/employe.service";

@Component({
  selector: 'app-facture-update',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent, NgTemplateOutlet,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, FormCheckComponent, SpinnerComponent,
    FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent, IconDirective,
    PaiementUpdateComponent, RetourProduitUpdateComponent, AdresseUpdateComponent,
  ],
  templateUrl: './facture-update.component.html',
  styleUrl: './facture-update.component.scss'
})
export class FactureUpdateComponent {
  protected isPartOfUpdateForm = false // true if it is used as part of other update component
  protected sending = false
  protected resetting = false
  protected standAlon = true

  @Input("getter") set setItemGetter(getter: () => Facture) {
    this.itemGetter = getter
    this.standAlon = false
  }
  @Input("setter") set setItemSetter(setter: (value: Facture ) => void) {
    this.itemSetter = setter
  }
  @Input("validator") set setValidator(validator: FactureValidator) {
    this.validator = validator
  }

  private router = inject(Router)
  private service = inject(FactureService)
  private taxeService = inject(TaxeService)
  private clientService = inject(ClientService)
  private devisesService = inject(DevisesService)
  private niveauPrixService = inject(NiveauPrixService)
  private entrepriseService = inject(EntrepriseService)
  private employeService = inject(EmployeService);
  private paiemeentService = inject(PaiementService)
  private tokenService = inject(TokenService);
  private userInfosService = inject(UserInfosService);
  private entrepriseSelectedService = inject(EntrepriseSelectedService);

  protected validator = FactureValidator.init(() => this.item)
   .setPaiement(PaiementValidator.init(() => this.paiement))

  protected taxeList!: Taxe[]
  protected clientList!: Client[]
  protected devisesList!: Devises[]
  protected niveauPrixList!: NiveauPrix[]
  protected entrepriseList!: Entreprise[]
  filteredClientList: Client[] = [];
  public entreprises!: Entreprise[];

  ngAfterContentInit() {
    if (!this.isPartOfUpdateForm && this.item.id == null) this.router.navigate(["/ventes/facture/facture"]).then()
  }

  ngOnInit() {
    if(this.service.keepData) {
      let taxeCreated = this.taxeService.createdItemAfterReturn;
      if (taxeCreated.created) {
        this.item.taxe = taxeCreated.item
        this.validator.taxe.validate()
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
    } else { this.validator.reset() }

    this.loadTaxeList()
    this.loadDevisesList()
    this.loadNiveauPrixList()
    this.loadEntrepriseList()

    const newVar = this.tokenService.getRole()?.some(it => it == "ADMIN") ? 1 : 0;

    if (newVar == 1) {
      this.getClientsForAdmin();
    } else {
      this.getClientsForEmploye();
    }


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
      next: data => {
        // Filter out clients already associated with this command
        this.filteredClientList = data.filter(client => client.id !== this.item.client?.id);
        // Optionally, you can set the original list for other purposes
        this.clientList = data;
      },
      error: err => console.log(err)
    })
  }


  getClientsForAdmin() {
    if (this.entrepriseSelectedService.getEntrepriseSelected() != 0) {
      this.clientService.getClients(this.entrepriseSelectedService.getEntrepriseSelected()).subscribe({
        next: data => {
          this.filteredClientList = data.filter(client => client.id !== this.item.client?.id);
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
              this.filteredClientList = data.filter(client => client.id !== this.item.client?.id);
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
          this.filteredClientList = data.filter(client => client.id !== this.item.client?.id);
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
                this.filteredClientList = data.filter(client => client.id !== this.item.client?.id);
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
  update() {
    console.log('Facture avant mise à jour:', this.item);
    if (!this.validator.validate()) {
      console.log('Validation échouée');
      return;
    }
    this.sending = true;
    this.service.update().subscribe({
      next: data => {
        this.sending = false;
        if (data == null) return;
        console.log('Facture mise à jour:', data);
        this.router.navigate(["/ventes/facture/facture"]).then();
      },
      error: err => {
        this.sending = false;
        console.log(err);
      }
    });
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

  public get item(): Facture {
    return this.itemGetter();
  }

  public set item(value: Facture ) {
    this.itemSetter(value);
  }

  private itemGetter(): Facture {
    return this.service.item;
  }

  private itemSetter(value: Facture ) {
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



  public navigateToTaxeCreate() {
    this.taxeService.returnUrl = this.router.url
    this.router.navigate(['/parametres/taxe/create']).then()
  }
  public navigateToClientCreate() {
    this.clientService.returnUrl = this.router.url
    this.router.navigate(['/contacts/client/create']).then()
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
    protected statutFactureEnumList = Object.values(StatutFactureEnum)
  cancel(){
    this.item = new Facture();
  }
  retour(){
    this.router.navigate(['/pays/pays/list']).then()
  }
}
