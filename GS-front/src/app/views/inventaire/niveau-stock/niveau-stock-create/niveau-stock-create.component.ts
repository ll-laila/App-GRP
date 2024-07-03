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


import {NiveauStockService} from "src/app/controller/services/inventaire/niveau-stock.service";
import {NiveauStock} from "src/app/controller/entities/inventaire/niveau-stock";
import {NiveauStockValidator} from "src/app/controller/validators/inventaire/niveau-stock.validator";
import {ValidatorResult} from "@bshg/validation";
import {EntrepriseService} from "src/app/controller/services/parametres/entreprise.service";
import {Entreprise} from "src/app/controller/entities/parametres/entreprise";

@Component({
  selector: 'app-niveau-stock-create',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective, NgTemplateOutlet,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, SpinnerComponent, IconDirective,
    FormCheckComponent, FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent, TableDirective,

  ],
  templateUrl: './niveau-stock-create.component.html',
  styleUrl: './niveau-stock-create.component.scss'
})
export class NiveauStockCreateComponent {
  protected sending = false
  protected standAlon = true

  @Input("getter") set setItemGetter(getter: () => NiveauStock) {
    this.itemGetter = getter
    this.standAlon = false
  }
  @Input("setter") set setItemSetter(setter: (value: NiveauStock ) => void) {
    this.itemSetter = setter
  }
  @Input("validator") set setValidator(validator: NiveauStockValidator) {
    this.validator = validator
  }

  private router = inject(Router)
  private service = inject(NiveauStockService)
  private entrepriseService = inject(EntrepriseService)


  protected validator = NiveauStockValidator.init(() => this.item)

  protected entrepriseList!: Entreprise[]

  ngOnInit() {
    if(this.service.keepData) {
    /*  let entrepriseCreated = this.entrepriseService.createdItemAfterReturn;
      if (entrepriseCreated.created) {
        this.item.entreprise = entrepriseCreated.item
        this.validator.entreprise.validate()
      }*/
    } else { this.reset(false) }
    this.service.keepData = false

    this.loadEntrepriseList()
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
        this.item = new NiveauStock()
        this.router.navigate(["/inventaire/niveau-stock"]).then()
      },
      error: err => {
        this.sending = false
        console.log(err)
      }
    })
  }

  reset(force = true) {
    if (force || this.item == null) this.item = new NiveauStock()
    this.validator.reset()
  }

  // GETTERS AND SETTERS
  public get items() {
    return this.service.items;
  }

  public set items(value) {
    this.service.items = value;
  }

  public get item(): NiveauStock {
    return this.itemGetter();
  }

  public set item(value: NiveauStock ) {
    this.itemSetter(value);
  }

  private itemGetter(): NiveauStock {
    return this.service.item;
  }

  private itemSetter(value: NiveauStock ) {
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
    this.item = new NiveauStock();
  }
  retour(){
    this.router.navigate(['/pays/pays/list']).then()
  }
  ////
}
