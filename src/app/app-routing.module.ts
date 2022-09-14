import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { Tema } from './model/Tema';
import { HomeComponent } from './home/home.component';
import { DevsComponent } from './devs/devs.component';
import { TemaComponent } from './tema/tema.component';

const routes: Routes = [

  {path: '', redirectTo: 'home', pathMatch: 'full'},
  
  {path: 'home', component: HomeComponent},

  {path: 'login', component: LoginComponent},
  {path: 'cadastrar', component: CadastroComponent },

  {path: 'inicio', component: InicioComponent},
  {path: 'tema', component: Tema},
  {path: 'devs', component:DevsComponent},
  {path: 'temas', component: TemaComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
