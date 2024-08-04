import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation, withHashLocation,
  withInMemoryScrolling,
  withRouterConfig, withViewTransitions
} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import {DropdownModule, SidebarModule} from "@coreui/angular";
import {IconSetService} from "@coreui/icons-angular";
import {provideAnimations} from "@angular/platform-browser/animations";
import {errorInterceptor, interceptors} from "./controller/auth/interceptors";
import { NgxStripeModule } from 'ngx-stripe';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload'
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      }),
      withEnabledBlockingInitialNavigation(),
      withViewTransitions(),
      withHashLocation(),
    ),
    importProvidersFrom(SidebarModule, DropdownModule, NgxStripeModule.forRoot('pk_test_51P4gaDP3zlq0Z21jPyA1xkWfTB9S7ww4sZxHyiwJwGHcuGW1OKDSYo8zIknFv9yW9ap8JyBMKXtasrWjpDhcJzB700ZcORWGm7')),
    IconSetService,
    provideAnimations(),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([interceptors, errorInterceptor])),
  ]
};
