import { Component, inject, Input } from '@angular/core';
import {
  FormSelectDirective, ColComponent, FormControlDirective,
  FormFloatingDirective, FormLabelDirective, RowComponent,
  CardComponent, CardBodyComponent, CardHeaderComponent, SpinnerComponent,
  InputGroupComponent, ButtonDirective, NavComponent, NavItemComponent,
  FormCheckComponent, FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent
} from "@coreui/angular";
import {FormBuilder, FormGroup, FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {IconDirective} from "@coreui/icons-angular";
import {NgTemplateOutlet} from "@angular/common";


import {EmployeService} from "src/app/controller/services/contacts/user/employe.service";
import {Employe} from "src/app/controller/entities/contacts/user/employe";
import {EmployeValidator} from "src/app/controller/validators/contacts/user/employe.validator";
import {ValidatorResult} from "@bshg/validation";
import {AdresseService} from "src/app/controller/services/adresse/adresse.service";
import {Adresse} from "src/app/controller/entities/adresse/adresse";
import {DestinataireEmployeService} from "src/app/controller/services/parametres/destinataire-employe.service";
import {DestinataireEmploye} from "src/app/controller/entities/parametres/destinataire-employe";
import {EntrepriseService} from "src/app/controller/services/parametres/entreprise.service";
import {Entreprise} from "src/app/controller/entities/parametres/entreprise";
import {AdresseCreateComponent} from "src/app/views/adresse/adresse/adresse-create/adresse-create.component";
import {AdresseValidator} from "src/app/controller/validators/adresse/adresse.validator";
import {ToasterService} from "../../../../../toaster/controller/toaster.service";

@Component({
  selector: 'app-employe-create',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective, NgTemplateOutlet,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, SpinnerComponent, IconDirective,
    FormCheckComponent, FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent,
    AdresseCreateComponent,
  ],
  templateUrl: './employe-create.component.html',
  styleUrl: './employe-create.component.scss'
})
export class EmployeCreateComponent {
  protected sending = false
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

  private router = inject(Router)
  private service = inject(EmployeService)
  private entrepriseService = inject(EntrepriseService)
  private formBuilder: FormBuilder= inject(FormBuilder)

  protected validator = EmployeValidator.init(() => this.item)
    .setAdresse(AdresseValidator.init(() => this.adresse))

  protected entrepriseList!: Entreprise[]
  private toasterService = inject(ToasterService)

  ngOnInit() {
    if(this.service.keepData) {
      let entrepriseCreated = this.entrepriseService.createdItemAfterReturn;
      if (entrepriseCreated.created) {
        this.item.entreprise = entrepriseCreated.item
        this.validator.entreprise.validate()
      }

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
  currentCodeNumber: number = 1;

  clientForm !: FormGroup;
  generateCode(): string {
    return 'I' + this.currentCodeNumber.toString().padStart(7, '0');
  }

  // LOAD DATA
  loadEntrepriseList() {
    this.entrepriseService.findAllOptimized().subscribe({
      next: data => this.entrepriseList = data,
      error: err => console.log(err)
    })
  }

  // METHODS
  create() {
    console.log(this.item)
    if (this.toasterService.validateThenToast(this.validator)) {
      return;
    }
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

  reset(force = true) {
    if (force || this.item == null) this.item = new Employe()
    this.validator.reset()
  }

  // GETTERS AND SETTERS
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
  ////
}
