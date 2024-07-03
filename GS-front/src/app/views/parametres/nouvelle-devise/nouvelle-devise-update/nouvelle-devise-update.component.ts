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
import {EntrepriseService} from "src/app/controller/services/parametres/entreprise.service";
import {Entreprise} from "src/app/controller/entities/parametres/entreprise";

@Component({
  selector: 'app-nouvelle-devise-update',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent, NgTemplateOutlet,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, FormCheckComponent, SpinnerComponent,
    FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent, IconDirective,

  ],
  templateUrl: './nouvelle-devise-update.component.html',
  styleUrl: './nouvelle-devise-update.component.scss'
})
export class NouvelleDeviseUpdateComponent {
  protected isPartOfUpdateForm = false // true if it is used as part of other update component
  protected sending = false
  protected resetting = false
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

  protected entrepriseList!: Entreprise[]

  ngAfterContentInit() {
    if (!this.isPartOfUpdateForm && this.item.id == null) this.router.navigate(["/parametres/nouvelle-devise"]).then()
  }

  ngOnInit() {
    if(this.service.keepData) {

    } else { this.validator.reset() }

  }

  // LOAD DATA


  // METHODS
  update() {
    console.log(this.item)
    if (!this.validator.validate()) return;
    this.sending = true;
    this.service.update().subscribe({
      next: data => {
        this.sending = false
        if (data == null) return
        this.router.navigate(["/parametres/nouvelle-devise"]).then()
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



  public navigateToEntrepriseCreate() {
    this.entrepriseService.returnUrl = this.router.url
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
