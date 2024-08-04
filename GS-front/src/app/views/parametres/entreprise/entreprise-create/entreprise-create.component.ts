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


import {EntrepriseService} from "src/app/controller/services/parametres/entreprise.service";
import {Entreprise} from "src/app/controller/entities/parametres/entreprise";
import {EntrepriseValidator} from "src/app/controller/validators/parametres/entreprise.validator";
import {ValidatorResult} from "@bshg/validation";
import {Adresse} from "src/app/controller/entities/adresse/adresse";
import {AdresseCreateComponent} from "src/app/views/adresse/adresse/adresse-create/adresse-create.component";
import {AdresseValidator} from "src/app/controller/validators/adresse/adresse.validator";
import {ToasterService} from "../../../../toaster/controller/toaster.service";
import {AppUserService} from "../../../../controller/auth/services/app-user.service";
import {AppUser} from "../../../../controller/auth/entities/app-user";
import {UserInfosService} from "../../../../controller/shared/user-infos.service";
import { format } from 'path';
import {SubscriptionService} from "../../../../controller/services/parametres/abonnement/subscription.service";
import {Subscription} from "../../../../controller/entities/parametres/abonnement/Subscription";


@Component({
  selector: 'app-entreprise-create',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective, NgTemplateOutlet,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, SpinnerComponent, IconDirective,
    FormCheckComponent, FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent,
    AdresseCreateComponent,
  ],
  templateUrl: './entreprise-create.component.html',
  styleUrl: './entreprise-create.component.scss'
})
export class EntrepriseCreateComponent {
  protected sending = false
  protected standAlon = true
  private toasterService = inject(ToasterService)
  selectedFile!:File;


  @Input("getter") set setItemGetter(getter: () => Entreprise) {
    this.itemGetter = getter
    this.standAlon = false
  }
  @Input("setter") set setItemSetter(setter: (value: Entreprise ) => void) {
    this.itemSetter = setter
  }
  @Input("validator") set setValidator(validator: EntrepriseValidator) {
    this.validator = validator
  }

  private router = inject(Router)
  private service = inject(EntrepriseService)


  protected validator = EntrepriseValidator.init(() => this.item)
    .setAdresse(AdresseValidator.init(() => this.adresse))

  private userInfosService = inject(UserInfosService);
  private appUserService = inject(AppUserService);
  public admin! : AppUser;

  ngOnInit() {
    if(this.service.keepData) {
    } else { this.reset(false) }
    this.service.keepData = false
    this.item.adresse = new Adresse()
    this.getAdminByUsername(this.userInfosService.getUsername());
  }

  // LOAD DATA

  getAdminByUsername(username: string) {
    this.appUserService.findByUsernameWithRoles(username).subscribe(res => {
      console.log(res);
      this.admin = res;
    }, error => {
      console.log(error);
    });
  }

  // METHODS




  onFileSelected(event:any){
    this.selectedFile=event.target.files[0];
  }
  create() {
    console.log(this.item)
    this.item.idAdmin = this.admin.id;
    if (!this.validator.validate()) {
      console.log(this.validator);
      return;
    }
    this.sending = true;

    const formData=new FormData();
    formData.append("file",this.selectedFile);

    this.service.create(formData).subscribe({
      next: data => {
        this.sending = false
        if (data == null) return
        this.item = data
        this.item = new Entreprise()
        this.router.navigate(["/parametres/entreprise"]).then()
        this.toasterService.toast({message: "Une nouvelle entreprise a été ajouté", color: "success"})

      },
      error: err => {
        this.sending = false
        console.log(err)
        this.validator.import(err.error as ValidatorResult< any>[])
      }
    })
  }



  reset(force = true) {
    if (force || this.item == null) this.item = new Entreprise()
    this.validator.reset()
  }

  // GETTERS AND SETTERS
  public get items() {
    return this.service.items;
  }

  public set items(value) {
    this.service.items = value;
  }

  public get item(): Entreprise {
    return this.itemGetter();
  }

  public set item(value: Entreprise ) {
    this.itemSetter(value);
  }

  private itemGetter(): Entreprise {
    return this.service.item;
  }

  private itemSetter(value: Entreprise ) {
    this.service.item = value;
  }

  public get adresse(): Adresse {
    if (this.item.adresse == null)
      this.item.adresse = new Adresse()
    return this.item.adresse;
  }
  public set adresse(value: Adresse ) {
    this.item.adresse = value;
  }

  protected adresseGetter = () => this.adresse;
  protected adresseSetter = (value: Adresse ) => this.adresse = value;


  public get returnUrl() {
    return this.service.returnUrl;
  }

  public get toReturn() {
    return this.service.toReturn();
  }

  cancel(){
    this.item = new Entreprise();
  }
  retour(){
    this.router.navigate(['/pays/pays/list']).then()
  }
  ////

}
