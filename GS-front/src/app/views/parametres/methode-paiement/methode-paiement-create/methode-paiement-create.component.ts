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
import {ValidatorResult} from "@bshg/validation";
import {ToasterService} from "../../../../toaster/controller/toaster.service";
import {EntrepriseSelectedService} from "../../../../controller/shared/entreprise-selected.service";
@Component({
  selector: 'app-methode-paiement-create',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective, NgTemplateOutlet,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, SpinnerComponent, IconDirective,
    FormCheckComponent, FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent,

  ],
  templateUrl: './methode-paiement-create.component.html',
  styleUrl: './methode-paiement-create.component.scss'
})
export class MethodePaiementCreateComponent {
  protected sending = false
  protected standAlon = true
  private toasterService = inject(ToasterService)
  private entrepriseSelectedService = inject(EntrepriseSelectedService);

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
    this.item.idEntreprise = this.entrepriseSelectedService.getEntrepriseSelected();
    this.service.create(this.entrepriseSelectedService.getEntrepriseSelected()).subscribe({
      next: data => {
        this.sending = false
        if (data == null) return
        if (this.toReturn) {
          this.item = data
          this.router.navigate([this.returnUrl]).then()
          return;
        }
        this.item = new MethodePaiement()
        this.router.navigate(["/parametres/methode-paiement"]).then()
        this.toasterService.toast({message: "Une nouvelle méthode de paiement a été ajouté", color: "success"})

      },
      error: err => {
        this.sending = false
        console.log(err)
        this.validator.import(err.error as ValidatorResult< any>[])
      }
    })
  }

  reset(force = true) {
    if (force || this.item == null) this.item = new MethodePaiement()
    this.validator.reset()
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


  public get returnUrl() {
    return this.service.returnUrl;
  }

  public get toReturn() {
    return this.service.toReturn();
  }

  cancel(){
    this.item = new MethodePaiement();
  }
  retour(){
    this.router.navigate(['/pays/pays/list']).then()
  }
  ////
}
