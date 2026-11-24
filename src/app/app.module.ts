import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  NativeScriptModule, NativeScriptFormsModule,
  NativeScriptRouterModule, registerElement,
} from '@nativescript/angular';
import { PullToRefresh } from '@nativescript-community/ui-pulltorefresh';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CatalogComponent } from './catalog/catalog.component';
import { DetailComponent } from './detail/detail.component';
import { PlaceNameDirective } from './shared/place-name.directive';

registerElement('PullToRefresh', () => PullToRefresh);

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent, WelcomeComponent, CatalogComponent,
    DetailComponent, PlaceNameDirective,
  ],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule.forRoot([
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: 'welcome', component: WelcomeComponent },
      { path: 'catalog', component: CatalogComponent },
      { path: 'detail/:id', component: DetailComponent },
      { path: '**', redirectTo: 'welcome' },
    ]),
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
