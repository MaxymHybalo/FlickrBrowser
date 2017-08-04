import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component'

import { AuthService } from './auth.service';
import { ProfileService } from './profile/profile.service';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { AlbumListComponent } from './profile/album-list/album-list.component'
import { AlbumService } from './profile/album.service';
import { AlbumPreviewComponent } from './profile/album-list/album-preview/album-preview.component';
import { AlbumComponent } from './profile/album/album.component'

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HeaderComponent,
    LoginComponent,
    AlbumListComponent,
    AlbumPreviewComponent,
    AlbumComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule,
    RouterModule.forRoot([{
      path: 'profile',
      component: ProfileComponent,
      children: [
        {
          path: '',
          component: AlbumListComponent
        },
        {
          path: 'album/:id',
          component: AlbumComponent
        }
      ]
    },
    {
      path: 'login',
      component: LoginComponent
    }
  ])
  ],
  providers: [
    AuthService,
    ProfileService,
    AlbumService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
