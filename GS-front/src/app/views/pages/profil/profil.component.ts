import { Component, inject, OnInit } from '@angular/core';
import {
    FormSelectDirective,
    ColComponent,
    FormControlDirective,
    FormFloatingDirective,
    FormLabelDirective,
    RowComponent,
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    SpinnerComponent,
    InputGroupComponent,
    ButtonDirective,
    NavComponent,
    NavItemComponent,
    FormCheckComponent,
    FormCheckLabelDirective,
    FormCheckInputDirective,
    FormFeedbackComponent,
    TableDirective,
    AvatarComponent
} from "@coreui/angular";
import { IconDirective } from "@coreui/icons-angular";
import { RouterLink } from "@angular/router";
import { AppUserService } from "../../../controller/auth/services/app-user.service";
import { UserInfosService } from "../../../controller/shared/user-infos.service";
import { AppUser } from "../../../controller/auth/entities/app-user";
import {NgForOf,NgIf, NgTemplateOutlet} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {EntrepriseService} from "../../../controller/services/parametres/entreprise.service";
import {Entreprise} from "../../../controller/entities/parametres/entreprise";
import {EntrepriseSelectedService} from "../../../controller/shared/entreprise-selected.service";

@Component({
  selector: 'app-profil',
  standalone: true,
    imports: [
        FormSelectDirective, RowComponent, ColComponent, FormControlDirective,
        FormsModule, FormLabelDirective, FormFloatingDirective, CardComponent, NgTemplateOutlet,
        CardBodyComponent, CardHeaderComponent, InputGroupComponent, ButtonDirective,
        RouterLink, NavComponent, NavItemComponent, FormCheckComponent, SpinnerComponent,
        FormCheckLabelDirective, FormCheckInputDirective, FormFeedbackComponent, IconDirective, NgForOf, NgIf, TableDirective, AvatarComponent,
    ],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  private _loading = false;
 protected admin!: AppUser;
  private entrepriseService = inject(EntrepriseService);
  public entreprises!: Entreprise[];
  private _userInfosService = inject(UserInfosService);
  private _appUserService = inject(AppUserService);
  private entrepriseSelectedService = inject(EntrepriseSelectedService);

  pagination = { data: [], totalElements: 0, size: 10, totalPages: 1, page: 0, first: true, last: true };
  paginationSizes = [10, 20, 50];
  paginating = false;
  public logo?: string;

    ngOnInit() {
        this.getAdminByUsername(this._userInfosService.getUsername());
        this.getEntreprises();
    }





  getEntreprises(){
    this.entrepriseService.findByAdmin(this._userInfosService.getUsername()).subscribe(res => {
      console.log("profile entreprises: ",res);
      this.entreprises = res;
       this.logo = res.find(entreprise => entreprise.id === this.entrepriseSelectedService.getEntrepriseSelected())?.logo;
        console.log("entreprise logo: ",this.entrepriseSelectedService.getEntrepriseSelected());
    }, error => {
      console.log(error);
    });
  }



  getAdminByUsername(username: string) {
    this._loading = true;
    this._appUserService.findByUsernameWithRoles(username).subscribe({
      next: (res) => {
        this.admin = res;
        console.log('Admin data:', this.admin);
        this._loading = false;
      },
      error: (err) => {
        console.error('Error fetching admin data:', err);
        this._loading = false;
      }
    });
  }



  get loading(): boolean {
    return this._loading;
  }

  set loading(value: boolean) {
    this._loading = value;
  }



  get userInfosService(): UserInfosService {
    return this._userInfosService;
  }

  set userInfosService(value: UserInfosService) {
    this._userInfosService = value;
  }

  get appUserService(): AppUserService {
    return this._appUserService;
  }

  set appUserService(value: AppUserService) {
    this._appUserService = value;
  }

  paginate(page: number, size?: number) {
    // Implement your pagination logic here
  }

  generatePageNumbers() {
    // Implement your logic to generate page numbers here
    return [];
  }
}
