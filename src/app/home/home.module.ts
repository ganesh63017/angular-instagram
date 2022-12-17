import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { FeedsComponent } from './feeds/feeds.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AvatarModule } from 'ngx-avatar';
import { SliderComponent } from './slider/slider.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { IconsComponent } from './icons/icons.component';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TimeComponent } from './time/time.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingComponent } from './loading/loading.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommentModelComponent } from './comment-model/comment-model.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { UploadModelComponent } from './upload-model/upload-model.component';
@NgModule({
  declarations: [
    FeedsComponent,
    NavbarComponent,
    SliderComponent,
    IconsComponent,
    TimeComponent,
    LoadingComponent,
    CommentModelComponent,
    UploadModelComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AvatarModule,
    IvyCarouselModule,
    MatIconModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    MatDialogModule,
    PickerModule,
  ],
})
export class HomeModule {}
