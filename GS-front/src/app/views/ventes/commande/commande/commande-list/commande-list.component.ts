import {Component, inject} from '@angular/core';
import {
  ButtonDirective, CardBodyComponent, CardComponent, ColComponent, ColDirective,
  NavComponent, NavItemComponent, PlaceholderAnimationDirective,
  RowComponent, SpinnerComponent, TableDirective, PlaceholderDirective,
  PageItemDirective, PageLinkDirective, PaginationComponent,
  DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownHeaderDirective, DropdownItemDirective,
  ModalComponent, ModalToggleDirective, ModalHeaderComponent, ModalBodyComponent, TooltipDirective, ModalFooterComponent, PopoverDirective, ModalTitleDirective, ButtonCloseDirective,
} from "@coreui/angular";
import {CommandeService} from "src/app/controller/services/ventes/commande/commande.service";
import {Commande} from "src/app/controller/entities/ventes/commande/commande";
import {Router, RouterLink} from "@angular/router";
import {IconDirective} from "@coreui/icons-angular";
import {generatePageNumbers, paginationSizes} from "src/app/controller/utils/pagination/pagination";
import {EntrepriseSelectedService} from "../../../../../controller/shared/entreprise-selected.service";
import {Fournisseur} from "../../../../../controller/entities/contacts/fournisseur";

@Component({
  selector: 'app-commande-list',
  standalone: true,
  imports: [
    RowComponent, ColComponent, CardComponent, CardBodyComponent, TableDirective,
    ButtonDirective, RouterLink, IconDirective, IconDirective, NavComponent,
    NavItemComponent, SpinnerComponent, PlaceholderAnimationDirective, PlaceholderDirective,
    ColDirective, PageItemDirective, PageLinkDirective, PaginationComponent,
    DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownHeaderDirective, DropdownItemDirective,
    ModalComponent, ModalToggleDirective, ModalHeaderComponent, ModalBodyComponent, TooltipDirective, ModalFooterComponent, PopoverDirective, ModalTitleDirective, ButtonCloseDirective,
  ],
  templateUrl: './commande-list.Component.html',
  styleUrl: './commande-list.Component.scss'
})
export class CommandeListComponent {
  protected loading = false
  protected paginating = false
  protected currentIndex: number  = 0
  protected deleteModel = false
  protected commandesList!: Commande[]

  private entrepriseSelectedService = inject(EntrepriseSelectedService);

  private service = inject(CommandeService)
  private router = inject(Router);

  ngOnInit() {
    this.loadCommandesList()
  }


  loadCommandesList() {
    this.service.getCommandes(this.entrepriseSelectedService.getEntrepriseSelected()).subscribe({
      next: data => {
        this.commandesList = data;
        console.log("commandes :",data);
      },
      error: err => console.log(err)
    })
  }


  delete() {
    this.service.deleteById(this.item.id).subscribe({
      next: value => {
        this.item = new Commande()
        this.currentIndex = -1
        this.deleteModel = false
        this.loadCommandesList();
      },
      error: err => {
        console.log(err)
      }
    })
  }

  public navigateToPdfCreate() {
    this.service.keepData = true
    this.router.navigate(['/ventes/commande/commande/commandePdf']).then();
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

  public get item(): Commande {
    return this.service.item;
  }

  public set item(value: Commande ) {
    this.service.item = value;
  }

  public get generatePageNumbers() {
    return generatePageNumbers(this.pagination)
  }


  protected readonly paginationSizes = paginationSizes;


}
