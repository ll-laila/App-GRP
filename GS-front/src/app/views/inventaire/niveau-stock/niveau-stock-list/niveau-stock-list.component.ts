import {Component, inject} from '@angular/core';
import {
  ButtonDirective, CardBodyComponent, CardComponent, ColComponent, ColDirective,
  NavComponent, NavItemComponent, PlaceholderAnimationDirective,
  RowComponent, SpinnerComponent, TableDirective, PlaceholderDirective,
  PageItemDirective, PageLinkDirective, PaginationComponent,
  DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownHeaderDirective, DropdownItemDirective,
  ModalComponent, ModalToggleDirective, ModalHeaderComponent, ModalBodyComponent, TooltipDirective, ModalFooterComponent, PopoverDirective, ModalTitleDirective, ButtonCloseDirective,
} from "@coreui/angular";
import {NiveauStockService} from "src/app/controller/services/inventaire/niveau-stock.service";
import {NiveauStock} from "src/app/controller/entities/inventaire/niveau-stock";
import {RouterLink} from "@angular/router";
import {IconDirective} from "@coreui/icons-angular";
import {generatePageNumbers, paginationSizes} from "src/app/controller/utils/pagination/pagination";
import {ProduitService} from "../../../../controller/services/produit/produit.service";
import {Produit} from "../../../../controller/entities/produit/produit";
import {RetourProduit} from "../../../../controller/entities/ventes/retourproduit/retour-produit";
import {EntrepriseSelectedService} from "../../../../controller/shared/entreprise-selected.service";

@Component({
  selector: 'app-niveau-stock-list',
  standalone: true,
  imports: [
    RowComponent, ColComponent, CardComponent, CardBodyComponent, TableDirective,
    ButtonDirective, RouterLink, IconDirective, IconDirective, NavComponent,
    NavItemComponent, SpinnerComponent, PlaceholderAnimationDirective, PlaceholderDirective,
    ColDirective, PageItemDirective, PageLinkDirective, PaginationComponent,
    DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownHeaderDirective, DropdownItemDirective,
    ModalComponent, ModalToggleDirective, ModalHeaderComponent, ModalBodyComponent, TooltipDirective, ModalFooterComponent, PopoverDirective, ModalTitleDirective, ButtonCloseDirective,
  ],
  templateUrl: './niveau-stock-list.Component.html',
  styleUrl: './niveau-stock-list.Component.scss'
})
export class NiveauStockListComponent {
  protected loading = false
  protected paginating = false
  protected currentIndex: number  = 0
  protected deleteModel = false
  private  produitList : Produit[] = []
  private service = inject(NiveauStockService)
  private produitService = inject(ProduitService)
  public niveauStockList!:NiveauStock[];
  private entrepriseSelectedService = inject(EntrepriseSelectedService);

  ngOnInit() {
    this.produit();
    this.loadretourProduitList();
  }


  loadretourProduitList() {
    this.service.getNiveauStock(this.entrepriseSelectedService.getEntrepriseSelected()).subscribe({
      next: data => {
        this.niveauStockList = data;
        console.log("niveau Stock List :",data);
      },
      error: err => console.log(err)
    })
  }



  delete() {
    this.service.deleteById(this.item.id).subscribe({
      next: value => {
        this.item = new NiveauStock()
        this.currentIndex = -1
        this.deleteModel = false
        this.loadretourProduitList();
      },
      error: err => {
        console.log(err)
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

  public get pagination() {
    return this.produitService.pagination;
  }

  public set pagination(value) {
    this.produitService.pagination = value;
  }

  public get item(): Produit {
    return this.produitService.item;
  }

  public set item(value: NiveauStock ) {
    this.service.item = value;
  }

  public get generatePageNumbers() {
    return generatePageNumbers(this.pagination)
  }
  public set itemsP(value : Produit[]) {
    this.produitService.items = value;
  }

  public get itemP(): Produit {
    return this.produitService.item;
  }

  public set itemP(value: Produit ) {
    this.produitService.item = value;
  }
  produit() {
    this.produitService.findAll().subscribe({
      next: data => {
        this.produitList = data
      },
      error: err => console.log(err)
    })
  }



  /////
  protected readonly paginationSizes = paginationSizes;
}
