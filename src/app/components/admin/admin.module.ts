import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxUploaderModule } from 'ngx-uploader';
import { NgSelectModule } from '@ng-select/ng-select';
import {NgbDropdownModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule} from '../shared/shared.module';
import { AdminLayoutComponent } from '../../layouts/admin-layout/admin-layout.component';
import { HomeComponent } from './home/home.component';
import { HeaderAdminComponent} from '../../layouts/shared/header-admin/header-admin.component';
import { MoviesComponent } from './videos/movies.component';
import { RegisterVideoComponent } from './videos/register-video/register-video.component';
import { HeaderPageComponent } from './shared/header-page/header-page.component';
import {DataTablesModule} from 'angular-datatables';
import { DetailsVideoComponent } from './videos/details-video/details-video.component';
import { UpdateVideoComponent } from './videos/update-video/update-video.component';
import {MenuLeftAdminComponent} from '../../layouts/shared/menu-left-admin/menu-left-admin.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    HomeComponent,
    HeaderAdminComponent,
    MenuLeftAdminComponent,
    MoviesComponent,
    RegisterVideoComponent,
    HeaderPageComponent,
    DetailsVideoComponent,
    UpdateVideoComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    NgbDropdownModule,
    NgxUploaderModule,
    NgSelectModule,
    DataTablesModule,
    NgbTooltipModule
  ]
})
export class AdminModule { }
