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
import {EntrepriseService} from "src/app/controller/services/parametres/entreprise.service";
import {Entreprise} from "src/app/controller/entities/parametres/entreprise";
import {FactureProduit} from "../../../../controller/entities/ventes/facture/facture-produit";

@Component({
  selector: 'app-niveau-stock-update',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent, NgTemplateOutlet,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, FormCheckComponent, SpinnerComponent,
    FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent, IconDirective, TableDirective,

  ],
  templateUrl: './niveau-stock-update.component.html',
  styleUrl: './niveau-stock-update.component.scss'
})
export class NiveauStockUpdateComponent {
  protected isPartOfUpdateForm = false // true if it is used as part of other update component
  protected sending = false
  protected resetting = false
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

  ngAfterContentInit() {
    if (!this.isPartOfUpdateForm && this.item.id == null) this.router.navigate(["/inventaire/niveau-stock"]).then()
  }

  ngOnInit() {
    if(this.service.keepData) {
     /* let entrepriseCreated = this.entrepriseService.createdItemAfterReturn;
      if (entrepriseCreated.created) {
        this.item.entreprise = entrepriseCreated.item
        this.validator.entreprise.validate()
      }*/
    } else { this.validator.reset() }

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
  update() {
    console.log(this.item)
    if (!this.validator.validate()) return;
    this.sending = true;
    this.service.update().subscribe({
      next: data => {
        this.sending = false
        if (data == null) return
        this.router.navigate(["/inventaire/niveau-stock"]).then()
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



  public navigateToEntrepriseCreate() {
    this.entrepriseService.returnUrl = this.router.url
    this.router.navigate(['/parametres/entreprise/create']).then()
  }
  cancel(){
    this.item = new NiveauStock();
  }

  ////
}
