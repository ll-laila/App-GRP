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
    InputType,
    InputGroupTextDirective
} from "@coreui/angular";
import {FormBuilder, FormGroup, FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {IconDirective} from "@coreui/icons-angular";
import {NgTemplateOutlet} from "@angular/common";


import {ClientService} from "src/app/controller/services/contacts/client.service";
import {Client} from "src/app/controller/entities/contacts/client";
import {ClientValidator} from "src/app/controller/validators/contacts/client.validator";
import {Validator, ValidatorResult} from "@bshg/validation";
import {AdresseService} from "src/app/controller/services/adresse/adresse.service";
import {Adresse} from "src/app/controller/entities/adresse/adresse";
import {DevisesService} from "src/app/controller/services/parametres/devises.service";
import {Devises} from "src/app/controller/entities/parametres/devises";
import {NiveauPrixService} from "src/app/controller/services/parametres/niveau-prix.service";
import {NiveauPrix} from "src/app/controller/entities/parametres/niveau-prix";
import {TaxeService} from "src/app/controller/services/parametres/taxe.service";
import {Taxe} from "src/app/controller/entities/parametres/taxe";
import {EntrepriseService} from "src/app/controller/services/parametres/entreprise.service";
import {Entreprise} from "src/app/controller/entities/parametres/entreprise";
import {AdresseCreateComponent} from "src/app/views/adresse/adresse/adresse-create/adresse-create.component";
import {AdresseValidator} from "src/app/controller/validators/adresse/adresse.validator";
import {LangueEnum} from "src/app/controller/enums/langue-enum";
import {ToasterService} from "../../../../toaster/controller/toaster.service";
import {EntrepriseSelectedService} from "../../../../controller/shared/entreprise-selected.service";

@Component({
  selector: 'app-client-create',
  standalone: true,
    imports: [
        FormSelectDirective, RowComponent, ColComponent, FormControlDirective, NgTemplateOutlet,
        FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent,
        CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
        RouterLink, NavComponent, NavItemComponent, SpinnerComponent, IconDirective,
        FormCheckComponent, FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent,
        AdresseCreateComponent, InputGroupTextDirective,
    ],
  templateUrl: './client-create.component.html',
  styleUrl: './client-create.component.scss'
})
export class ClientCreateComponent {
  protected sending = false
  protected standAlon = true


  @Input("getter") set setItemGetter(getter: () => Client) {
    this.itemGetter = getter
    this.standAlon = false
  }

  @Input("setter") set setItemSetter(setter: (value: Client ) => void) {
    this.itemSetter = setter
  }
  @Input("validator") set setValidator(validator: ClientValidator) {
    this.validator = validator
  }

  private router = inject(Router)
  private service = inject(ClientService)
  private devisesService = inject(DevisesService)
  private niveauPrixService = inject(NiveauPrixService)
  private taxeService = inject(TaxeService)
  private entrepriseService = inject(EntrepriseService)
 private entrepriseSelectedService = inject(EntrepriseSelectedService);
  private formBuilder: FormBuilder= inject(FormBuilder)
  protected validator = ClientValidator.init(() => this.item)
    .setAdresse(AdresseValidator.init(() => this.adresse))
  protected devisesList!: Devises[]
  protected niveauPrixList!: NiveauPrix[]
  protected taxeList!: Taxe[]
  protected entrepriseList!: Entreprise[]
  private toasterService = inject(ToasterService)


  ngOnInit() {

    this.loadEntreprise();

    if(this.service.keepData) {
      let devisesCreated = this.devisesService.createdItemAfterReturn;
      if (devisesCreated.created) {
        this.item.devises = devisesCreated.item
        this.validator.devises.validate()
      }
      let niveauPrixCreated = this.niveauPrixService.createdItemAfterReturn;
      if (niveauPrixCreated.created) {
        this.item.niveauPrix = niveauPrixCreated.item
        this.validator.niveauPrix.validate()
      }

      // let entrepriseCreated = this.entrepriseService.createdItemAfterReturn;
      // if (entrepriseCreated.created) {
      //   this.item.entreprise = entrepriseCreated.item
      //   this.validator.entreprise.validate()
      // }

      let taxeCreated = this.taxeService.createdItemAfterReturn;
      if (taxeCreated.created) {
        this.item.taxe = taxeCreated.item
        //this.validator.taxe.validate()
      }

    } else { this.reset(false) }
    this.service.keepData = false
    this.item.adresse = new Adresse()

    this.loadDevisesList()
    this.loadNiveauPrixList()
    this.loadTaxeList()
    this.loadEntrepriseList()

    this.clientForm = this.formBuilder.group({
      code: [{value: this.generateCode(), disabled: true}]

    });
    this.service.getNextCode().subscribe({
      next: value => this.item.code = value.code,
      error: err => console.log(err)
    })
  }

  // LOAD DATA
  loadDevisesList() {
    this.devisesService.findAll().subscribe({
      next: data => this.devisesList = data,
      error: err => console.log(err)
    })
  }
  loadNiveauPrixList() {
    this.niveauPrixService.findAll().subscribe({
      next: data => this.niveauPrixList = data,
      error: err => console.log(err)
    })
  }
  loadTaxeList() {
    this.taxeService.findAll().subscribe({
      next: data => this.taxeList = data,
      error: err => console.log(err)
    })
  }


    loadEntrepriseList() {
        this.entrepriseService.findAll().subscribe({
            next: data => this.entrepriseList = data,
            error: err => console.log(err)
        })
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


  clientForm !: FormGroup;


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
       this.item = new Client()
        this.router.navigate(["/contacts/client"]).then()
        this.toasterService.toast({message: "Un nouveau client a été ajouté", color: "success"})

      },
      error: err => {
        this.sending = false
        console.log(err)
        this.validator.import(err.error as ValidatorResult< any>[])
      }
    })
    const clientData = {...this.clientForm.value,
      code: this.generateCode()
    };
  }
  currentCodeNumber: number = 1;
  generateCode(): string {
    return 'I' + this.currentCodeNumber.toString().padStart(7, '0');
  }

  reset(force = true) {
    if (force || this.item == null) this.item = new Client()
    this.validator.reset()
  }

  // GETTERS AND SETTERS
  public get items() {
    return this.service.items;
  }

  public set items(value) {
    this.service.items = value;
  }

  public get item(): Client {
    return this.itemGetter();
  }

  public set item(value: Client ) {
    this.itemSetter(value);
  }

  private itemGetter(): Client {
    return this.service.item;
  }

  private itemSetter(value: Client ) {
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


  public get taxe(): Taxe {
    if (this.item.taxe == null)
      this.item.taxe = new Taxe()
    return this.item.taxe;
  }
  public set taxe(value: Taxe ) {
    this.item.taxe = value;
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
  public navigateToTaxeCreate() {
    this.taxeService.returnUrl = this.router.url
    this.service.keepData = true
    this.router.navigate(['/parametres/taxe/create']).then()
  }

  public navigateToEntrepriseCreate() {
    this.entrepriseService.returnUrl = this.router.url
    this.service.keepData = true
    this.router.navigate(['/parametres/entreprise/create']).then()
  }

  ////
  protected langueEnumList = Object.values(LangueEnum)
  cancel(){
    this.item = new Client();
  }
  retour(){
    this.router.navigate(['/contacts/client/list']).then()
  }
}


