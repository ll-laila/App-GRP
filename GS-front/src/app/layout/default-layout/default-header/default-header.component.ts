import {Component, DestroyRef, inject, Input} from '@angular/core';
import {
  AvatarComponent,
  BadgeComponent,
  BadgeModule,
  BreadcrumbRouterComponent,
  ColorModeService,
  ContainerComponent,
  DropdownComponent,
  DropdownDividerDirective,
  DropdownHeaderDirective,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  FormSelectDirective,
  HeaderComponent,
  HeaderNavComponent,
  HeaderTogglerDirective,
  InputGroupComponent,
  NavItemComponent,
  NavLinkDirective,
  ProgressBarDirective,
  ProgressComponent,
  SidebarToggleDirective,
  SpinnerComponent,
  TextColorDirective,
  ThemeDirective
} from '@coreui/angular';

import {NgForOf, NgIf, NgStyle, NgTemplateOutlet} from '@angular/common';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {IconDirective} from '@coreui/icons-angular';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {delay, filter, map, tap} from 'rxjs/operators';
import {TokenService} from 'src/app/controller/auth/services/token.service';
import {UserInfosService} from '../../../controller/shared/user-infos.service';
import {AppUserService} from '../../../controller/auth/services/app-user.service';
import {FormsModule} from '@angular/forms';
import {Entreprise} from '../../../controller/entities/parametres/entreprise';
import {EntrepriseService} from '../../../controller/services/parametres/entreprise.service';
import {EntrepriseSelectedService} from "../../../controller/shared/entreprise-selected.service";
import {NotificationService} from "../../../controller/services/parametres/notification.service";
import {Employe} from "../../../controller/entities/contacts/user/employe";
import {EmployeService} from "../../../controller/services/contacts/user/employe.service";
import {NotificationComponent} from "../../../views/parametres/notification/notification.component";


@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  standalone: true,
  imports: [
    BadgeModule,
    ContainerComponent,
    HeaderTogglerDirective,
    SidebarToggleDirective,
    IconDirective,
    HeaderNavComponent,
    NavItemComponent,
    NavLinkDirective,
    RouterLink,
    RouterLinkActive,
    NgTemplateOutlet,
    BreadcrumbRouterComponent,
    ThemeDirective,
    DropdownComponent,
    DropdownToggleDirective,
    TextColorDirective,
    AvatarComponent,
    DropdownMenuDirective,
    DropdownHeaderDirective,
    DropdownItemDirective,
    BadgeComponent,
    DropdownDividerDirective,
    ProgressBarDirective,
    ProgressComponent,
    NgStyle,
    SpinnerComponent,
    FormSelectDirective,
    FormsModule,
    InputGroupComponent,
    NgForOf,
    NgIf,
    NotificationComponent
  ]
})
export class DefaultHeaderComponent extends HeaderComponent {

  private entrepriseService = inject(EntrepriseService);
  private employeService = inject(EmployeService);
  private entrepriseSelectedService = inject(EntrepriseSelectedService)
  readonly #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  readonly #colorModeService = inject(ColorModeService);
  readonly colorMode = this.#colorModeService.colorMode;
  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  private notificationService =inject(NotificationService);
  private appUserService = inject(AppUserService);
  readonly tokenService = inject(TokenService);
  readonly router = inject(Router);

  public entreprises!: Entreprise[];
  public entrepriseSelected!: Entreprise;
  public totalNotifications:number=0;
  public vu : boolean = false;
  public logo?: string ;

  constructor(private userInfosService: UserInfosService) {
    super();
    this.#colorModeService.localStorageItemName.set('coreui-free-angular-admin-template-theme-default');
    this.#colorModeService.eventName.set('ColorSchemeChange');

    this.#activatedRoute.queryParams
        .pipe(
            delay(1),
            map(params => <string>params['theme']?.match(/^[A-Za-z0-9\s]+/)?.[0]),
            filter(theme => ['dark', 'light', 'auto'].includes(theme)),
            tap(theme => {
              this.colorMode.set(theme);
            }),
            takeUntilDestroyed(this.#destroyRef)
        )
        .subscribe();
  }

  ngOnInit() {
    const newVar = this.tokenService.getRole()?.some(it => it == "ADMIN") ? 1 : 0;
    console.log("newVar :",newVar);
    if(newVar == 1){
      this.getEntreprises();
    }
    else{
      this.getEntreprisesAdroitAcces();
    }
    this.getDaysRemaining();
  }


  @Input() sidebarId: string = 'sidebar1';

  logout() {
    this.entrepriseSelectedService.clearEntrepriseSelected();
    this.tokenService.clearToken()
    this.router.navigate(['/login']).then();
  }

  profile() {
    this.router.navigate(['/profil']).then();
  }

  parametres_Compte() {
    this.router.navigate(['/parametresCompte']).then();
  }

  notification(){
    this.totalNotifications = 0;
    this.vu = true;
  }


  // isBonCmdPdfRoute(): boolean {
  //   return this.router.url === '/inventaire/boncommande/bon-commande/boncmdpdf'
  //       || this.router.url === '/inventaire/livraison/livraison/livraisonpdf'
  //       || this.router.url === '/ventes/commande/commande/commandePdf'
  //       || this.router.url === '/ventes/facture/facture/facturepdf';
  // }

  getEntreprises() {
    this.entrepriseService.findByAdmin(this.userInfosService.getUsername()).subscribe(res => {
      console.log(res);
      this.entreprises = res;
      if (this.entreprises.length > 0) {
        this.logo = this.entreprises[0].logo;
        this.getTotalNotifications(this.entreprises[0].id);
        this.entrepriseSelectedService.setEntrepriseSelected(this.entreprises[0].id);
      }
    }, error => {
      console.log(error);
    });
  }

  getEntreprisesAdroitAcces() {
    this.employeService.findByUserName(this.userInfosService.getUsername()).subscribe((res: Employe) => {
      console.log("empId : ", res.id);
      this.entrepriseService.findEntreprisesAdroitAcces(res.id).subscribe((reslt: Entreprise[]) => {
        this.entreprises = reslt;
        console.log("EntreprisesÀdroit :",this.entreprises);
        if (this.entreprises && this.entreprises.length > 0) {
          console.log("from header :",this.entreprises[0]);
          this.logo = this.entreprises[0].logo;
          this.getTotalNotifications(this.entreprises[0].id);
          this.entrepriseSelectedService.setEntrepriseSelected(this.entreprises[0].id);
        }
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });
  }





  onEntrepriseChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedId = Number(selectElement.value);
    const selectedEntreprise = this.entreprises.find(it => it.id === selectedId);

    if (selectedEntreprise) {
      this.entrepriseSelected = selectedEntreprise;
      this.entrepriseSelectedService.clearEntrepriseSelected();
      this.entrepriseSelectedService.setEntrepriseSelected(this.entrepriseSelected.id);
      this.logo = selectedEntreprise.logo;
      this.totalNotifications = 0;
      this.getTotalNotifications(this.entrepriseSelectedService.getEntrepriseSelected());
      console.log("from header : ", this.entrepriseSelectedService.getEntrepriseSelected());
       window.location.reload();
    } else {
      console.error('Entreprise not found');
    }
  }


  trackById(index: number, item: Entreprise): number {
    return item.id;
  }

  public get adminRole() {
    return !!this.tokenService.getRole()?.some(it => it == "ADMIN")
  }

  getTotalNotifications(id : number){
    this.notificationService.findAll(id).subscribe({
      next: (notifications) => {
        this.totalNotifications = notifications.length;
        if(this.vu == true){
          this.totalNotifications = 0;
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des notifications', err);
      }
    });
  }

  public getDaysRemaining(){
    this.appUserService.getDaysRemaining(this.userInfosService.getUsername()).subscribe( res => {
      if(res.daysRemaining>0 && !res.haveSub){
        this.totalNotifications = this.totalNotifications + 1;
      }
    }, error => {
      console.log(error);
    });
  }


}
