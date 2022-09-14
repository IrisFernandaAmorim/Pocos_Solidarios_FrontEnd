import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {


  postagem: Postagem = new Postagem()
  listaPosts: Postagem[]

  listaTemas: Tema[]
  idTema: number
  tema: Tema = new Tema()

  user:User = new User()
  idUser = environment.id

  userLocal = environment.endereco

  constructor(
    
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private temaService: TemaService,
    private postagemService: PostagemService

  ) { }

  ngOnInit() {

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }
    this.getAllTemas()
    this.getAllPosts()
    this.findByIdUser()
  }

  fillTemaList() {
    if (this.listaTemas && this.listaPosts) {
      for (const tema of this.listaTemas) {
          tema.postagem = [];
          for (const post of this.listaPosts) {
            if (tema.id === post.tema.id) {
              tema.postagem.push(post);
            }
          }

      }
    }
  }

    getAllTemas(){
      this.temaService.getAllTema().subscribe((resp: Tema[])=>{
        this.listaTemas = resp
        console.log(this.listaTemas)
      })
    }

    findByIdTema(){
      this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema)=>{
        this.tema = resp
      })
    }

    getAllPosts(){
      this.postagemService.getAllpostagens().subscribe((resp: Postagem[])=>{
        this.listaPosts = resp
      })
    }

    findByIdUser(){
      this.authService.getByIdUser(this.idUser).subscribe((resp: User)=>{
        this.user = resp
      })

    }

    publicar(){
      this.tema.id = this.idTema
      this.postagem.tema = this.tema
      
      this.user.id = this.idUser
      this.postagem.user = this.user
      this.postagem.localizacao = this.user.endereco

      this.postagemService.postPostagem(this.postagem).subscribe((resp:Postagem)=>{
        this.postagem = resp
        alert('Post realizado com sucesso!')
        this.postagem = new Postagem()
        this.getAllPosts();
      })

    }

  irTema(){
    this.router.navigate(['/tema'])
  }




}