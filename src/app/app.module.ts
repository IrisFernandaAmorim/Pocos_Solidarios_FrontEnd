import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HashLocationStrategy,LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';

import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { HttpClientModule } from '@angular/common/http'
import { InicioComponent } from './inicio/inicio.component';
import { DevsComponent } from './devs/devs.component';
import { MenuHomeComponent } from './menu/menu-home/menu-home.component';
import { TemaComponent } from './tema/tema.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioComponent } from './usuario/usuario.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    LoginComponent,
    CadastroComponent,
    InicioComponent,
    HomeComponent,
    DevsComponent,
    MenuHomeComponent,
    TemaComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    

  ],
  providers: [{
    provide: LocationStrategy,
    useClass:HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
