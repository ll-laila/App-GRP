import {Component, inject} from '@angular/core';
import {
  ButtonDirective, CardBodyComponent, CardComponent, ColComponent, ColDirective,
  NavComponent, NavItemComponent, PlaceholderAnimationDirective,
  RowComponent, SpinnerComponent, TableDirective, PlaceholderDirective,
  PageItemDirective, PageLinkDirective, PaginationComponent,
  DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownHeaderDirective, DropdownItemDirective,
  ModalComponent, ModalToggleDirective, ModalHeaderComponent, ModalBodyComponent, TooltipDirective, ModalFooterComponent, PopoverDirective, ModalTitleDirective, ButtonCloseDirective,
} from "@coreui/angular";
import {EmployeService} from "src/app/controller/services/contacts/user/employe.service";
import {Employe} from "src/app/controller/entities/contacts/user/employe";
import {RouterLink} from "@angular/router";
import {IconDirective} from "@coreui/icons-angular";
import {generatePageNumbers, paginationSizes} from "src/app/controller/utils/pagination/pagination";
import {PermissionsAcces} from "../../../../../controller/entities/contacts/user/PermissionsAcces";
import {Entreprise} from "../../../../../controller/entities/parametres/entreprise";
import {EntrepriseSelectedService} from "../../../../../controller/shared/entreprise-selected.service";
import {EntrepriseService} from "../../../../../controller/services/parametres/entreprise.service";
import {UserInfosService} from "../../../../../controller/shared/user-infos.service";

@Component({
  selector: 'app-employe-list',
  standalone: true,
  imports: [
    RowComponent, ColComponent, CardComponent, CardBodyComponent, TableDirective,
    ButtonDirective, RouterLink, IconDirective, IconDirective, NavComponent,
    NavItemComponent, SpinnerComponent, PlaceholderAnimationDirective, PlaceholderDirective,
    ColDirective, PageItemDirective, PageLinkDirective, PaginationComponent,
    DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownHeaderDirective, DropdownItemDirective,
    ModalComponent, ModalToggleDirective, ModalHeaderComponent, ModalBodyComponent, TooltipDirective, ModalFooterComponent, PopoverDirective, ModalTitleDirective, ButtonCloseDirective,
  ],
  templateUrl: './employe-list.Component.html',
  styleUrl: './employe-list.Component.scss'
})
export class EmployeListComponent {
  protected loading = false
  protected paginating = false
  protected currentIndex: number  = 0
  protected deleteModel = false
  public employers: Employe[] = [];
  public entreprises!: Entreprise[];
  private userInfosService = inject(UserInfosService);
  private entrepriseService = inject(EntrepriseService);
  private entrepriseSelectedService = inject(EntrepriseSelectedService);
  private service = inject(EmployeService)

  ngOnInit() {
    this.getEmployers();
  }


  getEmployers(){
    if(this.entrepriseSelectedService.getEntrepriseSelected() !=0 ){
      this.service.findAll().subscribe(data => {
        this.employers = data;
        this.employers = this.employers.filter(employe => {
          const hasPermissionForEntrepriseId = employe.permissionsAcces?.some((permission: PermissionsAcces) =>
              permission.entrepriseId == this.entrepriseSelectedService.getEntrepriseSelected());
          return hasPermissionForEntrepriseId;
        });
        console.log(this.employers);
      });


    }else{
      this.entrepriseService.findByAdmin(this.userInfosService.getUsername()).subscribe( (res: Entreprise[]) => {
        this.entreprises = res;
        console.log("Entreprises : ", this.entreprises)
        if (this.entreprises && this.entreprises.length > 0) {
          this.service.findAll().subscribe(data => {
            this.employers = data;
            this.employers = this.employers.filter(employe => {
              const hasPermissionForEntrepriseId = employe.permissionsAcces?.some((permission: PermissionsAcces) =>
                  permission.entrepriseId == this.entreprises[0].id);
              this.entrepriseSelectedService.setEntrepriseSelected(this.entreprises[0].id)
              return hasPermissionForEntrepriseId;
            });
            console.log(this.employers);
          });

        }
      }, error => {
        console.log(error);
      });
    }
  }




  delete() {
    this.service.deleteById(this.item.id).subscribe({
      next: value => {
        this.pagination.data.splice(this.currentIndex as number, 1)
        this.pagination.totalElements--
        this.item = new Employe()
        this.currentIndex = -1
        this.deleteModel = false
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

  public get item(): Employe {
    return this.service.item;
  }

  public set item(value: Employe ) {
    this.service.item = value;
  }

  public get generatePageNumbers() {
    return generatePageNumbers(this.pagination)
  }

  /////
  protected readonly paginationSizes = paginationSizes;
}
