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
import {NouvelleDeviseService} from "src/app/controller/services/parametres/nouvelle-devise.service";
import {NouvelleDevise} from "src/app/controller/entities/parametres/nouvelle-devise";
import {EntrepriseDevisesService} from "src/app/controller/services/parametres/entreprise-devises.service";
import {EntrepriseDevises} from "src/app/controller/entities/parametres/entreprise-devises";
import {EntrepriseService} from "src/app/controller/services/parametres/entreprise.service";
import {Entreprise} from "src/app/controller/entities/parametres/entreprise";

@Component({
  selector: 'app-devises-update',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent, NgTemplateOutlet,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, FormCheckComponent, SpinnerComponent,
    FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent, IconDirective,

  ],
  templateUrl: './devises-update.component.html',
  styleUrl: './devises-update.component.scss'
})
export class DevisesUpdateComponent {
  protected isPartOfUpdateForm = false // true if it is used as part of other update component
  protected sending = false
  protected resetting = false
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

  protected validator = DevisesValidator.init(() => this.item)

  protected nouvelleDeviseList!: NouvelleDevise[]
  protected entrepriseList!: Entreprise[]

  ngAfterContentInit() {
    if (!this.isPartOfUpdateForm && this.item.id == null) this.router.navigate(["/parametres/devises"]).then()
  }

  ngOnInit() {
    if(this.service.keepData) {
      let nouvelleDeviseCreated = this.nouvelleDeviseService.createdItemAfterReturn;
      if (nouvelleDeviseCreated.created) {
        this.item.nouvelleDevise = nouvelleDeviseCreated.item
        this.validator.nouvelleDevise.validate()
      }

    } else { this.validator.reset() }

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
  update() {
    console.log(this.item)
    if (!this.validator.validate()) return;
    this.sending = true;
    this.service.update().subscribe({
      next: data => {
        this.sending = false
        if (data == null) return
        this.router.navigate(["/parametres/devises"]).then()
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



  public navigateToNouvelleDeviseCreate() {
    this.nouvelleDeviseService.returnUrl = this.router.url
    this.router.navigate(['/parametres/nouvelle-devise/create']).then()
  }
  public navigateToEntrepriseCreate() {
    this.entrepriseService.returnUrl = this.router.url
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
