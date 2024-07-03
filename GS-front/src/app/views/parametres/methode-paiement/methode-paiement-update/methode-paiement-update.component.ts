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


import {MethodePaiementService} from "src/app/controller/services/parametres/methode-paiement.service";
import {MethodePaiement} from "src/app/controller/entities/parametres/methode-paiement";
import {MethodePaiementValidator} from "src/app/controller/validators/parametres/methode-paiement.validator";

@Component({
  selector: 'app-methode-paiement-update',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent, NgTemplateOutlet,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, FormCheckComponent, SpinnerComponent,
    FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent, IconDirective,

  ],
  templateUrl: './methode-paiement-update.component.html',
  styleUrl: './methode-paiement-update.component.scss'
})
export class MethodePaiementUpdateComponent {
  protected isPartOfUpdateForm = false // true if it is used as part of other update component
  protected sending = false
  protected resetting = false
  protected standAlon = true

  @Input("getter") set setItemGetter(getter: () => MethodePaiement) {
    this.itemGetter = getter
    this.standAlon = false
  }
  @Input("setter") set setItemSetter(setter: (value: MethodePaiement ) => void) {
    this.itemSetter = setter
  }
  @Input("validator") set setValidator(validator: MethodePaiementValidator) {
    this.validator = validator
  }

  private router = inject(Router)
  private service = inject(MethodePaiementService)

  protected validator = MethodePaiementValidator.init(() => this.item)


  ngAfterContentInit() {
    if (!this.isPartOfUpdateForm && this.item.id == null) this.router.navigate(["/parametres/methode-paiement"]).then()
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
        this.router.navigate(["/parametres/methode-paiement"]).then()
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

  public get item(): MethodePaiement {
    return this.itemGetter();
  }

  public set item(value: MethodePaiement ) {
    this.itemSetter(value);
  }

  private itemGetter(): MethodePaiement {
    return this.service.item;
  }

  private itemSetter(value: MethodePaiement ) {
    this.service.item = value;
  }

  cancel(){
    this.item = new MethodePaiement();
  }
  retour(){
    this.router.navigate(['/pays/pays/list']).then()
  }

  ////
}
