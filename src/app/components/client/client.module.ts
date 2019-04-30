import {NgModule} from '@angular/core';

import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

import { ClientRoutingModule } from './client-routing.module';
import {ClientLayoutComponent} from '../../layouts/client-layout/client-layout.component';
import { HeaderClientComponent } from '../../layouts/shared/header-client/header-client.component';
import { UserComponent } from './user/user.component';
import { SharedModule} from '../shared/shared.module';
import { HeaderClientProfileComponent} from '../../layouts/shared/header-client-profile/header-client-profile.component';


@NgModule({
  declarations: [
    UserComponent,
    HeaderClientComponent,
    ClientLayoutComponent,
    HeaderClientProfileComponent
  ],
  exports: [
    HeaderClientComponent,
    HeaderClientProfileComponent
  ],
  imports: [
    ClientRoutingModule,
    SharedModule,
    NgbDropdownModule
  ]
})
export class ClientModule { }
