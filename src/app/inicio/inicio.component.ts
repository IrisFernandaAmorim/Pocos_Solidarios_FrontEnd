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
  listaPostsFix: Postagem[]

  theme = true

  listaTemas: Tema[]
  idTema: number
  tema: Tema = new Tema()

  user:User = new User()
  idUser = environment.id
  selectUser: User  = new User()

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

    getAllTemas(){
      this.temaService.getAllTema().subscribe((resp: Tema[])=>{
        this.listaTemas = resp
      })
    }

    findByIdTema(){
      this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema)=>{
        this.tema = resp
      })
    }

    getAllPosts(){
      this.postagemService.getAllpostagens().subscribe((resp: Postagem[])=>{
        resp.sort((a:Postagem, b:Postagem)=>{
          if(a.id > b.id){
            return -1
          }
          return 1;
        })
        this.listaPosts = resp
        this.listaPostsFix = resp
        console.log("Todos os Posts",resp)
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
      this.postagem.usuario = this.user
      this.postagem.localizacao = this.user.endereco
    

      this.postagemService.postPostagem(this.postagem).subscribe((resp:Postagem)=>{
        this.postagem = resp
        alert('Post realizado com sucesso!')
        this.postagem = new Postagem()
        this.getAllPosts();
      })

    }

  irTema(){
    this.router.navigate(['/temas'])
  }

  buscarUser(post: Postagem){
      this.selectUser = post.usuario
  }

  getFilterConcluidos(){
    this.listaPosts = this.listaPostsFix.filter((post: Postagem)=> post.status) 
  }
  getFilterAberto(){
    this.listaPosts = this.listaPostsFix.filter((post: Postagem)=> !post.status) 
  }
  getAllFixed(){
    this.listaPosts = this.listaPostsFix 
  }
  toggle(){
    this.theme = !this.theme;
  }
  
}