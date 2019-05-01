import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent} from '../../layouts/shared/footer/footer.component';
import {HeaderClientProfileComponent} from '../../layouts/shared/header-client-profile/header-client-profile.component';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgbDropdownModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgbDropdownModule,
    FooterComponent,
    HeaderClientProfileComponent
  ],
  declarations: [
    HeaderClientProfileComponent,
    FooterComponent
  ]
})
export class SharedModule {}
