import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoginAndRegisterComponent } from './login-and-register/login-and-register.component';
import { HeaderComponent } from './header/header.component';
import {FriendlistComponent} from './friendlist/friendlist.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { ShortcutComponent } from './shortcut/shortcut.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    LoginAndRegisterComponent,
    HeaderComponent,
    FriendlistComponent,
    SearchUserComponent,
    ShortcutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
