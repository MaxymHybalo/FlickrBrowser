import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component'

import { AuthService } from './auth.service';
import { ProfileService } from './profile/profile.service';
import { AlbumService } from './profile/album/album.service';
import { PhotoService } from './profile/album/photo/photo.service';

import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { AlbumListComponent } from './profile/album-list/album-list.component'
import { AlbumPreviewComponent } from './profile/album-list/album-preview/album-preview.component';
import { AlbumComponent } from './profile/album/album.component';
import { PhotoComponent } from './profile/album/photo/photo.component';
import { NavBarComponent } from './profile/nav-bar/nav-bar.component';
import { PhotoDetailsComponent } from './profile/album/photo/photo-details/photo-details.component'

const routes = [{
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
        },
        {
          path: 'photo/:id',
          component: PhotoDetailsComponent
        }
      ]
    },
    {
      path: 'login',
      component: LoginComponent
    }
  ]

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HeaderComponent,
    LoginComponent,
    AlbumListComponent,
    AlbumPreviewComponent,
    AlbumComponent,
    PhotoComponent,
    NavBarComponent,
    PhotoDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthService,
    ProfileService,
    AlbumService,
    PhotoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
