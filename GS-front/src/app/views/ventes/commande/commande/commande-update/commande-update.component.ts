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


import {CommandeService} from "src/app/controller/services/ventes/commande/commande.service";
import {Commande} from "src/app/controller/entities/ventes/commande/commande";
import {CommandeValidator} from "src/app/controller/validators/ventes/commande/commande.validator";
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
import {FactureUpdateComponent} from "src/app/views/ventes/facture/facture/facture-update/facture-update.component";
import {FactureValidator} from "src/app/controller/validators/ventes/facture/facture.validator";
import {AdresseUpdateComponent} from "src/app/views/adresse/adresse/adresse-update/adresse-update.component";
import {AdresseValidator} from "src/app/controller/validators/adresse/adresse.validator";
import {TypeRabaisEnum} from "src/app/controller/enums/type-rabais-enum";
import {StatutCommandeEnum} from "src/app/controller/enums/statut-commande-enum";
import {EntrepriseSelectedService} from "../../../../../controller/shared/entreprise-selected.service";
import {EmployeService} from "../../../../../controller/services/contacts/user/employe.service";
import {UserInfosService} from "../../../../../controller/shared/user-infos.service";
import {TokenService} from "../../../../../controller/auth/services/token.service";
import {Employe} from "../../../../../controller/entities/contacts/user/employe";

@Component({
  selector: 'app-commande-update',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent, NgTemplateOutlet,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, FormCheckComponent, SpinnerComponent,
    FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent, IconDirective,
    FactureUpdateComponent, AdresseUpdateComponent,
  ],
  templateUrl: './commande-update.component.html',
  styleUrl: './commande-update.component.scss'
})
export class CommandeUpdateComponent {
  protected isPartOfUpdateForm = false // true if it is used as part of other update component
  protected sending = false
  protected resetting = false
  protected standAlon = true
  filteredClientList: Client[] = [];

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
  private entrepriseSelectedService = inject(EntrepriseSelectedService);
  private employeService = inject(EmployeService);
  private userInfosService = inject(UserInfosService);
  private tokenService = inject(TokenService);

  protected validator = CommandeValidator.init(() => this.item)


  protected taxeList!: Taxe[]
  protected clientList!: Client[]
  protected devisesList!: Devises[]
  protected niveauPrixList!: NiveauPrix[]
  protected entrepriseList!: Entreprise[]
  public entreprises!: Entreprise[];


  ngAfterContentInit() {
    if (!this.isPartOfUpdateForm && this.item.id == null) this.router.navigate(["/ventes/commande/commande"]).then()
  }

  ngOnInit() {
    if(this.service.keepData) {
      let taxeCreated = this.taxeService.createdItemAfterReturn;
      if (taxeCreated.created) {
        this.item.taxe = taxeCreated.item
      //  this.validator.taxe.validate()
      }
      let taxeExpeditionCreated = this.taxeService.createdItemAfterReturn;
      if (taxeExpeditionCreated.created) {
        this.item.taxeExpedition = taxeExpeditionCreated.item
       // this.validator.taxeExpedition.validate()
      }
      let clientCreated = this.clientService.createdItemAfterReturn;
      if (clientCreated.created) {
        this.item.client = clientCreated.item
        this.validator.client.validate()
      }
      let devisesCreated = this.devisesService.createdItemAfterReturn;
      if (devisesCreated.created) {
        this.item.devises = devisesCreated.item
       // this.validator.devises.validate()
      }
      let niveauPrixCreated = this.niveauPrixService.createdItemAfterReturn;
      if (niveauPrixCreated.created) {
        this.item.niveauPrix = niveauPrixCreated.item
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
    console.log(this.item)
    if (!this.validator.validate()) return;
    this.sending = true;
    this.service.update().subscribe({
      next: data => {
        this.sending = false
        if (data == null) return
        this.router.navigate(["/ventes/commande/commande"]).then()
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

  public get item(): Commande {
    return this.itemGetter();
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

  protected factureGetter = () => this.facture;
  protected factureSetter = (value: Facture ) => this.facture = value;

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
    protected statutCommandeEnumList = Object.values(StatutCommandeEnum)
  cancel(){
    this.item = new Commande();
  }
  retour(){
    this.router.navigate(['/pays/pays/list']).then()
  }
}
