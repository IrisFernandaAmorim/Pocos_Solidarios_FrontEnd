import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl, environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  getToken():  {headers :HttpHeaders} {
    const token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
    return token
  }
  

  constructor(
    private http: HttpClient
  ) { }

  entrar(userLogin: UserLogin): Observable<UserLogin>{
    return this.http.post<UserLogin>(`${baseUrl}usuarios/logar`, userLogin)
  }

  cadastrar(user:User):Observable<User>{
      return this.http.post<User>(`${baseUrl}usuarios/cadastrar`,user)
  }
  
  atualizarUser(user: User): Observable<User> {
    return this.http.put<User>(`${baseUrl}usuarios/atualizar`, user, this.getToken())
 
 }
 getByIdUser(id: number): Observable<User>{
  return this.http.get<User>(`${baseUrl}usuarios/${id}`,this.getToken())

}

  logado(){
    let ok = false
    if(environment.token != ''){
    ok = true
  }
  return ok
  }
}