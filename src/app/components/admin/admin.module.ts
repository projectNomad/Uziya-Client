import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule} from '../shared/shared.module';
import { AdminLayoutComponent } from '../../layouts/admin-layout/admin-layout.component';
import { HomeComponent } from './home/home.component';
import { HeaderAdminComponent} from '../shared/header-admin/header-admin.component';
import { MenuLeftComponent } from './menu-left/menu-left.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    HomeComponent,
    HeaderAdminComponent,
    MenuLeftComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ]
})
export class AdminModule { }
