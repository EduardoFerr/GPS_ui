import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../models/user';
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  loading = false;
  user: User;
  usuario: any;
  usuarioLogado: any;

  constructor(private userService: UserService) {
    this.usuario = localStorage.getItem('currentUser.data.user');
  }

  ngOnInit() {
    this.loading = true;
    /*
    this.userService.getAll().pipe(first()).subscribe(users =>{
      this.loading = false;
      this.users = users;
    })

    this.userService.getAll().pipe(first()).subscribe(user => {
      console.log('gps');
      console.log(user);
      this.loading = false;
      this.usuario = user;
    })
    */

    this.usuarioLogado = this.userService.getUsuario();

    console.log(this.usuarioLogado.data.usuario);
  }


}
