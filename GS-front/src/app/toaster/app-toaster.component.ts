import {Component, inject} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {
  ToastBodyComponent,
  ToastComponent,
  ToasterComponent, ToasterPlacement,
  ToastHeaderComponent
} from "@coreui/angular";
import {ToasterService} from "./controller/toaster.service";

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [
    RouterOutlet,
    ToasterComponent,
    ToastComponent,
    ToastHeaderComponent,
    ToastBodyComponent
  ],
  template: `
    @if (toasts().length > 0) {
      <c-toaster [placement]="position" class="p-3" position="fixed">
        @for (toast of toasts(); track toast; let i = $index; ) {
          <c-toast
            [delay]="toast.delay"
            [color]="toast.color"
            [visible]="true"
            [autohide]="toast.autohide"
            (click)="remove(i)">
            @if(toast.title) {<c-toast-header>{{ toast.title }}</c-toast-header>}
            <c-toast-body>{{ toast.message }}</c-toast-body>
          </c-toast>
        }
      </c-toaster>
    }
  `,
})
export class AppToasterComponent {
  position = ToasterPlacement.BottomStart
  get toasts() {
    return this.toasterService.toasts
  }

  private toasterService = inject(ToasterService)

  remove(index: number) {
    this.toasts().splice(index, 1)
  }
}
