import {Component, inject} from '@angular/core';
import {
  ButtonDirective, CardBodyComponent, CardComponent, ColComponent, ColDirective,
  NavComponent, NavItemComponent, PlaceholderAnimationDirective,
  RowComponent, SpinnerComponent, TableDirective, PlaceholderDirective,
  PageItemDirective, PageLinkDirective, PaginationComponent,
  DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownHeaderDirective, DropdownItemDirective,
  ModalComponent, ModalToggleDirective, ModalHeaderComponent, ModalBodyComponent, TooltipDirective, ModalFooterComponent, PopoverDirective, ModalTitleDirective, ButtonCloseDirective,
} from "@coreui/angular";
import {FactureService} from "src/app/controller/services/ventes/facture/facture.service";
import {Facture} from "src/app/controller/entities/ventes/facture/facture";
import {Router, RouterLink} from "@angular/router";
import {IconDirective} from "@coreui/icons-angular";
import {generatePageNumbers, paginationSizes} from "src/app/controller/utils/pagination/pagination";
import {UserInfosService} from "../../../../../controller/shared/user-infos.service";
import {Employe} from "../../../../../controller/entities/contacts/user/employe";
import {EmployeService} from "../../../../../controller/services/contacts/user/employe.service";
import {TokenService} from "../../../../../controller/auth/services/token.service";
import {NgIf} from "@angular/common";
import {ToasterService} from "../../../../../toaster/controller/toaster.service";


@Component({
  selector: 'app-facture-list',
  standalone: true,
  imports: [
    RowComponent, ColComponent, CardComponent, CardBodyComponent, TableDirective,
    ButtonDirective, RouterLink, IconDirective, IconDirective, NavComponent,
    NavItemComponent, SpinnerComponent, PlaceholderAnimationDirective, PlaceholderDirective,
    ColDirective, PageItemDirective, PageLinkDirective, PaginationComponent,
    DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownHeaderDirective, DropdownItemDirective,
    ModalComponent, ModalToggleDirective, ModalHeaderComponent, ModalBodyComponent, TooltipDirective, ModalFooterComponent, PopoverDirective, ModalTitleDirective, ButtonCloseDirective, NgIf,
  ],
  templateUrl: './facture-list.Component.html',
  styleUrl: './facture-list.Component.scss'
})
export class FactureListComponent {
  protected loading = false
  protected paginating = false
  protected currentIndex: number  = 0
  protected deleteModel = false
  private toasterService = inject(ToasterService);
  private router = inject(Router);

  private service = inject(FactureService);
  private serviceEmploye = inject(EmployeService);
  private userInfosService = inject(UserInfosService);
  private tokenService = inject(TokenService);
  private employe: Employe = new Employe();
  public isEmploye: boolean = false;
  public a: boolean = false;
  ngOnInit() {
    this.findAll();
    this.getEmployeByUsername(this.userInfosService.getUsername());
  }


  public getEmployeByUsername(username: string) {
    this.serviceEmploye.findByUserName(username).subscribe(res => {
      this.employe.username = res.username;
      this.employe.email = res.email;
      this.employe.phone = res.phone;
      this.employe.enabled = res.enabled;
      this.employe.credentialsNonExpired = res.credentialsNonExpired;
      this.employe.accountNonExpired = res.accountNonExpired;
      this.employe.accountNonLocked = res.accountNonLocked;
      this.employe.password = res.password;
      this.employe.passwordChanged = res.passwordChanged;
      this.employe.confirmPassword = res.confirmPassword;
      this.employe.code = res.code;
      this.employe.nom = res.nom;
      this.employe.prenom = res.prenom;
      this.employe.telephone = res.telephone;
      this.employe.adresse = res.adresse;
      this.employe.destinataireEmploye = res.destinataireEmploye;
      this.employe.entreprise = res.entreprise;
      this.employe.entreprisesAdroitAcces = res.entreprisesAdroitAcces;
      this.employe.permissionsAcces = res.permissionsAcces;
      console.log(res);
    }, error => {
      console.log(error);
    });
  }


  findAll() {
    this.loading = true
    this.paginate().then(() => this.loading = false)
  }

  async paginate(page: number = this.pagination.page, size: number = this.pagination.size) {
    this.paginating = true
    this.service.findPaginated(page, size).subscribe({
      next: value => {
        this.pagination = value
        this.paginating = false
      },
      error: err => {
        console.log(err)
        this.paginating = false
      }
    })
  }

  public deletefacture(){
    this.service.deleteById(this.item.id).subscribe({
      next: value => {
        this.pagination.data.splice(this.currentIndex as number, 1)
        this.pagination.totalElements--
        this.item = new Facture()
        this.currentIndex = -1
        this.deleteModel = false
      },
      error: err => {
        console.log(err)
      }
    })

  }

  delete() {
    this.isEmploye = !!this.tokenService.getRole()?.some(it => it == "EMPLOYE");
    if(this.isEmploye){
      // @ts-ignore
      this.employe.permissionsAcces.forEach(permission => {
        if(permission.nom == 'supprimer facture' && permission.etat == true &&
            (permission.entrepriseId === this.employe.entreprise?.id ||
                this.employe.entreprisesAdroitAcces?.some(entreprise => entreprise.id === permission.entrepriseId))
        ){
          this.a = true;
        }
      });
      if(this.a){
          this.deletefacture();
      }else{
        this.router.navigate(["/ventes/facture/facture"]).then();
        this.toasterService.toast({message: "Vous n'avez pas le droit de supprimer une facture", color: "danger"});
      }
    } else{
      this.deletefacture();
    }
  }


  create(){
    this.isEmploye = !!this.tokenService.getRole()?.some(it => it == "EMPLOYE");
    if(this.isEmploye){
      // @ts-ignore
      this.employe.permissionsAcces.forEach(permission => {
        if(permission.nom == 'ajouter facture' && permission.etat == true &&
            (permission.entrepriseId === this.employe.entreprise?.id ||
                this.employe.entreprisesAdroitAcces?.some(entreprise => entreprise.id === permission.entrepriseId))        ){
          this.a = true;
        }
      });
      if(this.a){
        this.a = false;
        this.router.navigate(["/ventes/facture/facture/create"]).then();
      }else{
        this.router.navigate(["/ventes/facture/facture"]).then();
        this.toasterService.toast({message: "Vous n'avez pas le droit de créer une facture", color: "danger"});
      }
    } else{
      this.router.navigate(["/ventes/facture/facture/create"]).then();
    }
  }

  updateFacture(it: Facture){
    this.item = it;
    this.isEmploye = !!this.tokenService.getRole()?.some(it => it == "EMPLOYE");
    if(this.isEmploye){
      // @ts-ignore
      this.employe.permissionsAcces.forEach(permission => {
        if(permission.nom == 'modifier facture' && permission.etat == true
            && permission.entrepriseId == this.employe.entreprise?.id &&
            (permission.entrepriseId === this.employe.entreprise?.id ||
                this.employe.entreprisesAdroitAcces?.some(entreprise => entreprise.id === permission.entrepriseId))
        ){
          this.a = true;
        }
      });
      if(this.a){
        this.a = false;
        this.router.navigate(["/ventes/facture/facture/update"]).then();
      }else{
        this.router.navigate(["/ventes/facture/facture"]).then();
        this.toasterService.toast({message: "Vous n'avez pas le droit de modifier une facture", color: "danger"});
      }
    } else{
      this.router.navigate(["/ventes/facture/facture/update"]).then();
    }
  }


  // GETTERS AND SETTERS
  public get items() {
    return this.service.items;
  }

  public set items(value) {
    this.service.items = value;
  }

  public get pagination() {
    return this.service.paginationF;
  }

  public set pagination(value) {
    this.service.paginationF = value;
  }

  public get item(): Facture {
    return this.service.item;
  }

  public set item(value: Facture ) {
    this.service.item = value;
  }

  public get generatePageNumbers() {
    return generatePageNumbers(this.pagination)
  }
  /////
  protected readonly paginationSizes = paginationSizes;

}
