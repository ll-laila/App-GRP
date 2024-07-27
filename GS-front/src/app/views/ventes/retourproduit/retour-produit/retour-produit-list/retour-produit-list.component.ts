import {Component, inject} from '@angular/core';
import {
  ButtonDirective, CardBodyComponent, CardComponent, ColComponent, ColDirective,
  NavComponent, NavItemComponent, PlaceholderAnimationDirective,
  RowComponent, SpinnerComponent, TableDirective, PlaceholderDirective,
  PageItemDirective, PageLinkDirective, PaginationComponent,
  DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownHeaderDirective, DropdownItemDirective,
  ModalComponent, ModalToggleDirective, ModalHeaderComponent, ModalBodyComponent, TooltipDirective, ModalFooterComponent, PopoverDirective, ModalTitleDirective, ButtonCloseDirective,
} from "@coreui/angular";
import {RetourProduitService} from "src/app/controller/services/ventes/retourproduit/retour-produit.service";
import {RetourProduit} from "src/app/controller/entities/ventes/retourproduit/retour-produit";
import {RouterLink} from "@angular/router";
import {IconDirective} from "@coreui/icons-angular";
import {generatePageNumbers, paginationSizes} from "src/app/controller/utils/pagination/pagination";
import {Devis} from "../../../../../controller/entities/ventes/devis/devis";
import {EntrepriseSelectedService} from "../../../../../controller/shared/entreprise-selected.service";


@Component({
  selector: 'app-retour-produit-list',
  standalone: true,
  imports: [
    RowComponent, ColComponent, CardComponent, CardBodyComponent, TableDirective,
    ButtonDirective, RouterLink, IconDirective, IconDirective, NavComponent,
    NavItemComponent, SpinnerComponent, PlaceholderAnimationDirective, PlaceholderDirective,
    ColDirective, PageItemDirective, PageLinkDirective, PaginationComponent,
    DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownHeaderDirective, DropdownItemDirective,
    ModalComponent, ModalToggleDirective, ModalHeaderComponent, ModalBodyComponent, TooltipDirective, ModalFooterComponent, PopoverDirective, ModalTitleDirective, ButtonCloseDirective,
  ],
  templateUrl: './retour-produit-list.Component.html',
  styleUrl: './retour-produit-list.Component.scss'
})
export class RetourProduitListComponent {
  protected loading = false
  protected paginating = false
  protected currentIndex: number  = 0
  protected deleteModel = false
  public retourProduitList!:RetourProduit[];
  private entrepriseSelectedService = inject(EntrepriseSelectedService);

  private service = inject(RetourProduitService)

  ngOnInit() {
      this.loadretourProduitList();
  }


  loadretourProduitList() {
    this.service.getRetourProduits(this.entrepriseSelectedService.getEntrepriseSelected()).subscribe({
      next: data => {
        this.retourProduitList = data;
        console.log("retour Produit List :",data);
      },
      error: err => console.log(err)
    })
  }




  delete() {
    this.service.deleteById(this.item.id).subscribe({
      next: value => {
        this.item = new RetourProduit()
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
    return this.service.pagination;
  }

  public set pagination(value) {
    this.service.pagination = value;
  }

  public get item(): RetourProduit {
    return this.service.item;
  }

  public set item(value: RetourProduit ) {
    this.service.item = value;
  }

  public get generatePageNumbers() {
    return generatePageNumbers(this.pagination)
  }

  /////
  protected readonly paginationSizes = paginationSizes;
}
