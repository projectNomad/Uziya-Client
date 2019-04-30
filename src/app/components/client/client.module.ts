import {NgModule} from '@angular/core';

import { ClientRoutingModule } from './client-routing.module';
import {ClientLayoutComponent} from '../../layouts/client-layout/client-layout.component';
import { HeaderClientComponent } from '../../layouts/shared/header-client/header-client.component';
import { UserComponent } from './user/user.component';
import { SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    UserComponent,
    HeaderClientComponent,
    ClientLayoutComponent
  ],
  exports: [
    HeaderClientComponent
  ],
  imports: [
    ClientRoutingModule,
    SharedModule
  ]
})
export class ClientModule { }
