import { Component, inject, Input } from '@angular/core';
import {
  FormSelectDirective, ColComponent, FormControlDirective,
  FormFloatingDirective, FormLabelDirective, RowComponent,
  CardComponent, CardBodyComponent, CardHeaderComponent, SpinnerComponent,
  InputGroupComponent, ButtonDirective, NavComponent, NavItemComponent,
  FormCheckComponent, FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent, TableDirective
} from "@coreui/angular";
import {FormBuilder, FormGroup, FormsModule} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {IconDirective} from "@coreui/icons-angular";
import {CommonModule, NgTemplateOutlet} from "@angular/common";


import {RetourProduitService} from "src/app/controller/services/ventes/retourproduit/retour-produit.service";
import {RetourProduit} from "src/app/controller/entities/ventes/retourproduit/retour-produit";
import {RetourProduitValidator} from "src/app/controller/validators/ventes/retourproduit/retour-produit.validator";
import {ValidatorResult} from "@bshg/validation";
import {ClientService} from "src/app/controller/services/contacts/client.service";
import {Client} from "src/app/controller/entities/contacts/client";
import {NoteCredit} from "src/app/controller/entities/ventes/notecredit/note-credit";
import {Remboursement} from "src/app/controller/entities/ventes/remboursement/remboursement";
import {RetourProduitProduitService} from "src/app/controller/services/ventes/retourproduit/retour-produit-produit.service";
import {RetourProduitProduit} from "src/app/controller/entities/ventes/retourproduit/retour-produit-produit";
import {EntrepriseService} from "src/app/controller/services/parametres/entreprise.service";
import {Entreprise} from "src/app/controller/entities/parametres/entreprise";

import {StatutRetourProduitEnum} from "src/app/controller/enums/statut-retour-produit-enum";
import {FactureService} from "../../../../../controller/services/ventes/facture/facture.service";
import {Facture} from "../../../../../controller/entities/ventes/facture/facture";
import {Produit} from "../../../../../controller/entities/produit/produit";
import {ProduitService} from "../../../../../controller/services/produit/produit.service";
import {DevisProduit} from "../../../../../controller/entities/ventes/devis/devis-produit";
import {FactureProduit} from "../../../../../controller/entities/ventes/facture/facture-produit";
import {ToasterService} from "../../../../../toaster/controller/toaster.service";
import {EntrepriseSelectedService} from "../../../../../controller/shared/entreprise-selected.service";
import {EmployeService} from "../../../../../controller/services/contacts/user/employe.service";
import {UserInfosService} from "../../../../../controller/shared/user-infos.service";
import {TokenService} from "../../../../../controller/auth/services/token.service";
import {Employe} from "../../../../../controller/entities/contacts/user/employe";


@Component({
  selector: 'app-retour-produit-create',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective, NgTemplateOutlet,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, SpinnerComponent, IconDirective,
    FormCheckComponent, FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent,
    TableDirective,CommonModule
  ],
  templateUrl: './retour-produit-create.component.html',
  styleUrl: './retour-produit-create.component.scss'
})
export class RetourProduitCreateComponent {

  protected sending = false
  protected standAlon = true

  @Input("getter") set setItemGetter(getter: () => RetourProduit) {
    this.itemGetter = getter
    this.standAlon = false
  }
  @Input("setter") set setItemSetter(setter: (value: RetourProduit ) => void) {
    this.itemSetter = setter
  }
  @Input("validator") set setValidator(validator: RetourProduitValidator) {
    this.validator = validator
  }

  private router = inject(Router)
  private service = inject(RetourProduitService)
  private clientService = inject(ClientService)
  private employeService = inject(EmployeService);
  private entrepriseService = inject(EntrepriseService)
  private formBuilder: FormBuilder= inject(FormBuilder)
  private factureService = inject(FactureService)
  private retourService = inject(RetourProduitService)
  private produitService = inject(ProduitService)
  private retourProduitProduitService = inject(RetourProduitProduitService)
  private toasterService = inject(ToasterService)
  private entrepriseSelectedService = inject(EntrepriseSelectedService);
  private userInfosService = inject(UserInfosService);
  private tokenService = inject(TokenService);
  private route = inject(ActivatedRoute);
  protected validator = RetourProduitValidator.init(() => this.item)
  protected clientList!: Client[]
  protected entrepriseList!: Entreprise[]
  protected produitList!: Produit[]
  public entreprises!: Entreprise[];
  protected _clientName: string = this.item.client?.nom ?? '';
  facturee!: Facture ;
  idFacture!: number;
  isClient !:boolean;
  ngOnInit() {
    // Récupération des paramètres de la route
    this.route.queryParams.subscribe(params => {
      this.idFacture = +params['idFacture']; // Assurez-vous que le paramètre est bien défini et converti en nombre
      // Trouver la facture par ID
      this.factureService.findById(this.idFacture).subscribe({
        next: (facture: Facture) => {
          this.facturee = facture;
          // Récupérer les données du client depuis la facture
          if (this.facturee && this.facturee.client && this.facturee.factureProduit) {
            this.item.client = this.facturee.client;
            if(this.item.client){
              this.isClient=true;
            }
            if(this.item.client.nom){this._clientName = this.item.client?.nom;
            }else{
              console.error('Name of Client is undefined or facture is undefined');
            }
          } else {
            console.error('Client is undefined or facture is undefined');
          }
        },
        error: err => console.log(err)
      });
    });

    this.loadEntreprise();
    if(this.service.keepData) {
      let clientCreated = this.clientService.createdItemAfterReturn;
      if (clientCreated.created) {
        this.item.client = clientCreated.item
        this.validator.client.validate()
      }

    } else { this.reset(false) }
    this.service.keepData = false
    this.item.noteCredit = new NoteCredit()
    this.item.remboursements = new Remboursement()

    this.loadEntrepriseList();
    this.factureretour();
    this.loadProduitList();
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



  loadEntreprise() {
    this.entrepriseService.findById(this.entrepriseSelectedService.getEntrepriseSelected()).subscribe({
      next: entreprise => {
        this.item.entreprise = entreprise;
        console.log("entre :",this.item.entreprise);
      },
      error: err => console.log(err)
    });
  }



  loadProduitList() {
    this.produitService.findByEntrepriseId(this.entrepriseSelectedService.getEntrepriseSelected()).subscribe({
      next: data => this.produitList = data,
      error: err => console.log(err)
    })
  }

  factureretour() {
    this.service.findByFactureId(this.itemF.id).subscribe({
      next: value => {
        this.item = value
      },
      error: err => {
        console.log(err)
      }
    })
  }
  deleteretourProduitProduit(itemRP: RetourProduitProduit): void {
    this.item.retourProduitProduit = this.item.retourProduitProduit?.filter(item => item !== itemRP);
  }

  deletefactureProduit(itemF: FactureProduit): void {
    this.facturee.factureProduit=  this.facturee.factureProduit?.filter(facturee => facturee !== itemF);
  }
  public get retourProduitProduit(): RetourProduitProduit[] {
    if (this.item.retourProduitProduit == null)
      this.item.retourProduitProduit = []
    return this.item.retourProduitProduit;
  }

  // LOAD DATA
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



  loadEntrepriseList() {
    this.entrepriseService.findById(this.entrepriseSelectedService.getEntrepriseSelected()).subscribe({
      next: entreprise => {
        this.item.entreprise = entreprise;
        console.log("entre :", this.item.entreprise);
      },
      error: err => console.log(err)
    });
  }


  public get itemRP(): RetourProduitProduit {
    return this.retourProduitProduitService.item;
  }

  public set itemRP(value: RetourProduitProduit) {
    this.retourProduitProduitService.item = value;
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
        this.item = new RetourProduit()
        this.router.navigate(["/ventes/retourproduit/retour-produit"]).then()
        this.toasterService.toast({message: "Un nouveau retour de produit a été ajouté", color: "success"})

      },
      error: err => {
        this.sending = false
        console.log(err)
        this.validator.import(err.error as ValidatorResult< any>[])
      }
    })
  }

  public addretourProduitProuits(produit: Produit): void {
    console.log(produit);
    if (this.item.retourProduitProduit == null) {
      this.item.retourProduitProduit = [];
    }

    let retourProduitProduit = new RetourProduitProduit();
    retourProduitProduit.produit = produit
    console.log("produit", produit);
    retourProduitProduit.quantite = 1
    produit.disponible = produit?.niveauStockInitial - retourProduitProduit?.quantite;
    console.log("disponible", produit.disponible);
    retourProduitProduit.disponible = produit.disponible
    console.log(retourProduitProduit.disponible);

    retourProduitProduit.prix = produit?.produitNiveauPrix?.filter(it => it.niveauPrix?.id == this.client?.niveauPrix?.id)[0]?.prix || produit.prixGros;
    console.log("client", this.client);
    console.log("niveau prix du client", this?.client.niveauPrix);
    console.log(retourProduitProduit.prix);
  //  retourProduitProduit.total = this.calculerTotal(retourProduitProduit);
    console.log(retourProduitProduit.total);

    this.item.retourProduitProduit = [...this.item.retourProduitProduit, retourProduitProduit]
    console.log(this.item.retourProduitProduit)
  }


  reset(force = true) {
    if (force || this.item == null) this.item = new RetourProduit()
    this.validator.reset()
  }
  // GETTERS AND SETTERS
  public get items() {
    return this.service.items;
  }

  public set items(value) {
    this.service.items = value;
  }

  public get item(): RetourProduit {
    return this.itemGetter();
  }
  public get itemF(): Facture {
    return this.itemGetterF();
  }

  public set item(value: RetourProduit ) {
    this.itemSetter(value);
  }

  private itemGetter(): RetourProduit {
    return this.service.item;
  }
  private itemGetterF(): Facture {
    return this.factureService.item;
  }

  private itemSetter(value: RetourProduit ) {
    this.service.item = value;
  }

  public get noteCredit(): NoteCredit {
    if (this.item.noteCredit == null)
      this.item.noteCredit = new NoteCredit()
    return this.item.noteCredit;
  }
  public set noteCredit(value: NoteCredit ) {
    this.item.noteCredit = value;
  }

  protected noteCreditGetter = () => this.noteCredit;
  protected noteCreditSetter = (value: NoteCredit ) => this.noteCredit = value;

  public get remboursements(): Remboursement {
    if (this.item.remboursements == null)
      this.item.remboursements = new Remboursement()
    return this.item.remboursements;
  }
  public set remboursements(value: Remboursement ) {
    this.item.remboursements = value;
  }

  protected remboursementsGetter = () => this.remboursements;
  protected remboursementsSetter = (value: Remboursement ) => this.remboursements = value;

  public get client(): Client {
    if (this.item.client == null)
      this.item.client = new Client()
    return this.item.client;
  }
  public set client(value: Client ) {
    this.item.client = value;
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

  public navigateToClientCreate() {
    this.clientService.returnUrl = this.router.url
    this.service.keepData = true
    this.router.navigate(['/contacts/client/create']).then()
  }
  public navigateToEntrepriseCreate() {
    this.entrepriseService.returnUrl = this.router.url
    this.service.keepData = true
    this.router.navigate(['/parametres/entreprise/create']).then()
  }
  cancel(){
    this.item = new RetourProduit();
  }
  retour(){
    this.router.navigate(['/pays/pays/list']).then()
  }

  ////
  protected statutRetourProduitEnumList = Object.values(StatutRetourProduitEnum)

  public get facture(): Facture {

    return this.retourService.facture
  }

}

