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


import {EmployeService} from "src/app/controller/services/contacts/user/employe.service";
import {Employe} from "src/app/controller/entities/contacts/user/employe";
import {EmployeValidator} from "src/app/controller/validators/contacts/user/employe.validator";
import {ValidatorResult} from "@bshg/validation";
import {Adresse} from "src/app/controller/entities/adresse/adresse";
import {EntrepriseService} from "src/app/controller/services/parametres/entreprise.service";
import {Entreprise} from "src/app/controller/entities/parametres/entreprise";
import {AdresseCreateComponent} from "src/app/views/adresse/adresse/adresse-create/adresse-create.component";
import {AdresseValidator} from "src/app/controller/validators/adresse/adresse.validator";
import {ToasterService} from "../../../../../toaster/controller/toaster.service";
import {RolesListComponent} from "../roles-list/roles-list.component";
import * as bootstrap from 'bootstrap';
import {PermissionsAcces} from "../../../../../controller/entities/contacts/user/PermissionsAcces";
import {EntrepriseSelectedService} from "../../../../../controller/shared/entreprise-selected.service";
import {UserInfosService} from "../../../../../controller/shared/user-infos.service";

@Component({
  selector: 'app-employe-create',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective, NgTemplateOutlet,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, SpinnerComponent, IconDirective,
    FormCheckComponent, FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent,
    AdresseCreateComponent, TableDirective, RolesListComponent,
  ],
  templateUrl: './employe-create.component.html',
  styleUrl: './employe-create.component.scss'
})
export class EmployeCreateComponent {
  protected sending = false
  protected standAlon = true

  @Input() permissions: any = [];

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

  private router = inject(Router)
  private entrepriseSelectedService = inject(EntrepriseSelectedService);
  private userInfosService = inject(UserInfosService);
  private service = inject(EmployeService)
  private entrepriseService = inject(EntrepriseService)
  private formBuilder: FormBuilder= inject(FormBuilder)
  protected validator = EmployeValidator.init(() => this.item)
    .setAdresse(AdresseValidator.init(() => this.adresse))
  protected entrepriseList!: Entreprise[];
  protected selectedEntreprise!: Entreprise;
  private toasterService = inject(ToasterService)
  currentCodeNumber: number = 1;
  clientForm !: FormGroup;
  protected Entrep!: Entreprise;


  ngOnInit() {
    this.loadEntreprise();

    if(this.service.keepData) {
      // let entrepriseCreated = this.entrepriseService.createdItemAfterReturn;
      // if (entrepriseCreated.created) {
      //   this.item.entreprise = entrepriseCreated.item
      //   this.validator.entreprise.validate()
      // }
    } else { this.reset(false) }
    this.service.keepData = false
    this.item.adresse = new Adresse()

    this.loadEntrepriseList()

    this.clientForm = this.formBuilder.group({
      code: [{value: this.generateCode(), disabled: true}]

    })
    this.service.getNextCode().subscribe({
      next: value => this.item.code = value.code,
      error: err => console.log(err)
    })
  }



  generateCode(): string {
    return 'I' + this.currentCodeNumber.toString().padStart(7, '0');
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
    this.entrepriseService.findAllOptimized().subscribe({
      next: data => this.entrepriseList = data,
      error: err => console.log(err)
    })
  }



  // METHODS
  create() {
    console.log(this.item);
   // this.item.entreprisesAdroitAcces = [...this.item.entreprisesAdroitAcces,  this.Entrep];
    if (this.toasterService.validateThenToast(this.validator)) {
      return;
    }
    this.sending = true;
    this.item.admin = this.userInfosService.getUsername();
    this.service.create().subscribe({
      next: data => {
        this.sending = false
        if (data == null) return
        if (this.toReturn) {
          this.item = data
          this.router.navigate([this.returnUrl]).then()
          return;
        }
        this.item = new Employe()
        this.router.navigate(["/contacts/user/employe"]).then()
        this.toasterService.toast({message: "Un nouveau employe a été ajouté", color: "success"})
      },
      error: err => {
        this.sending = false
        console.log(err)
        this.validator.import(err.error as ValidatorResult< any>[])
      }
    })
  }

  public getEntrepriseById(id: number): void {
    this.entrepriseService.findById(id).subscribe(
        (data: Entreprise) => {
          this.Entrep = data;
        }
    );
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


  reset(force = true) {
    if (force || this.item == null) this.item = new Employe()
    this.validator.reset()
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

 public get returnUrl() {
    return this.service.returnUrl;
  }

  public get toReturn() {
    return this.service.toReturn();
  }

  public navigateToEntrepriseCreate() {
    this.entrepriseService.returnUrl = this.router.url
    this.service.keepData = true
    this.router.navigate(['/parametres/entreprise/create']).then()
  }
  cancel(){
    this.item = new Employe();
  }
  retour(){
    this.router.navigate(['/contacts/user/employe/list']).then()
  }



}
