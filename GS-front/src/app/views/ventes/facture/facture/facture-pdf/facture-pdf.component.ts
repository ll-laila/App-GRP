import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {FactureService} from "../../../../../controller/services/ventes/facture/facture.service";
import {Facture} from "../../../../../controller/entities/ventes/facture/facture";
import {CommonModule} from "@angular/common";
import {PaiementService} from "../../../../../controller/services/ventes/paiement.service";
import {Router} from "@angular/router";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
<<<<<<< HEAD
import {Paiement} from "../../../../../controller/entities/ventes/paiement";
=======
import {AvatarComponent} from "@coreui/angular";
>>>>>>> 7bad00aa6c6d9b5110f616587feaf85130a00fcd
@Component({
  selector: 'app-facture-pdf',
  standalone: true,
  imports: [CommonModule, AvatarComponent],
  templateUrl: './facture-pdf.component.html',
  styleUrl: './facture-pdf.component.scss'
})
export class FacturePdfComponent {
  @ViewChild('invoiceModal') invoiceModal!: ElementRef;
  invoiceUrl?: SafeResourceUrl;
  private modalRef?: NgbModalRef;
  public logo?:string;

  private service = inject(PaiementService);

  constructor(
      private factureService: FactureService,
      private paiement: PaiementService,
      private router: Router,
      private sanitizer: DomSanitizer,
      private modalService: NgbModal,

  ) {}
  public set items(value:Facture[]) {
    this.factureService.items= value;
  }

  public get item(): Facture {
    return this.factureService.item;
  }

  public set item(value: Facture ) {
    this.factureService.item = value;
  }

  imprimerFacture() {
    window.print();
  }
  visualiserFacture() {
    const invoiceElement = document.querySelector('.invoice');
    if (invoiceElement) {
      const invoiceContent = invoiceElement.outerHTML;

      // Create a blob with the HTML content
      const blob = new Blob([invoiceContent], { type: 'text/html' });

      // Create a URL for the blob
      const url = URL.createObjectURL(blob);

      // Sanitize the URL
      this.invoiceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

      // Open the modal with the sanitized URL
      this.modalRef = this.modalService.open(this.invoiceModal, { size: 'lg' });
    }
  }


    effectuerPaiement() {
        this.paiement.returnUrl = this.router.url;
        this.factureService.keepData = true;
        const queryParams = {
            montant: this.item.id
        };
        this.router.navigate(['/ventes/paiement/create'], { queryParams }).then();
    }




    ngOnInit() {
    this.factureService.findById(this.item.id).subscribe({
        next: data => {
<<<<<<< HEAD
            this.factureService.item = data;
            this.service.findByIdFacture(this.item.id).subscribe({
                next: paiement => {
                    this.item.paiement = paiement;
                    console.log("paiement :",this.item.paiement);
                },
                error: err => console.log(err)
            });
=======
            this.factureService.item = data
            this.logo = data.entreprise?.logo;
          console.log( this.item.id );
>>>>>>> 7bad00aa6c6d9b5110f616587feaf85130a00fcd

            console.log( this.item );
        },
        error: err => console.log(err)
    })
  }



}

