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


import {AdresseService} from "src/app/controller/services/adresse/adresse.service";
import {Adresse} from "src/app/controller/entities/adresse/adresse";
import {AdresseValidator} from "src/app/controller/validators/adresse/adresse.validator";
import {PaysService} from "src/app/controller/services/adresse/pays.service";
import {Pays} from "src/app/controller/entities/adresse/pays";

@Component({
  selector: 'app-adresse-update',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent, NgTemplateOutlet,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, FormCheckComponent, SpinnerComponent,
    FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent, IconDirective,

  ],
  templateUrl: './adresse-update.component.html',
  styleUrl: './adresse-update.component.scss'
})
export class AdresseUpdateComponent {
  protected isPartOfUpdateForm = false // true if it is used as part of other update component
  protected sending = false
  protected resetting = false
  protected standAlon = true

  @Input("getter") set setItemGetter(getter: () => Adresse) {
    this.itemGetter = getter
    this.standAlon = false
  }
  @Input("setter") set setItemSetter(setter: (value: Adresse ) => void) {
    this.itemSetter = setter
  }
  @Input("validator") set setValidator(validator: AdresseValidator) {
    this.validator = validator
  }

  private router = inject(Router)
  private service = inject(AdresseService)
  private paysService = inject(PaysService)

  protected validator = AdresseValidator.init(() => this.item)

  protected paysList!: Pays[]

  ngAfterContentInit() {
    if (!this.isPartOfUpdateForm && this.item.id == null) this.router.navigate(["/adresse/adresse"]).then()
  }

  ngOnInit() {
    if(this.service.keepData) {
      let paysCreated = this.paysService.createdItemAfterReturn;
      if (paysCreated.created) {
        this.item.pays = paysCreated.item
        //this.validator.pays.validate()
      }
    } else { this.validator.reset() }

    this.loadPaysList()
  }

  // LOAD DATA
  loadPaysList() {
    this.paysService.findAllOptimized().subscribe({
      next: data => this.paysList = data,
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
        this.router.navigate(["/adresse/adresse"]).then()
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

  public get item(): Adresse {
    return this.itemGetter();
  }

  public set item(value: Adresse ) {
    this.itemSetter(value);
  }

  private itemGetter(): Adresse {
    return this.service.item;
  }

  private itemSetter(value: Adresse ) {
    this.service.item = value;
  }

  public get pays(): Pays {
    if (this.item.pays == null)
      this.item.pays = new Pays()
    return this.item.pays;
  }
  public set pays(value: Pays ) {
    this.item.pays = value;
  }



  public navigateToPaysCreate() {
    this.paysService.returnUrl = this.router.url
    this.router.navigate(['/adresse/pays/create']).then()
  }
  cancel(){
    this.item = new Adresse();
  }
  /*
  retour(){
    this.router.navigate(['/contacts/client/list']).then()
  }*/
  ////
}
