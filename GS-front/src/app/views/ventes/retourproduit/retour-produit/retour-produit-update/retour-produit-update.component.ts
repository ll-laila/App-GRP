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


import {RetourProduitService} from "src/app/controller/services/ventes/retourproduit/retour-produit.service";
import {RetourProduit} from "src/app/controller/entities/ventes/retourproduit/retour-produit";
import {RetourProduitValidator} from "src/app/controller/validators/ventes/retourproduit/retour-produit.validator";
import {ClientService} from "src/app/controller/services/contacts/client.service";
import {Client} from "src/app/controller/entities/contacts/client";

import {NoteCredit} from "src/app/controller/entities/ventes/notecredit/note-credit";

import {Remboursement} from "src/app/controller/entities/ventes/remboursement/remboursement";
import {RetourProduitProduitService} from "src/app/controller/services/ventes/retourproduit/retour-produit-produit.service";
import {RetourProduitProduit} from "src/app/controller/entities/ventes/retourproduit/retour-produit-produit";
import {EntrepriseService} from "src/app/controller/services/parametres/entreprise.service";
import {Entreprise} from "src/app/controller/entities/parametres/entreprise";

import {StatutRetourProduitEnum} from "src/app/controller/enums/statut-retour-produit-enum";
import {EntrepriseSelectedService} from "../../../../../controller/shared/entreprise-selected.service";
import {Employe} from "../../../../../controller/entities/contacts/user/employe";
import {UserInfosService} from "../../../../../controller/shared/user-infos.service";
import {TokenService} from "../../../../../controller/auth/services/token.service";
import {EmployeService} from "../../../../../controller/services/contacts/user/employe.service";

@Component({
  selector: 'app-retour-produit-update',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent, NgTemplateOutlet,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, FormCheckComponent, SpinnerComponent,
    FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent, IconDirective,
  ],
  templateUrl: './retour-produit-update.component.html',
  styleUrl: './retour-produit-update.component.scss'
})
export class RetourProduitUpdateComponent {
  protected isPartOfUpdateForm = false // true if it is used as part of other update component
  protected sending = false
  protected resetting = false
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
  private entrepriseService = inject(EntrepriseService)
  private userInfosService = inject(UserInfosService);
  private tokenService = inject(TokenService);
  private employeService = inject(EmployeService);
  private entrepriseSelectedService = inject(EntrepriseSelectedService);


  protected validator = RetourProduitValidator.init(() => this.item)
    //.setNoteCredit(NoteCreditValidator.init(() => this.noteCredit))
    //.setRemboursements(RemboursementValidator.init(() => this.remboursements))

  protected clientList!: Client[]
  protected entrepriseList!: Entreprise[]
  public entreprises!: Entreprise[];

  ngAfterContentInit() {
    if (!this.isPartOfUpdateForm && this.item.id == null) this.router.navigate(["/ventes/retourproduit/retour-produit"]).then()
  }

  ngOnInit() {

    if(this.service.keepData) {
      let clientCreated = this.clientService.createdItemAfterReturn;
      if (clientCreated.created) {
        this.item.client = clientCreated.item
        this.validator.client.validate()
      }

    } else { this.validator.reset() }

    this.loadEntrepriseList()
    const newVar = this.tokenService.getRole()?.some(it => it == "ADMIN") ? 1 : 0;

    if (newVar == 1) {
      this.getClientsForAdmin();
    } else {
      this.getClientsForEmploye();
    }
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

  // METHODS
  update() {
    console.log(this.item)
    if (!this.validator.validate()) return;
    this.sending = true;
    this.service.update().subscribe({
      next: data => {
        this.sending = false
        if (data == null) return
        this.router.navigate(["/ventes/retourproduit/retour-produit"]).then()
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

  public get item(): RetourProduit {
    return this.itemGetter();
  }

  public set item(value: RetourProduit ) {
    this.itemSetter(value);
  }

  private itemGetter(): RetourProduit {
    return this.service.item;
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



  public navigateToClientCreate() {
    this.clientService.returnUrl = this.router.url
    this.router.navigate(['/contacts/client/create']).then()
  }
  public navigateToEntrepriseCreate() {
    this.entrepriseService.returnUrl = this.router.url
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
}
