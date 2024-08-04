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


import {NouvelleDeviseService} from "src/app/controller/services/parametres/nouvelle-devise.service";
import {NouvelleDevise} from "src/app/controller/entities/parametres/nouvelle-devise";
import {NouvelleDeviseValidator} from "src/app/controller/validators/parametres/nouvelle-devise.validator";
import {ValidatorResult} from "@bshg/validation";
import {EntrepriseService} from "src/app/controller/services/parametres/entreprise.service";
import {Entreprise} from "src/app/controller/entities/parametres/entreprise";
import {EntrepriseSelectedService} from "../../../../controller/shared/entreprise-selected.service";

@Component({
  selector: 'app-nouvelle-devise-create',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective, NgTemplateOutlet,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, SpinnerComponent, IconDirective,
    FormCheckComponent, FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent,

  ],
  templateUrl: './nouvelle-devise-create.component.html',
  styleUrl: './nouvelle-devise-create.component.scss'
})
export class NouvelleDeviseCreateComponent {
  protected sending = false
  protected standAlon = true

  @Input("getter") set setItemGetter(getter: () => NouvelleDevise) {
    this.itemGetter = getter
    this.standAlon = false
  }
  @Input("setter") set setItemSetter(setter: (value: NouvelleDevise ) => void) {
    this.itemSetter = setter
  }
  @Input("validator") set setValidator(validator: NouvelleDeviseValidator) {
    this.validator = validator
  }

  private router = inject(Router)
  private service = inject(NouvelleDeviseService)
  private entrepriseService = inject(EntrepriseService)
  protected validator = NouvelleDeviseValidator.init(() => this.item)
  private entrepriseSelectedService = inject(EntrepriseSelectedService);

  protected entrepriseList!: Entreprise[]

  ngOnInit() {
    if(this.service.keepData) {

    } else { this.reset(false) }
    this.service.keepData = false

  }

  // LOAD DATA


  // METHODS
  create() {
    console.log(this.item)
    if (!this.validator.validate()) return;
    this.sending = true;
    this.item.idEntreprise =  this.entrepriseSelectedService.getEntrepriseSelected();
    this.service.create().subscribe({
      next: data => {
        this.sending = false
        if (data == null) return
        if (this.toReturn) {
          this.item = data
          this.router.navigate([this.returnUrl]).then()
          return;
        }
        this.item = new NouvelleDevise()
        this.router.navigate(["/parametres/nouvelle-devise"]).then()
      },
      error: err => {
        this.sending = false
        console.log(err)
        this.validator.import(err.error as ValidatorResult< any>[])
      }
    })
  }

  reset(force = true) {
    if (force || this.item == null) this.item = new NouvelleDevise()
    this.validator.reset()
  }

  // GETTERS AND SETTERS
  public get items() {
    return this.service.items;
  }

  public set items(value) {
    this.service.items = value;
  }

  public get item(): NouvelleDevise {
    return this.itemGetter();
  }

  public set item(value: NouvelleDevise ) {
    this.itemSetter(value);
  }

  private itemGetter(): NouvelleDevise {
    return this.service.item;
  }

  private itemSetter(value: NouvelleDevise ) {
    this.service.item = value;
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

  public navigateToEntrepriseCreate() {
    this.entrepriseService.returnUrl = this.router.url
    this.service.keepData = true
    this.router.navigate(['/parametres/entreprise/create']).then()
  }
  cancel(){
    this.item = new NouvelleDevise();
  }
  retour(){
    this.router.navigate(['/pays/pays/list']).then()
  }
  ////
}
