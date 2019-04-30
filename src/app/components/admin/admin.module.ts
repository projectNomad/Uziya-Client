import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxUploaderModule } from 'ngx-uploader';
import { NgSelectModule } from '@ng-select/ng-select';
import {NgbDropdownModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule} from '../shared/shared.module';
import { AdminLayoutComponent } from '../../layouts/admin-layout/admin-layout.component';
import { HomeComponent } from './home/home.component';
import { HeaderAdminComponent} from './shared/header-admin/header-admin.component';
import { MenuLeftComponent } from './shared/menu-left/menu-left.component';
import { MoviesComponent } from './movies/movies.component';
import { RegisterVideoComponent } from './movies/register-video/register-video.component';
import { HeaderPageComponent } from './shared/header-page/header-page.component';
import {DataTablesModule} from 'angular-datatables';
import { DetailsVideoComponent } from './movies/details-video/details-video.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    HomeComponent,
    HeaderAdminComponent,
    MenuLeftComponent,
    MoviesComponent,
    RegisterVideoComponent,
    HeaderPageComponent,
    DetailsVideoComponent
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
