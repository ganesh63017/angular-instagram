import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AvatarModule } from 'ngx-avatar';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AvatarModule,
    IvyCarouselModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    PickerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
