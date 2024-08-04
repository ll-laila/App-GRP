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


import {NiveauPrixService} from "src/app/controller/services/parametres/niveau-prix.service";
import {NiveauPrix} from "src/app/controller/entities/parametres/niveau-prix";
import {NiveauPrixValidator} from "src/app/controller/validators/parametres/niveau-prix.validator";
import {ValidatorResult} from "@bshg/validation";
import {ProduitNiveauPrixService} from "src/app/controller/services/produit/produit-niveau-prix.service";
import {ProduitNiveauPrix} from "src/app/controller/entities/produit/produit-niveau-prix";
import {StatutNiveauPrixEnum} from "src/app/controller/enums/statut-niveau-prix-enum";
import {ToasterService} from "../../../../toaster/controller/toaster.service";
import {EntrepriseSelectedService} from "../../../../controller/shared/entreprise-selected.service";

@Component({
  selector: 'app-niveau-prix-create',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective, NgTemplateOutlet,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, SpinnerComponent, IconDirective,
    FormCheckComponent, FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent,

  ],
  templateUrl: './niveau-prix-create.component.html',
  styleUrl: './niveau-prix-create.component.scss'
})
export class NiveauPrixCreateComponent {
  protected sending = false
  protected standAlon = true
  private toasterService = inject(ToasterService)
  private entrepriseSelectedService = inject(EntrepriseSelectedService);

  @Input("getter") set setItemGetter(getter: () => NiveauPrix) {
    this.itemGetter = getter
    this.standAlon = false
  }
  @Input("setter") set setItemSetter(setter: (value: NiveauPrix ) => void) {
    this.itemSetter = setter
  }
  @Input("validator") set setValidator(validator: NiveauPrixValidator) {
    this.validator = validator
  }

  private router = inject(Router)
  private service = inject(NiveauPrixService)

  protected validator = NiveauPrixValidator.init(() => this.item)


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
        this.item = new NiveauPrix()
        this.router.navigate(["/parametres/niveau-prix"]).then()
        this.toasterService.toast({message: "Un nouveau niveau de fidélité a été ajouté", color: "success"})

      },
      error: err => {
        this.sending = false
        console.log(err)
        this.validator.import(err.error as ValidatorResult< any>[])
      }
    })
  }

  reset(force = true) {
    if (force || this.item == null) this.item = new NiveauPrix()
    this.validator.reset()
  }

  // GETTERS AND SETTERS
  public get items() {
    return this.service.items;
  }

  public set items(value) {
    this.service.items = value;
  }

  public get item(): NiveauPrix {
    return this.itemGetter();
  }

  public set item(value: NiveauPrix ) {
    this.itemSetter(value);
  }

  private itemGetter(): NiveauPrix {
    return this.service.item;
  }

  private itemSetter(value: NiveauPrix ) {
    this.service.item = value;
  }


  public get returnUrl() {
    return this.service.returnUrl;
  }

  public get toReturn() {
    return this.service.toReturn();
  }


  ////
    protected statutNiveauPrixEnumList = Object.values(StatutNiveauPrixEnum)
  cancel(){
    this.item = new NiveauPrix();
  }
  retour(){
    this.router.navigate(['/pays/pays/list']).then()
  }
}
