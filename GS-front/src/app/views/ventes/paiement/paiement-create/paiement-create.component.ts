import { Component, inject, Input } from '@angular/core';
import {
  FormSelectDirective,
  ColComponent,
  FormControlDirective,
  FormFloatingDirective,
  FormLabelDirective,
  RowComponent,
  CardComponent,
  CardBodyComponent,
  CardHeaderComponent,
  SpinnerComponent,
  InputGroupComponent,
  ButtonDirective,
  NavComponent,
  NavItemComponent,
  FormCheckComponent,
  FormCheckLabelDirective,
  FormCheckInputDirective,
  FormFeedbackComponent,
  TooltipDirective,
  ModalToggleDirective, ModalFooterComponent, PopoverDirective, ModalBodyComponent, ModalComponent, ModalHeaderComponent
} from "@coreui/angular";
import {FormBuilder, FormsModule} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {IconDirective} from "@coreui/icons-angular";
import {NgTemplateOutlet} from "@angular/common";

import {PaiementService} from "src/app/controller/services/ventes/paiement.service";
import {Paiement} from "src/app/controller/entities/ventes/paiement";
import {PaiementValidator} from "src/app/controller/validators/ventes/paiement.validator";
import {ValidatorResult} from "@bshg/validation";
import {MethodePaiementService} from "src/app/controller/services/parametres/methode-paiement.service";
import {MethodePaiement} from "src/app/controller/entities/parametres/methode-paiement";
import {EntrepriseService} from "src/app/controller/services/parametres/entreprise.service";
import {Entreprise} from "src/app/controller/entities/parametres/entreprise";
import {FactureService} from "../../../../controller/services/ventes/facture/facture.service";
import {Facture} from "../../../../controller/entities/ventes/facture/facture";
import {ToasterService} from "../../../../toaster/controller/toaster.service";
import {EntrepriseSelectedService} from "../../../../controller/shared/entreprise-selected.service";

@Component({
  selector: 'app-paiement-create',
  standalone: true,
  imports: [
    FormSelectDirective, RowComponent, ColComponent, FormControlDirective, NgTemplateOutlet,
    FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent,
    CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
    RouterLink, NavComponent, NavItemComponent, SpinnerComponent, IconDirective,
    FormCheckComponent, FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent, TooltipDirective, ModalToggleDirective, ModalFooterComponent, PopoverDirective, ModalBodyComponent, ModalComponent, ModalHeaderComponent,
  ],
  templateUrl: './paiement-create.component.html',
  styleUrl: './paiement-create.component.scss'
})
export class PaiementCreateComponent {
  protected sending = false;
  protected standAlon = true;

  @Input("getter") set setItemGetter(getter: () => Paiement) {
    this.itemGetter = getter;
    this.standAlon = false;
  }
  @Input("setter") set setItemSetter(setter: (value: Paiement ) => void) {
    this.itemSetter = setter;
  }
  @Input("validator") set setValidator(validator: PaiementValidator) {
    this.validator = validator;
  }

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private service = inject(PaiementService);
  private methodePaiementService = inject(MethodePaiementService);
  private entrepriseService = inject(EntrepriseService);
  private factureService = inject(FactureService);
  private formBuilder: FormBuilder= inject(FormBuilder);
  private toasterService = inject(ToasterService)
  private entrepriseSelectedService = inject(EntrepriseSelectedService);

  protected validator = PaiementValidator.init(() => this.item);

  protected methodePaiementList!: MethodePaiement[];
  protected entrepriseList!: Entreprise[];

  ngOnInit() {
    if(this.service.keepData) {
      let methodePaiementCreated = this.methodePaiementService.createdItemAfterReturn;
      if (methodePaiementCreated.created) {
        this.item.methodePaiement = methodePaiementCreated.item;
      }
      let entrepriseCreated = this.entrepriseService.createdItemAfterReturn;
      if (entrepriseCreated.created) {
        this.item.entreprise = entrepriseCreated.item;
       // this.validator.entreprise.validate();
      }
    } else {
      this.reset(false);
    }
    this.service.keepData = false;

    this.loadMethodePaiementList();
    this.loadEntrepriseList();

   this.totalFacture();
    // Set the date to today
    this.setDateToToday();
  }

  setDateToToday(): void {
    const today = new Date();
    const day = ('0' + today.getDate()).slice(-2);
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const year = today.getFullYear();
    this.item.datePaiement = new Date(`${year}-${month}-${day}`);
  }

  // LOAD DATA
  loadMethodePaiementList() {
    this.methodePaiementService.findAllOptimized().subscribe({
      next: data => this.methodePaiementList = data,
      error: err => console.log(err)
    });
  }

  loadEntrepriseList() {
    this.entrepriseService.findAllOptimized().subscribe({
      next: data => this.entrepriseList = data,
      error: err => console.log(err)
    });
  }

  calculPrixImpaye(): number {
    return this.itemF.total- this.item.montantPaye;this.item.methodePaiement
  }

  // METHODS
  create() {
    this.route.queryParams.subscribe(params => {
      this.item.idFacture = +params['montant'];
      console.log('Montant reçu:', this.item.idFacture);
    });
    this.item.montantRest=this.calculPrixImpaye();
    this.item.idEntreprise = this.entrepriseSelectedService.getEntrepriseSelected();
    console.log(this.item);
    if (!this.validator.validate()) return;
    this.sending = true;
    this.service.create().subscribe({
      next: data => {
        this.sending = false;
        if (data == null) return;
        if (this.toReturn) {
          this.item = data;
          this.router.navigate([this.returnUrl]).then();
          return;
        }
        this.item = new Paiement();
        this.router.navigate(["/ventes/paiement"]).then(()=> {
          this.toasterService.toast({message: "votre piementt a été effectué avec success", color: "success"})
        });
      },
      error: err => {
        this.sending = false;
        console.log(err);
        this.validator.import(err.error as ValidatorResult< any>[]);
      }
    });
  }


  reset(force = true) {
    if (force || this.item == null) this.item = new Paiement();
    this.validator.reset();
  }

  // GETTERS AND SETTERS
  public get items() {
    return this.service.items;
  }

  public set items(value) {
    this.service.items = value;
  }

  public get item(): Paiement {
    return this.itemGetter();
  }

  public set item(value: Paiement ) {
    this.itemSetter(value);
  }

  private itemGetter(): Paiement {
    return this.service.item;
  }

  private itemSetter(value: Paiement ) {
    this.service.item = value;
  }

  public get methodePaiement(): MethodePaiement {
    if (this.item.methodePaiement == null)
      this.item.methodePaiement = new MethodePaiement();
    return this.item.methodePaiement;
  }

  public set methodePaiement(value: MethodePaiement ) {
    this.item.methodePaiement = value;
  }

  public get entreprise(): Entreprise {
    if (this.item.entreprise == null)
      this.item.entreprise = new Entreprise();
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

  public navigateToMethodePaiementCreate() {
    this.methodePaiementService.returnUrl = this.router.url;
    this.service.keepData = true;
    this.router.navigate(['/parametres/methode-paiement/create']).then();
  }

  public navigateToEntrepriseCreate() {
    this.entrepriseService.returnUrl = this.router.url;
    this.service.keepData = true;
    this.router.navigate(['/parametres/entreprise/create']).then();
  }

  cancel(){
    this.item = new Paiement();
  }

  retour(){
    this.router.navigate(['/pays/pays/list']).then();
  }

  public set itemsF(value: Facture[]) {
    this.factureService.items = value;
  }

  public get itemF(): Facture {
    return this.factureService.item;
  }

  public set itemF(value: Facture ) {
    this.factureService.item = value;
  }
  totalFacture() {
    this.factureService.findById(this.itemF.id).subscribe({
      next: data => {
        this.factureService.item = data
      },
      error: err => console.log(err)
    })
  }

}
