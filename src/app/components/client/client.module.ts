import {NgModule} from '@angular/core';

import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

import { ClientRoutingModule } from './client-routing.module';
import {ClientLayoutComponent} from '../../layouts/client-layout/client-layout.component';
import { SharedModule} from '../shared/shared.module';
import { HomeClientComponent } from './home-client/home-client.component';
import {UserComponent} from './user/user.component';
import {HeaderClientComponent} from '../../layouts/shared/header-client/header-client.component';
import {ProfileComponent} from './user/profile/profile.component';
import { VideosClientComponent } from './videos-client/videos-client.component';


@NgModule({
  declarations: [
    ClientLayoutComponent,
    HomeClientComponent,
    UserComponent,
    HeaderClientComponent,
    ProfileComponent,
    VideosClientComponent,
  ],
  imports: [
    ClientRoutingModule,
    SharedModule,
    NgbDropdownModule,
  ]
})
export class ClientModule { }
