import {Component, inject} from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent,
  FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective, FormFeedbackComponent
} from '@coreui/angular';
import {Router, RouterLink} from "@angular/router";
import {AppUserService} from "src/app/controller/auth/services/app-user.service";
import {AppUserValidator} from "src/app/controller/auth/validators/app-user.validator";
import {AppUser} from "src/app/controller/auth/entities/app-user";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective,
    InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, RouterLink,
    FormFeedbackComponent, ReactiveFormsModule, FormsModule
  ]
})
export class RegisterComponent {
  private service = inject(AppUserService)
  private router = inject(Router)
  protected validator = AppUserValidator.init(() => this.item)

  createAccount() {
    if (!this.validator.validate()) return
    this.service.create().subscribe({
      next: value => {
        this.router.navigate(["/login"]).then()
        this.validator.reset()
        this.item = new AppUser()
      },
      error: err => console.log(err)
    })
  }

  get item(): AppUser {
    return this.service.item;
  }

  set item(val: AppUser ) {
    this.service.item = val;
  }

}
