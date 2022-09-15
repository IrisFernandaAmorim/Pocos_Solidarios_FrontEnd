import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { Tema } from './model/Tema';
import { HomeComponent } from './home/home.component';
import { DevsComponent } from './devs/devs.component';
import { TemaComponent } from './tema/tema.component';
import { SobreComponent } from './sobre/sobre.component';
import { TemaEditComponent } from './edit/tema-edit/tema-edit.component';
import { TemaDeleteComponent } from './delete/tema-delete/tema-delete.component';

const routes: Routes = [

  {path: '', redirectTo: 'home', pathMatch: 'full'},
  
  {path: 'home', component: HomeComponent},

  {path: 'login', component: LoginComponent},
  {path: 'cadastrar', component: CadastroComponent },

  {path: 'inicio', component: InicioComponent},
  {path: 'devs', component:DevsComponent},
  {path: 'temas', component: TemaComponent},
  {path: 'tema-edit/:id', component: TemaEditComponent},
  {path: 'tema-delete/:id', component: TemaDeleteComponent},
  {path: 'sobre', component: SobreComponent}

];

@NgModule ({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
