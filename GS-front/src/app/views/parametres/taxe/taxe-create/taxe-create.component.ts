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


import {TaxeService} from "src/app/controller/services/parametres/taxe.service";
import {Taxe} from "src/app/controller/entities/parametres/taxe";
import {TaxeValidator} from "src/app/controller/validators/parametres/taxe.validator";
import {ValidatorResult} from "@bshg/validation";
import {ToasterService} from "../../../../toaster/controller/toaster.service";
import {EntrepriseSelectedService} from "../../../../controller/shared/entreprise-selected.service";
@Component({
  selector: 'app-taxe-create',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective, NgTemplateOutlet,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, SpinnerComponent, IconDirective,
    FormCheckComponent, FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent,

  ],
  templateUrl: './taxe-create.component.html',
  styleUrl: './taxe-create.component.scss'
})
export class TaxeCreateComponent {
  protected sending = false
  protected standAlon = true
  private entrepriseSelectedService = inject(EntrepriseSelectedService);

  @Input("getter") set setItemGetter(getter: () => Taxe) {
    this.itemGetter = getter
    this.standAlon = false
  }
  @Input("setter") set setItemSetter(setter: (value: Taxe ) => void) {
    this.itemSetter = setter
  }
  @Input("validator") set setValidator(validator: TaxeValidator) {
    this.validator = validator
  }

  private router = inject(Router)
  private service = inject(TaxeService)

  protected validator = TaxeValidator.init(() => this.item)
  private toasterService = inject(ToasterService)


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
    this.service.create().subscribe({
      next: data => {
        this.sending = false
        if (data == null) return
        if (this.toReturn) {
          this.item = data
          this.router.navigate([this.returnUrl]).then()
          return;
        }
        this.item = new Taxe()
        this.router.navigate(["/parametres/taxe"]).then()
        this.toasterService.toast({message: "Un nouveau taxe a été ajouté", color: "success"})

      },
      error: err => {
        this.sending = false
        console.log(err)
        this.validator.import(err.error as ValidatorResult< any>[])
      }
    })
  }

  reset(force = true) {
    if (force || this.item == null) this.item = new Taxe()
    this.validator.reset()
  }

  // GETTERS AND SETTERS
  public get items() {
    return this.service.items;
  }

  public set items(value) {
    this.service.items = value;
  }

  public get item(): Taxe {
    return this.itemGetter();
  }

  public set item(value: Taxe ) {
    this.itemSetter(value);
  }

  private itemGetter(): Taxe {
    return this.service.item;
  }

  private itemSetter(value: Taxe ) {
    this.service.item = value;
  }


  public get returnUrl() {
    return this.service.returnUrl;
  }

  public get toReturn() {
    return this.service.toReturn();
  }
  cancel(){
    this.item = new Taxe();
  }
  retour(){
    this.router.navigate(['/pays/pays/list']).then()
  }

  ////
}
