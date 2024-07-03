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
import {AdresseService} from "src/app/controller/services/adresse/adresse.service";
import {Adresse} from "src/app/controller/entities/adresse/adresse";
import {EmployeService} from "src/app/controller/services/contacts/user/employe.service";
import {Employe} from "src/app/controller/entities/contacts/user/employe";
import {ProduitService} from "src/app/controller/services/produit/produit.service";
import {Produit} from "src/app/controller/entities/produit/produit";
import {ClientService} from "src/app/controller/services/contacts/client.service";
import {Client} from "src/app/controller/entities/contacts/client";
import {FournisseurService} from "src/app/controller/services/contacts/fournisseur.service";
import {Fournisseur} from "src/app/controller/entities/contacts/fournisseur";
import {PaiementService} from "src/app/controller/services/ventes/paiement.service";
import {Paiement} from "src/app/controller/entities/ventes/paiement";

import {CommandeExpedition} from "src/app/controller/entities/ventes/commande-expedition";
import {LivraisonService} from "src/app/controller/services/inventaire/livraison/livraison.service";
import {Livraison} from "src/app/controller/entities/inventaire/livraison/livraison";
import {BonCommandeService} from "src/app/controller/services/inventaire/boncommande/bon-commande.service";
import {BonCommande} from "src/app/controller/entities/inventaire/boncommande/bon-commande";
import {NiveauStockService} from "src/app/controller/services/inventaire/niveau-stock.service";
import {NiveauStock} from "src/app/controller/entities/inventaire/niveau-stock";

import {Remboursement} from "src/app/controller/entities/ventes/remboursement/remboursement";

import {NoteCredit} from "src/app/controller/entities/ventes/notecredit/note-credit";
import {RetourProduitService} from "src/app/controller/services/ventes/retourproduit/retour-produit.service";
import {RetourProduit} from "src/app/controller/entities/ventes/retourproduit/retour-produit";
import {FactureService} from "src/app/controller/services/ventes/facture/facture.service";
import {Facture} from "src/app/controller/entities/ventes/facture/facture";
import {CommandeService} from "src/app/controller/services/ventes/commande/commande.service";
import {Commande} from "src/app/controller/entities/ventes/commande/commande";


import {Estimation} from "src/app/controller/entities/ventes/estimation/estimation";
import {DevisesService} from "src/app/controller/services/parametres/devises.service";
import {Devises} from "src/app/controller/entities/parametres/devises";
import {NouvelleDeviseService} from "src/app/controller/services/parametres/nouvelle-devise.service";
import {NouvelleDevise} from "src/app/controller/entities/parametres/nouvelle-devise";
import {DevisService} from "src/app/controller/services/ventes/devis/devis.service";
import {Devis} from "src/app/controller/entities/ventes/devis/devis";
import {EntrepriseDevisesService} from "src/app/controller/services/parametres/entreprise-devises.service";
import {EntrepriseDevises} from "src/app/controller/entities/parametres/entreprise-devises";
import {AdresseCreateComponent} from "src/app/views/adresse/adresse/adresse-create/adresse-create.component";
import {AdresseValidator} from "src/app/controller/validators/adresse/adresse.validator";
import {ToasterService} from "../../../../toaster/controller/toaster.service";

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


  ngOnInit() {
    if(this.service.keepData) {
    } else { this.reset(false) }
    this.service.keepData = false
    this.item.adresse = new Adresse()

  }

  // LOAD DATA

  // METHODS
  create() {
    console.log(this.item)
    if (!this.validator.validate()) {
      console.log(this.validator);
      return;
    }
    this.sending = true;
    this.service.create().subscribe({
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
