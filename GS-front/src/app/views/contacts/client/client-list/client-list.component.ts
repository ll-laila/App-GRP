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
    ContainerComponent, FormControlDirective, InputGroupComponent, InputGroupTextDirective,
} from "@coreui/angular";
import {ClientService} from "src/app/controller/services/contacts/client.service";
import {Client} from "src/app/controller/entities/contacts/client";
import {RouterLink} from "@angular/router";
import {IconDirective} from "@coreui/icons-angular";
import {generatePageNumbers, paginationSizes} from "src/app/controller/utils/pagination/pagination";
import {EntrepriseSelectedService} from "../../../../controller/shared/entreprise-selected.service";
import {PermissionsAcces} from "../../../../controller/entities/contacts/user/PermissionsAcces";
import {Entreprise} from "../../../../controller/entities/parametres/entreprise";
import {EntrepriseService} from "../../../../controller/services/parametres/entreprise.service";
import {UserInfosService} from "../../../../controller/shared/user-infos.service";
import {Employe} from "../../../../controller/entities/contacts/user/employe";
import {EmployeService} from "../../../../controller/services/contacts/user/employe.service";
import {TokenService} from "../../../../controller/auth/services/token.service";

@Component({
  selector: 'app-client-list',
  standalone: true,
    imports: [
        RowComponent, ColComponent, CardComponent, CardBodyComponent, TableDirective,
        ButtonDirective, RouterLink, IconDirective, IconDirective, NavComponent,
        NavItemComponent, SpinnerComponent, PlaceholderAnimationDirective, PlaceholderDirective,
        ColDirective, PageItemDirective, PageLinkDirective, PaginationComponent,
        DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownHeaderDirective, DropdownItemDirective,
        ModalComponent, ModalToggleDirective, ModalHeaderComponent, ModalBodyComponent, TooltipDirective, ModalFooterComponent, PopoverDirective, ModalTitleDirective, ButtonCloseDirective, ContainerComponent, FormControlDirective, InputGroupComponent, InputGroupTextDirective,
    ],
  templateUrl: './client-list.Component.html',
  styleUrl: './client-list.Component.scss'
})
export class ClientListComponent {
  protected loading = false
  protected paginating = false
  protected currentIndex: number  = 0
  protected deleteModel = false;
  protected clientList!: Client[];
  public entreprises!: Entreprise[];
  private employeService = inject(EmployeService);
  private entrepriseService = inject(EntrepriseService);
  private entrepriseSelectedService = inject(EntrepriseSelectedService);
  private service = inject(ClientService)
  private userInfosService = inject(UserInfosService);
  private tokenService = inject(TokenService);

  ngOnInit() {
      const newVar = this.tokenService.getRole()?.some(it => it == "ADMIN") ? 1 : 0;

      if (newVar == 1) {
          this.getClientsForAdmin();
      } else {
          this.getClientsForEmploye();
      }
  }




    getClientsForAdmin() {
        if (this.entrepriseSelectedService.getEntrepriseSelected() != 0) {
            this.service.getClients(this.entrepriseSelectedService.getEntrepriseSelected()).subscribe({
                next: data => {
                    this.clientList = data;
                    console.log("Clients :",data);
                },
                error: err => console.log(err)
            })
        } else {
            this.entrepriseService.findByAdmin(this.userInfosService.getUsername()).subscribe((res: Entreprise[]) => {
                this.entreprises = res;
                console.log("Entreprises: ", this.entreprises);
                if (this.entreprises && this.entreprises.length > 0) {
                    this.service.getClients(this.entreprises[0].id).subscribe({
                        next: data => {
                            this.clientList = data;
                            console.log("Clients :",data);
                        },
                        error: err => console.log(err)
                    })
                } else {
                    console.log('Aucune entreprise trouvée.');
                }
            }, error => {
                console.log(error);
            });
        }
    }


    getClientsForEmploye() {
        if (this.entrepriseSelectedService.getEntrepriseSelected() != 0) {
            this.service.getClients(this.entrepriseSelectedService.getEntrepriseSelected()).subscribe({
                next: data => {
                    this.clientList = data;
                    console.log("Clients :",data);
                },
                error: err => console.log(err)
            })
        } else {
            this.employeService.findByUserName(this.userInfosService.getUsername()).subscribe((res: Employe) => {
                console.log("empId: ", res.id);
                this.entrepriseService.findEntreprisesAdroitAcces(res.id).subscribe((reslt: Entreprise[]) => {
                    this.entreprises = reslt;
                    console.log("EntreprisesÀdroit: ", this.entreprises);
                    if (this.entreprises && this.entreprises.length > 0) {
                        this.service.getClients(this.entrepriseSelectedService.getEntrepriseSelected()).subscribe({
                            next: data => {
                                this.clientList = data;
                                console.log("Clients :",data);
                            },
                            error: err => console.log(err)
                        })
                    }
                }, error => {
                    console.log(error);
                });
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
        this.item = new Client()
        this.currentIndex = -1
        this.deleteModel = false
          const newVar = this.tokenService.getRole()?.some(it => it == "ADMIN") ? 1 : 0;

          if (newVar == 1) {
              this.getClientsForAdmin();
          } else {
              this.getClientsForEmploye();
          }
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

  public get item(): Client {
    return this.service.item;
  }

  public set item(value: Client ) {
    this.service.item = value;
  }

  public get generatePageNumbers() {
    return generatePageNumbers(this.pagination)
  }


  protected readonly paginationSizes = paginationSizes;
}
