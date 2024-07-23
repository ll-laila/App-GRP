import {Component, inject} from '@angular/core';
import {FactureService} from "../../../../../controller/services/ventes/facture/facture.service";
import {Facture} from "../../../../../controller/entities/ventes/facture/facture";
import {Paiement} from "../../../../../controller/entities/ventes/paiement";
import {RetourProduit} from "../../../../../controller/entities/ventes/retourproduit/retour-produit";
import {Adresse} from "../../../../../controller/entities/adresse/adresse";
import {ValidatorResult} from "@bshg/validation";
import {PaiementService} from "../../../../../controller/services/ventes/paiement.service";
import {Router, RouterLink} from "@angular/router";
import {
  ButtonCloseDirective,
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent, CardTextDirective, CardTitleDirective,
  ColComponent, FormControlDirective,
  FormFeedbackComponent,
  FormLabelDirective,
  FormSelectDirective,
  InputGroupComponent,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, NavComponent,
  NavItemComponent, PopoverDirective, RowComponent,
  TooltipDirective
} from "@coreui/angular";
import {FormsModule} from "@angular/forms";
import {RetourProduitService} from "../../../../../controller/services/ventes/retourproduit/retour-produit.service";
import {ClientService} from "../../../../../controller/services/contacts/client.service";
import {Client} from "../../../../../controller/entities/contacts/client";
import {IconDirective} from "@coreui/icons-angular";
import { HttpClient } from "@angular/common/http";
import {FactureValidator} from "../../../../../controller/validators/ventes/facture/facture.validator";
import {PaiementValidator} from "../../../../../controller/validators/ventes/paiement.validator";
import {
  RetourProduitValidator
} from "../../../../../controller/validators/ventes/retourproduit/retour-produit.validator";
import {AdresseValidator} from "../../../../../controller/validators/adresse/adresse.validator";

@Component({
  selector: 'app-facture-autre',
 standalone: true,
  imports: [
    ColComponent,
    FormSelectDirective,
    FormsModule,
    InputGroupComponent,
    ButtonDirective,
    RouterLink,
    FormFeedbackComponent,
    FormLabelDirective,
    IconDirective,
    
// TODO: `HttpClientModule` should not be imported into a component directly.
// Please refactor the code to add `provideHttpClient()` call to the provider list in the
// application bootstrap logic and remove the `HttpClientModule` import from this component.
// HttpClientModule,
    CardHeaderComponent,
    CardBodyComponent,
    CardComponent,
    NavItemComponent,
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    TooltipDirective,
    PopoverDirective,
    ModalToggleDirective,
    ModalTitleDirective,
    ButtonCloseDirective,
    CardTextDirective,
    CardTitleDirective,
    FormControlDirective,
    RowComponent,
    NavComponent
  ],
  templateUrl: './facture-autre.component.html',
  styleUrl: './facture-autre.component.scss'
})
export class FactureAutreComponent {
  protected loading = false
  protected paginating = false
  protected currentIndex: number = 0
  protected deleteModel = false
  private router = inject(Router)


  private service: FactureService = inject(FactureService)
  private paiement: PaiementService = inject(PaiementService)
  private retourProduitService: RetourProduitService = inject(RetourProduitService)
  private clientService: ClientService = inject(ClientService)
//public httpClient : HttpClient = inject(HttpClient);

  public get items() {
    return this.service.items;
  }
 ngOnInit() {
   if (this.service.keepData) {
     let taxeCreated = this.paiement.createdItemAfterReturn;
     if (taxeCreated.created) {
       this.item.paiement = taxeCreated.item
       console.log(this.item);
       this.service.facturePaiement(this.item.id, taxeCreated.item.id).subscribe({
         next: () => {
             this.paiement.createdItemAfterReturn.created = false;
             this.paiement.createdItemAfterReturn.item = new Paiement();
         },
       })
     }
   } else {
     this.item.client = new Client();
   }

   this.service.keepData = false;
   this.loadClientList()
   //this.fetchData()
 }
  protected standAlon = true

  public get returnUrl() {
    return this.service.returnUrl;
  }
  public get toReturn() {
    return this.service.toReturn();
  }
  protected paiementGetter = () => this.paiement;
  //protected paiementSetter = (value: Paiement ) => this.paiement = value;

  public get client(): Client {
    if (this.item.client == null)
      this.item.client = new Client()
    return this.item.client;
  }
  public set items(value) {
    this.service.items = value;
  }

  public get item(): Facture {
    return this.service.item;
  }

  public set item(value: Facture) {
    this.service.item = value;
  }
  public navigateToPaiementCreate() {
    this.paiement.returnUrl = this.router.url
    this.service.keepData = true
    this.router.navigate(['/ventes/paiement/create']).then()
  }
  public navigateToPdfFacture() {
    this.paiement.returnUrl = this.router.url
    this.service.keepData = true
    this.router.navigate(['/ventes/facture/facture/facturepdf']).then()
  }
  currentDate: Date;

  constructor() {
    this.currentDate = new Date();
  }
  data: any;

  // fetchData() {
  //   this.httpClient.get('https://jsonplaceholder.typicode.com/posts').subscribe((data : any ) => {
  //     console.log(data);
  //       this.data = data;
  //   });
  // }

  public navigateToRetourProduitCreate() {
    this.retourProduitService.returnUrl = this.router.url
    this.service.keepData = true
    this.router.navigate(['/ventes/retourproduit/retour-produit/retourfacture']).then()
      this.loadData()
  }
  protected clientList!: Client[]

  loadClientList() {
    this.clientService.findAllOptimized().subscribe({
      next: data => this.clientList = data,
      error: err => console.log(err)
    })
  }
   loadData() {
    this.retourProduitService.facture=this.item
   }


  printReport(): void {
    window.print();
  }
}


