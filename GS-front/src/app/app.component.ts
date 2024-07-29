import {Component, inject} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import { HttpClient } from "@angular/common/http";
import {Title} from "@angular/platform-browser";
import {IconSetService} from "@coreui/icons-angular";
import {iconSubset} from "./icons/icon-subset";
import {TokenService} from "./controller/auth/services/token.service";
import {AppToasterComponent} from "./toaster/app-toaster.component";
import {AppUserService} from "./controller/auth/services/app-user.service";
import {UserInfosService} from "./controller/shared/user-infos.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppToasterComponent],
  template: '<router-outlet/><app-toaster/>'
})
export class AppComponent {
  title = 'app-gestion-entreprise';

  http = inject(HttpClient);


  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private tokenService: TokenService
  ) {
    this.titleService.setTitle(this.title);
    this.iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {

    if (!this.tokenService.isLoggedIn()) this.router.navigate(["login"]).then()

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }
}
