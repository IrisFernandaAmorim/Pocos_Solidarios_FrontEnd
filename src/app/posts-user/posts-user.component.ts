import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { User } from '../model/User';
import { PostagemService } from '../service/postagem.service';

@Component({
  selector: 'app-posts-user',
  templateUrl: './posts-user.component.html',
  styleUrls: ['./posts-user.component.css']
})
export class PostsUserComponent implements OnInit {

  listaPostagensUser: Postagem[]
  status = "Concluido"

  publiSelecionada: Postagem = new Postagem()
  user:User = new User()
  idUser = environment.id

  constructor(
    private router: Router,
    private postagemService: PostagemService
  ) { }

  ngOnInit(): void {
    if(environment.token == ''){
      this.router.navigate(['/login'])
    }

    this.getPostagensUser()
  }

    getPostagensUser(){
      this.postagemService.getPostagensUsuario(this.idUser).subscribe((resp: Postagem[])=>{
        resp.sort((a:Postagem, b:Postagem)=>{
              if(a.id > b.id){
                return -1
              }
              return 1;
            })
        
        this.listaPostagensUser = resp
        console.log("AQUIIIIIIIIIII----->",resp)
      })
    }

    selectPubli(publ : Postagem){
      this.publiSelecionada = publ;
    }

    concluido(item: string){
      this.publiSelecionada.status = this.status
      this.postagemService.putPostagem(this.publiSelecionada).subscribe((resp:Postagem)=>{
        this.getPostagensUser() 
        alert(` A postagem: ${item} foi concluida!`)
      })          
    }

    atualizarPost(){
      this.postagemService.putPostagem(this.publiSelecionada).subscribe((resp:Postagem)=>{
        alert('Publicação atualizada!')
        this.getPostagensUser()
      })
    }

    deletePost(id:number){
      this.postagemService.deletePostagem(id).subscribe(()=>{
          alert('postagem apagada com sucesso!')
          this.getPostagensUser()
        })
      }

  }