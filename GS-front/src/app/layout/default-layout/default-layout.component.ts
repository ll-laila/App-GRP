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
    NgIf
  ]
})
export class DefaultLayoutComponent {

  private tokenService = inject(TokenService);
  private router = inject(Router);
  public showName: boolean = true;

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
}
