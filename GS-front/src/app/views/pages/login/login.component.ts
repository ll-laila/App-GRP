import {Component, inject} from '@angular/core';
import {NgStyle} from '@angular/common';
import {IconDirective} from '@coreui/icons-angular';
import {
  ButtonDirective, CardBodyComponent, CardComponent, CardGroupComponent,
  ColComponent, ContainerComponent, FormControlDirective, FormDirective,
  InputGroupComponent, InputGroupTextDirective, RowComponent, SpinnerComponent,
  TextColorDirective, FormFeedbackComponent
} from '@coreui/angular';
import {AuthService} from "src/app/controller/auth/services/auth.service";
import {Router, RouterLink} from "@angular/router";
import {TokenService} from "src/app/controller/auth/services/token.service";
import {JwtRequestValidator} from "src/app/controller/auth/validators/jwt-request.validator";
import {FormsModule} from "@angular/forms";
import {JwtRequest} from "src/app/controller/auth/entities/jwt-request";
import {ToasterService} from "../../../toaster/controller/toaster.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent,
    CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective,
    ButtonDirective, NgStyle, FormsModule, SpinnerComponent, RouterLink, FormFeedbackComponent
  ]
})
export class LoginComponent {

  loading = false

  private authService = inject(AuthService)
  private toasterService = inject(ToasterService)
  private router = inject(Router)
  private tokenService = inject(TokenService)
  protected validator = JwtRequestValidator.init(() => this.item)

  get item(): JwtRequest {
    return this.authService.item;
  }

  set item(value: JwtRequest ) {
    this.authService.item = value;
  }

  login() {
    if (!this.validator.validate()) return;
    this.loading = true;
    this.authService.login().subscribe({
      next: data => {
        console.log(data)
        this.tokenService.setToken(data.accessToken)
        this.tokenService.setRole(data.roles)
        this.validator.reset()
        this.item = new JwtRequest()
        this.router.navigate(["dashboard"]).then()
        this.loading = false
        this.toasterService.toast({message: "Welcome to gestion app!", color: "success"})
      },
      error: err => {
        console.log(err)
        this.loading = false;
      }
    })
  }
}
