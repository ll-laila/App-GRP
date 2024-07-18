import {Component, DestroyRef, inject, Input} from '@angular/core';
import {
  AvatarComponent,
  BadgeComponent,
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
import {NgForOf,NgIf, NgStyle, NgTemplateOutlet} from '@angular/common';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {IconDirective} from '@coreui/icons-angular';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {delay, filter, map, tap} from 'rxjs/operators';
import {TokenService} from "src/app/controller/auth/services/token.service";
import {UserInfosService} from "../../../controller/shared/user-infos.service";
import {FormsModule} from "@angular/forms";
import {Entreprise} from "../../../controller/entities/parametres/entreprise";
import {EntrepriseService} from "../../../controller/services/parametres/entreprise.service";

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  standalone: true,
  imports: [ContainerComponent, HeaderTogglerDirective, SidebarToggleDirective, IconDirective, HeaderNavComponent, NavItemComponent, NavLinkDirective, RouterLink, RouterLinkActive, NgTemplateOutlet, BreadcrumbRouterComponent, ThemeDirective, DropdownComponent, DropdownToggleDirective, TextColorDirective, AvatarComponent, DropdownMenuDirective, DropdownHeaderDirective, DropdownItemDirective, BadgeComponent, DropdownDividerDirective, ProgressBarDirective, ProgressComponent, NgStyle, SpinnerComponent, FormSelectDirective, FormsModule, InputGroupComponent, NgForOf,NgIf]
})
export class DefaultHeaderComponent extends HeaderComponent {

  private entrepriseService = inject(EntrepriseService);
  readonly #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  readonly #colorModeService = inject(ColorModeService);
  readonly colorMode = this.#colorModeService.colorMode;
  readonly #destroyRef: DestroyRef = inject(DestroyRef);

  readonly tokenService = inject(TokenService);
  readonly router = inject(Router);

  public entreprises!: Entreprise[];

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
    this.getEntreprises();
  }


  @Input() sidebarId: string = 'sidebar1';

  logout() {
    this.tokenService.clearToken()
    this.router.navigate(["/login"]).then()
  }
  profile() {
    this.router.navigate(["/profil"]).then();
  }
  notification(){
    this.router.navigate(["/notification"]).then();
  }

  printReport(): void {
    window.print();
  }

  isBonCmdPdfRoute(): boolean {
    return this.router.url === '/inventaire/boncommande/bon-commande/boncmdpdf'
        || this.router.url === '/inventaire/livraison/livraison/livraisonpdf'
        || this.router.url === '/ventes/commande/commande/commandePdf'
        || this.router.url === '/ventes/facture/facture/facturepdf';
  }

  getEntreprises(){
    this.entrepriseService.findByAdmin(this.userInfosService.getUsername()).subscribe(res => {
      console.log(res);
      this.entreprises = res;
    }, error => {
      console.log(error);
    });
  }

  trackById(index: number, item: Entreprise): number {
    return item.id;
  }

  public get adminRole() {
    return !!this.tokenService.getRole()?.some(it => it == "ADMIN")
  }

}

