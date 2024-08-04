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


import {DevisesService} from "src/app/controller/services/parametres/devises.service";
import {Devises} from "src/app/controller/entities/parametres/devises";
import {DevisesValidator} from "src/app/controller/validators/parametres/devises.validator";
import {ValidatorResult} from "@bshg/validation";
import {NouvelleDeviseService} from "src/app/controller/services/parametres/nouvelle-devise.service";
import {NouvelleDevise} from "src/app/controller/entities/parametres/nouvelle-devise";
import {EntrepriseService} from "src/app/controller/services/parametres/entreprise.service";
import {Entreprise} from "src/app/controller/entities/parametres/entreprise";
import {ToasterService} from "../../../../toaster/controller/toaster.service";
import {EntrepriseSelectedService} from "../../../../controller/shared/entreprise-selected.service";

@Component({
  selector: 'app-devises-create',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective, NgTemplateOutlet,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, SpinnerComponent, IconDirective,
    FormCheckComponent, FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent,

  ],
  templateUrl: './devises-create.component.html',
  styleUrl: './devises-create.component.scss'
})
export class DevisesCreateComponent {
  protected sending = false
  protected standAlon = true

  @Input("getter") set setItemGetter(getter: () => Devises) {
    this.itemGetter = getter
    this.standAlon = false
  }
  @Input("setter") set setItemSetter(setter: (value: Devises ) => void) {
    this.itemSetter = setter
  }
  @Input("validator") set setValidator(validator: DevisesValidator) {
    this.validator = validator
  }

  private router = inject(Router)
  private service = inject(DevisesService)
  private nouvelleDeviseService = inject(NouvelleDeviseService)
  private entrepriseService = inject(EntrepriseService)
  private toasterService = inject(ToasterService)
  private entrepriseSelectedService = inject(EntrepriseSelectedService);

  protected validator = DevisesValidator.init(() => this.item)

  protected nouvelleDeviseList!: NouvelleDevise[]
  protected entrepriseList!: Entreprise[]

  ngOnInit() {
    if(this.service.keepData) {
      let nouvelleDeviseCreated = this.nouvelleDeviseService.createdItemAfterReturn;
      if (nouvelleDeviseCreated.created) {
        this.item.nouvelleDevise = nouvelleDeviseCreated.item
        this.validator.nouvelleDevise.validate()
      }

    } else { this.reset(false) }
    this.service.keepData = false

    this.loadNouvelleDeviseList()
    this.loadEntrepriseList()
  }

  // LOAD DATA
  loadNouvelleDeviseList() {
    this.nouvelleDeviseService.findAllOptimized().subscribe({
      next: data => this.nouvelleDeviseList = data,
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
    if (!this.validator.validate()) return;
    this.sending = true;
    this.item.idEntreprise = this.entrepriseSelectedService.getEntrepriseSelected();
    this.service.create().subscribe({
      next: data => {
        this.sending = false
        if (data == null) return
        if (this.toReturn) {
          this.item = data
          this.router.navigate([this.returnUrl]).then()
          return;
        }
        this.item = new Devises()
        this.router.navigate(["/parametres/devises"]).then()
        this.toasterService.toast({message: "Un nouveau devise a été ajouté", color: "success"})

      },
      error: err => {
        this.sending = false
        console.log(err)
        this.validator.import(err.error as ValidatorResult< any>[])
      }
    })
  }

  reset(force = true) {
    if (force || this.item == null) this.item = new Devises()
    this.validator.reset()
  }

  // GETTERS AND SETTERS
  public get items() {
    return this.service.items;
  }

  public set items(value) {
    this.service.items = value;
  }

  public get item(): Devises {
    return this.itemGetter();
  }

  public set item(value: Devises ) {
    this.itemSetter(value);
  }

  private itemGetter(): Devises {
    return this.service.item;
  }

  private itemSetter(value: Devises ) {
    this.service.item = value;
  }

  public get nouvelleDevise(): NouvelleDevise {
    if (this.item.nouvelleDevise == null)
      this.item.nouvelleDevise = new NouvelleDevise()
    return this.item.nouvelleDevise;
  }
  public set nouvelleDevise(value: NouvelleDevise ) {
    this.item.nouvelleDevise = value;
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

  public navigateToNouvelleDeviseCreate() {
    this.nouvelleDeviseService.returnUrl = this.router.url
    this.service.keepData = true
    this.router.navigate(['/parametres/nouvelle-devise/create']).then()
  }
  public navigateToEntrepriseCreate() {
    this.entrepriseService.returnUrl = this.router.url
    this.service.keepData = true
    this.router.navigate(['/parametres/entreprise/create']).then()
  }
  cancel(){
    this.item = new Devises();
  }
  retour(){
    this.router.navigate(['/pays/pays/list']).then()
  }
  ////
}
