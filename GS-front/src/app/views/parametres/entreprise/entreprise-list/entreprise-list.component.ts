import {Component, inject} from '@angular/core';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  ColComponent,
  ColDirective,
  NavComponent,
  NavItemComponent,
  PlaceholderAnimationDirective,
  RowComponent,
  SpinnerComponent,
  TableDirective,
  PlaceholderDirective,
  PageItemDirective,
  PageLinkDirective,
  PaginationComponent,
  DropdownComponent,
  DropdownToggleDirective,
  DropdownMenuDirective,
  DropdownHeaderDirective,
  DropdownItemDirective,
  ModalComponent,
  ModalToggleDirective,
  ModalHeaderComponent,
  ModalBodyComponent,
  TooltipDirective,
  ModalFooterComponent,
  PopoverDirective,
  ModalTitleDirective,
  ButtonCloseDirective,
  AvatarComponent,
} from "@coreui/angular";
import {EntrepriseService} from "src/app/controller/services/parametres/entreprise.service";
import {Entreprise} from "src/app/controller/entities/parametres/entreprise";
import {RouterLink} from "@angular/router";
import {IconDirective} from "@coreui/icons-angular";
import {generatePageNumbers, paginationSizes} from "src/app/controller/utils/pagination/pagination";
import {UserInfosService} from "../../../../controller/shared/user-infos.service";
import {SubscriptionService} from "../../../../controller/services/parametres/abonnement/subscription.service";
import {AppUserService} from "../../../../controller/auth/services/app-user.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-entreprise-list',
  standalone: true,
  imports: [
    RowComponent, ColComponent, CardComponent, CardBodyComponent, TableDirective,
    ButtonDirective, RouterLink, IconDirective, IconDirective, NavComponent,
    NavItemComponent, SpinnerComponent, PlaceholderAnimationDirective, PlaceholderDirective,
    ColDirective, PageItemDirective, PageLinkDirective, PaginationComponent,
    DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownHeaderDirective, DropdownItemDirective,
    ModalComponent, ModalToggleDirective, ModalHeaderComponent, ModalBodyComponent, TooltipDirective, ModalFooterComponent, PopoverDirective, ModalTitleDirective, ButtonCloseDirective, AvatarComponent, NgIf,
  ],
  templateUrl: './entreprise-list.Component.html',
  styleUrl: './entreprise-list.Component.scss'
})
export class EntrepriseListComponent {
  protected loading = false
  protected paginating = false
  protected currentIndex: number  = 0
  protected deleteModel = false
  public showAdd:boolean = true;
  public nbrEntreprises:number = 0;
  public entreprises !: Entreprise[];
  private service = inject(EntrepriseService);
  private userInfosService = inject(UserInfosService);
  private appUserService = inject(AppUserService);
  private subscriptionService = inject(SubscriptionService);

  ngOnInit() {
    this.getEntreprises();
  }


  public getEntreprises() {
    this.service.findByAdmin(this.userInfosService.getUsername()).subscribe((ress:Entreprise[]) => {
      console.log(ress);
      this.entreprises = ress;
      this.nbrEntreprises = ress.length;
      this.appUserService.findByUsernameWithRoles(this.userInfosService.getUsername()).subscribe(res => {
        console.log(res);
        this.subscriptionService.findById(res.id).subscribe(resl => {
          console.log(resl);
          // @ts-ignore
          if(this.nbrEntreprises >= resl.plan?.maxEntreprises){
            this.showAdd = false;
          }
        }, error => {
          console.log(error);
        });
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });
  }



  delete() {
    this.service.deleteById(this.item.id).subscribe({
      next: value => {
        this.pagination.data.splice(this.currentIndex as number, 1)
        this.pagination.totalElements--
        this.item = new Entreprise()
        this.currentIndex = -1
        this.deleteModel = false
        this.getEntreprises();
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

  public get item(): Entreprise {
    return this.service.item;
  }

  public set item(value: Entreprise ) {
    this.service.item = value;
  }

  public get generatePageNumbers() {
    return generatePageNumbers(this.pagination)
  }

  /////
  protected readonly paginationSizes = paginationSizes;
}
