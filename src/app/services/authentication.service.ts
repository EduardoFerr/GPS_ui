import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUserSubject: BehaviorSubject<User>
  currentUser: Observable<User>;

  constructor(private http: HttpClient, private storage: Storage) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User{
    return this.currentUserSubject.value;
  }

  login(email: string, password: string){
    console.log(`login(${email} - ${password})`)
    return this.http.post<any>(`${environment.apiUrl}/usuarios/autenticar`, {email, password})
    .pipe(map(user => {
      // armazena detalhes do usuário e token jwt no armazenamento local para manter o usuário conectado entre as atualizações da página
      console.log(user);  
    
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('tempo', JSON.stringify(Date.now()));
      this.currentUserSubject.next(user);
      //return user;
      let usuarioAtual = new User(user.data);
      this.storage.set('currentUser', usuarioAtual)
      return usuarioAtual;
    }));
  }

  logout() {
    //throw new Error("Method not implemented.");
    // remove o usuário do armazenamento local para desconectar o usuário
    localStorage.removeItem('currentUser');
    localStorage.removeItem('tempo');
    this.currentUserSubject.next(null);
  }

  timeoutToken(){
    console.log('check timeoutToken')
    let tempo = null;
    if(localStorage.getItem('tempo')){
      tempo = localStorage.getItem('tempo');
    }
    if(this.storage.get('currentUser')){
      console.log('expiresIn')

      tempo = this.storage.get('currentUser.expiresIn');
    }
    tempo = Number(tempo);
    tempo = Date.now() - tempo;
    if(tempo> 3600000){
      console.log('Check timeoutToken - Deslogando')
       return this.logout();
    }
  }
  register(nome: string, usuario: string, nascimento: string, email: string, password: string){
    return this.http.post<any>(`${environment.apiUrl}/usuarios/registrar`, {nome, usuario, nascimento, email, password})
    .pipe(map(user =>{
      console.log(user);
      return {user: user.message, email: email, nascimento: nascimento, password: password};
    }))
  }
}
