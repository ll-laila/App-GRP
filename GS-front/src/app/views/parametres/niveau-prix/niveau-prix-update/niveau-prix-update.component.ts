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
import {ProduitNiveauPrixService} from "src/app/controller/services/produit/produit-niveau-prix.service";
import {ProduitNiveauPrix} from "src/app/controller/entities/produit/produit-niveau-prix";
import {StatutNiveauPrixEnum} from "src/app/controller/enums/statut-niveau-prix-enum";

@Component({
  selector: 'app-niveau-prix-update',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent, NgTemplateOutlet,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, FormCheckComponent, SpinnerComponent,
    FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent, IconDirective,

  ],
  templateUrl: './niveau-prix-update.component.html',
  styleUrl: './niveau-prix-update.component.scss'
})
export class NiveauPrixUpdateComponent {
  protected isPartOfUpdateForm = false // true if it is used as part of other update component
  protected sending = false
  protected resetting = false
  protected standAlon = true

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


  ngAfterContentInit() {
    if (!this.isPartOfUpdateForm && this.item.id == null) this.router.navigate(["/parametres/niveau-prix"]).then()
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
        this.router.navigate(["/parametres/niveau-prix"]).then()
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



  ////
    protected statutNiveauPrixEnumList = Object.values(StatutNiveauPrixEnum)

  cancel(){
    this.item = new NiveauPrix();
  }
  retour(){
    this.router.navigate(['/pays/pays/list']).then()
  }
}
