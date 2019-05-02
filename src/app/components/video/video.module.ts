import { NgModule } from '@angular/core';

import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';

import { VideoRoutingModule } from './video-routing.module';
import { VideoLayoutComponent} from '../../layouts/video-layout/video-layout.component';
import { VideoPlayerComponent} from './video-player/video-player.component';
import { SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    VideoLayoutComponent,
    VideoPlayerComponent
  ],
  imports: [
    VideoRoutingModule,
    SharedModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ]
})
export class VideoModule { }
