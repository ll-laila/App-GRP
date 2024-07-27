import {Component, inject} from '@angular/core';
import {
  ButtonDirective, CardBodyComponent, CardComponent, ColComponent, ColDirective,
  NavComponent, NavItemComponent, PlaceholderAnimationDirective,
  RowComponent, SpinnerComponent, TableDirective, PlaceholderDirective,
  PageItemDirective, PageLinkDirective, PaginationComponent,
  DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownHeaderDirective, DropdownItemDirective,
  ModalComponent, ModalToggleDirective, ModalHeaderComponent, ModalBodyComponent, TooltipDirective, ModalFooterComponent, PopoverDirective, ModalTitleDirective, ButtonCloseDirective,
} from "@coreui/angular";
import {FournisseurService} from "src/app/controller/services/contacts/fournisseur.service";
import {Fournisseur} from "src/app/controller/entities/contacts/fournisseur";
import {RouterLink} from "@angular/router";
import {IconDirective} from "@coreui/icons-angular";
import {generatePageNumbers, paginationSizes} from "src/app/controller/utils/pagination/pagination";
import {Client} from "../../../../controller/entities/contacts/client";
import {EntrepriseSelectedService} from "../../../../controller/shared/entreprise-selected.service";

@Component({
  selector: 'app-fournisseur-list',
  standalone: true,
  imports: [
    RowComponent, ColComponent, CardComponent, CardBodyComponent, TableDirective,
    ButtonDirective, RouterLink, IconDirective, IconDirective, NavComponent,
    NavItemComponent, SpinnerComponent, PlaceholderAnimationDirective, PlaceholderDirective,
    ColDirective, PageItemDirective, PageLinkDirective, PaginationComponent,
    DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownHeaderDirective, DropdownItemDirective,
    ModalComponent, ModalToggleDirective, ModalHeaderComponent, ModalBodyComponent, TooltipDirective, ModalFooterComponent, PopoverDirective, ModalTitleDirective, ButtonCloseDirective,
  ],
  templateUrl: './fournisseur-list.Component.html',
  styleUrl: './fournisseur-list.Component.scss'
})
export class FournisseurListComponent {
  protected loading = false
  protected paginating = false
  protected currentIndex: number  = 0
  protected deleteModel = false
  protected fournisseurList!: Fournisseur[]
  private entrepriseSelectedService = inject(EntrepriseSelectedService);
  private service = inject(FournisseurService)

  ngOnInit() {
    this.loadFournisseurList();
  }


  loadFournisseurList() {
    this.service.getFournisseurs(this.entrepriseSelectedService.getEntrepriseSelected()).subscribe({
      next: data => {
        this.fournisseurList = data;
        console.log("Fournisseurs :",data);
      },
      error: err => console.log(err)
    })
  }



  delete() {
    this.service.deleteById(this.item.id).subscribe({
      next: value => {
        this.item = new Fournisseur()
        this.currentIndex = -1
        this.deleteModel = false
        this.loadFournisseurList();
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

  public get item(): Fournisseur {
    return this.service.item;
  }

  public set item(value: Fournisseur ) {
    this.service.item = value;
  }

  public get generatePageNumbers() {
    return generatePageNumbers(this.pagination)
  }

  /////
  protected readonly paginationSizes = paginationSizes;
}
