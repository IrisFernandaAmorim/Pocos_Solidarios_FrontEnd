import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, baseUrl } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  getToken():  {headers :HttpHeaders} {

    console.log(environment);
    const token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
    return token
  }

  

  constructor( private http: HttpClient) {
   }

    getAllTema(): Observable<Tema[]>{
      return this.http.get<Tema[]>(`${baseUrl}tema`,this.getToken())
    }

    getByIdTema(id:number): Observable<Tema>{
      return this.http.get<Tema>(`${baseUrl}tema/${id}`,this.getToken())
    }

    postTema(tema:Tema): Observable<Tema>{
        return this.http.post<Tema>(`${baseUrl}tema`,tema,this.getToken())
    }

    putTema(tema:Tema):Observable<Tema>{
       return this.http.put<Tema>(`${baseUrl}tema`,tema, this.getToken())
    }


    deleteTema(id: number){
      return this.http.delete(`${baseUrl}tema/${id}`,this.getToken())
    }
}