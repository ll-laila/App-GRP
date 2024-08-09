import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {NgScrollbar} from 'ngx-scrollbar';

import {IconDirective} from '@coreui/icons-angular';
import {
  CardBodyComponent,
  CardComponent,
  CardImgDirective,
  ColComponent,
  ColDirective,
  ContainerComponent,
  RowComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective
} from '@coreui/angular';

import {DefaultFooterComponent, DefaultHeaderComponent} from './';
import {navItems, navItems2} from './nav';
import {NgIf, NgStyle} from "@angular/common";
import {TokenService} from "../../controller/auth/services/token.service";
import {AppUserService} from "../../controller/auth/services/app-user.service";
import {UserInfosService} from "../../controller/shared/user-infos.service";
import {SubResponse} from "../../controller/entities/parametres/abonnement/SubResponse";
import {AbonnementsComponent} from "../../views/pages/abonnements/abonnements.component";

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  standalone: true,
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    RouterLink,
    IconDirective,
    NgScrollbar,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    DefaultHeaderComponent,
    ShadowOnScrollDirective,
    ContainerComponent,
    RouterOutlet,
    DefaultFooterComponent,
    CardImgDirective,
    NgStyle,
    CardBodyComponent,
    ColComponent,
    RowComponent,
    CardComponent,
    ColDirective,
    NgIf,
    AbonnementsComponent
  ]
})
export class DefaultLayoutComponent {

  private tokenService = inject(TokenService);
  private appUserService = inject(AppUserService);
  private userInfosService = inject(UserInfosService);

  private router = inject(Router);
  public showName: boolean = true;
  public remade: number = 0;
  public subResponse!:SubResponse;
  public showAbon: boolean = false;
  public showAccueil: boolean = true;




  ngOnInit() {
    this.isRoute();
    this.getDaysRemaining(this.userInfosService.getUsername());
  }


  public get navItems() {
    const newVar = this.tokenService.getRole()?.some(it => it == "ADMIN") ? navItems :
      this.tokenService.getRole()?.some(it => it == "EMPLOYE") ? navItems2 : [];
    if (newVar.length == 0) {
      this.router.navigate(['/Login'])
    }
    return newVar
  }


  onScrollbarUpdate($event: any) {
    // if ($event.verticalUsed) {
    // console.log('verticalUsed', $event.verticalUsed);
    // }
  }


  getLogo(){
    this.showName = !this.showName;
  }



  public getDaysRemaining(username: string){
    this.appUserService.getDaysRemaining(username).subscribe( res => {
      this.subResponse = res;
      this.remade = res.daysRemaining;
      if (this.remade <= 0 && !this.subResponse.haveSub) {
        console.log("dash remade : ", this.remade);
      }
    }, error => {
      console.log(error);
    });
  }


  isRoute(): void {
    if(this.router.url === './pages/abonnements/abonnements'){
        this.showAbon = true;
        this.showAccueil = false;
    }
  }

}
