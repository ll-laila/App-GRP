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
import {NgTemplateOutlet} from "@angular/common";


import {EmployeService} from "src/app/controller/services/contacts/user/employe.service";
import {Employe} from "src/app/controller/entities/contacts/user/employe";
import {EmployeValidator} from "src/app/controller/validators/contacts/user/employe.validator";
import {AdresseService} from "src/app/controller/services/adresse/adresse.service";
import {Adresse} from "src/app/controller/entities/adresse/adresse";
import {DestinataireEmployeService} from "src/app/controller/services/parametres/destinataire-employe.service";
import {DestinataireEmploye} from "src/app/controller/entities/parametres/destinataire-employe";
import {EntrepriseService} from "src/app/controller/services/parametres/entreprise.service";
import {Entreprise} from "src/app/controller/entities/parametres/entreprise";
import {AdresseUpdateComponent} from "src/app/views/adresse/adresse/adresse-update/adresse-update.component";
import {AdresseValidator} from "src/app/controller/validators/adresse/adresse.validator";
import {RolesListComponent} from "../roles-list/roles-list.component";
import * as bootstrap from "bootstrap";
import {PermissionsAcces} from "../../../../../controller/entities/contacts/user/PermissionsAcces";
import {EntrepriseSelectedService} from "../../../../../controller/shared/entreprise-selected.service";

@Component({
  selector: 'app-employe-update',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent, NgTemplateOutlet,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, FormCheckComponent, SpinnerComponent,
    FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent, IconDirective,
    AdresseUpdateComponent, RolesListComponent, TableDirective,
  ],
  templateUrl: './employe-update.component.html',
  styleUrl: './employe-update.component.scss'
})
export class EmployeUpdateComponent {
  protected isPartOfUpdateForm = false // true if it is used as part of other update component
  protected sending = false
  protected resetting = false
  protected standAlon = true

  @Input("getter") set setItemGetter(getter: () => Employe) {
    this.itemGetter = getter
    this.standAlon = false
  }
  @Input("setter") set setItemSetter(setter: (value: Employe ) => void) {
    this.itemSetter = setter
  }
  @Input("validator") set setValidator(validator: EmployeValidator) {
    this.validator = validator
  }

  @Input() permissions: any = [];


  private router = inject(Router)
  private service = inject(EmployeService)
  private entrepriseService = inject(EntrepriseService)

  private entrepriseSelectedService = inject(EntrepriseSelectedService)

  protected validator = EmployeValidator.init(() => this.item)
    .setAdresse(AdresseValidator.init(() => this.adresse))

  protected entrepriseList!: Entreprise[];
  protected selectedEntreprise!: Entreprise;


  ngAfterContentInit() {
    if (!this.isPartOfUpdateForm && this.item.id == null) this.router.navigate(["/contacts/user/employe"]).then()
  }

  ngOnInit() {
    this.loadEntreprise();

    if(this.service.keepData) {

    } else { this.validator.reset() }


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


  loadEntrepriseList() {
    this.entrepriseService.findAll().subscribe({
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
        this.router.navigate(["/contacts/user/employe"]).then()
      },
      error: err => {
        this.sending = false
        console.log(err)
      }
    })
  }



  public addToPermessions(entreprise: Entreprise): void {
    if (this.item.entreprisesAdroitAcces == null) {
      this.item.entreprisesAdroitAcces = [];
    }
    this.item.entreprisesAdroitAcces = [...this.item.entreprisesAdroitAcces, entreprise];
    console.log(this.item.entreprisesAdroitAcces);
  }

  removeFromPermissions(entreprise: Entreprise) {
    this.item.entreprisesAdroitAcces = this.item.entreprisesAdroitAcces?.filter(e => e !== entreprise);
  }


  openRolesModal(item: any) {
    this.selectedEntreprise = item;
    const modalElement = document.getElementById('confirmationModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }


  handleRoles(confirmedPermissions: any) {
    this.permissions = confirmedPermissions;
    this.item.permissionsAcces = this.permissions.map((permission: { nom: string | undefined; etat: boolean; entrepriseId: number; }) => {
      const access = new PermissionsAcces();
      access.nom = permission.nom;
      access.etat = permission.etat;
      access.entrepriseId = this.selectedEntreprise.id;
      return access;
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
  public get entreprisesAdroitAcces(): Entreprise[] {
    if (this.item.entreprisesAdroitAcces == null)
      this.item.entreprisesAdroitAcces = []
    return this.item.entreprisesAdroitAcces;
  }
  public set entreprisesAdroitAcces(value: Entreprise[]) {
    this.item.entreprisesAdroitAcces = value;
  }

  public get permissionsAcces(): PermissionsAcces[] {
    if (this.item.permissionsAcces == null)
      this.item.permissionsAcces = []
    return this.item.permissionsAcces;
  }
  public set permissionsAcces(value: PermissionsAcces[]) {
    this.item.permissionsAcces = value;
  }
  public get items() {
    return this.service.items;
  }

  public set items(value) {
    this.service.items = value;
  }

  public get item(): Employe {
    return this.itemGetter();
  }

  public set item(value: Employe ) {
    this.itemSetter(value);
  }

  private itemGetter(): Employe {
    return this.service.item;
  }

  private itemSetter(value: Employe ) {
    this.service.item = value;
  }

  public get adresse(): Adresse {
    if (this.item.adresse == null)
      this.item.adresse = new Adresse()
    return this.item.adresse;
  }
  public set adresse(value: Adresse ) {
    this.item.adresse = value;
  }

  protected adresseGetter = () => this.adresse;
  protected adresseSetter = (value: Adresse ) => this.adresse = value;

  public get entreprise(): Entreprise {
    if (this.item.entreprise == null)
      this.item.entreprise = new Entreprise()
    return this.item.entreprise;
  }
  public set entreprise(value: Entreprise ) {
    this.item.entreprise = value;
  }



  public navigateToEntrepriseCreate() {
    this.entrepriseService.returnUrl = this.router.url
    this.router.navigate(['/parametres/entreprise/create']).then()
  }
  cancel(){
    this.item = new Employe();
  }
  ////
}
