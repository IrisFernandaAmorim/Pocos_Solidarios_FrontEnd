import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent implements OnInit {
  user: User = new User()
  idUser: number = environment.id
  confirmarSenha: string
  tipoUsuario: string


constructor(
  private authService: AuthService,
  private route: ActivatedRoute,
  private router: Router
) { }

ngOnInit(): void {
  window.scroll(0,0)

  if(environment.token == ''){
    this.router.navigate(['/entrar'])
  }
 
  this.findByIdUser(this.idUser)
}


confirmSenha(event: any){
  this.confirmarSenha = event.target.value
}

tipoUser(event:any){
  this.tipoUsuario = event.target.value
}

atualizar() {
  this.user.tipo = this.tipoUsuario

  if (this.user.senha != this.confirmarSenha) {
    alert("Senhas incorretas!")
  }
  else
    this.authService.atualizarUser(this.user).subscribe((resp: User) => {
      this.user = resp
      this.router.navigate(["/login"])
      alert("Usuário atualizado com sucesso, faça o login novamente!")
      environment.token = ''
      environment.nome = ''
      environment.foto = ''
      environment.id = 0
      this.router.navigate(['/login'])
    })
}


findByIdUser(id: number){
  this.authService.getByIdUser(id).subscribe((resp:User)=>{
    this.user = resp
    console.log(resp)
  })
}

}

