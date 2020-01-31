import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usuario: any;

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<User[]>(`${environment.apiUrl}/usuarios`);
  }
  

  getUsuario(){
    this.usuario = JSON.parse(localStorage.getItem('currentUser'));
    return this.usuario;
  }
}
