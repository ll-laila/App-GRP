import {Component, inject} from '@angular/core';
import {
  ButtonDirective, CardBodyComponent, CardComponent, ColComponent, ColDirective,
  NavComponent, NavItemComponent, PlaceholderAnimationDirective,
  RowComponent, SpinnerComponent, TableDirective, PlaceholderDirective,
  PageItemDirective, PageLinkDirective, PaginationComponent,
  DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownHeaderDirective, DropdownItemDirective,
  ModalComponent, ModalToggleDirective, ModalHeaderComponent, ModalBodyComponent, TooltipDirective, ModalFooterComponent, PopoverDirective, ModalTitleDirective, ButtonCloseDirective,
} from "@coreui/angular";
import {LivraisonService} from "src/app/controller/services/inventaire/livraison/livraison.service";
import {Livraison} from "src/app/controller/entities/inventaire/livraison/livraison";
import {Router, RouterLink} from "@angular/router";
import {IconDirective} from "@coreui/icons-angular";
import {generatePageNumbers, paginationSizes} from "src/app/controller/utils/pagination/pagination";
import {EntrepriseSelectedService} from "../../../../../controller/shared/entreprise-selected.service";

@Component({
  selector: 'app-livraison-list',
  standalone: true,
  imports: [
    RowComponent, ColComponent, CardComponent, CardBodyComponent, TableDirective,
    ButtonDirective, RouterLink, IconDirective, IconDirective, NavComponent,
    NavItemComponent, SpinnerComponent, PlaceholderAnimationDirective, PlaceholderDirective,
    ColDirective, PageItemDirective, PageLinkDirective, PaginationComponent,
    DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownHeaderDirective, DropdownItemDirective,
    ModalComponent, ModalToggleDirective, ModalHeaderComponent, ModalBodyComponent, TooltipDirective, ModalFooterComponent, PopoverDirective, ModalTitleDirective, ButtonCloseDirective,
  ],
  templateUrl: './livraison-list.Component.html',
  styleUrl: './livraison-list.Component.scss'
})
export class LivraisonListComponent {
  protected loading = false
  protected paginating = false
  protected currentIndex: number  = 0
  protected deleteModel = false
  public livraisonList!: Livraison[];
  private entrepriseSelectedService = inject(EntrepriseSelectedService);
  private service = inject(LivraisonService);
  private router = inject(Router);


  ngOnInit() {
    this.loadLivraisonList();
  }

  loadLivraisonList() {
    this.service.getLivraisons(this.entrepriseSelectedService.getEntrepriseSelected()).subscribe({
      next: data => {
        this.livraisonList = data;
        console.log("livraison List :",data);
      },
      error: err => console.log(err)
    })
  }


  delete() {
    this.service.deleteById(this.item.id).subscribe({
      next: value => {
        this.item = new Livraison()
        this.currentIndex = -1
        this.deleteModel = false
        this.loadLivraisonList();
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

  public get item(): Livraison {
    return this.service.item;
  }

  public set item(value: Livraison ) {
    this.service.item = value;
  }

  public get generatePageNumbers() {
    return generatePageNumbers(this.pagination)
  }


  protected readonly paginationSizes = paginationSizes;

  public navigateToPdfCreate() {
    this.service.keepData = true
    this.router.navigate(['/inventaire/livraison/livraison/livraisonpdf']).then()
  }
}
