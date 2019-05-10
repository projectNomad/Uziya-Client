import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxUploaderModule } from 'ngx-uploader';
import { NgSelectModule } from '@ng-select/ng-select';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule} from '../shared/shared.module';
import { AdminLayoutComponent } from '../../layouts/admin-layout/admin-layout.component';
import { HomeComponent } from './home/home.component';
import { HeaderAdminComponent} from '../../layouts/shared/header-admin/header-admin.component';
import { VideosComponent } from './videos/videos.component';
import { RegisterVideoComponent } from './videos/register-video/register-video.component';
import { HeaderPageComponent } from './shared/header-page/header-page.component';
import {DataTablesModule} from 'angular-datatables';
import { DetailsVideoComponent } from './videos/details-video/details-video.component';
import { UpdateVideoComponent } from './videos/update-video/update-video.component';
import {MenuLeftAdminComponent} from '../../layouts/shared/menu-left-admin/menu-left-admin.component';
import {ClientModule} from '../client/client.module';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    HomeComponent,
    HeaderAdminComponent,
    MenuLeftAdminComponent,
    VideosComponent,
    RegisterVideoComponent,
    HeaderPageComponent,
    DetailsVideoComponent,
    UpdateVideoComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    NgxUploaderModule,
    NgSelectModule,
    DataTablesModule,
    ClientModule,
  ]
})
export class AdminModule { }
