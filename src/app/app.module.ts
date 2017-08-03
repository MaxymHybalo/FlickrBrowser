import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component'

import { AuthService } from './auth.service';
import { ProfileService } from './profile/profile.service'


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([{
      path: 'profile',
      component: ProfileComponent
    }])
  ],
  providers: [
    AuthService,
    ProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
