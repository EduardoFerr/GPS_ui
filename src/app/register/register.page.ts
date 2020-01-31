import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  customDayShortNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  //customPickerOptions: { buttons: { text: string; handler: () => void; }[]; };
  customPickerOptions: any;
  idade: {minimo: String, maximo: String};
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: String;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.idade = this.anoMaximoMinimo();
    //console.log(this.idade);


    this.customPickerOptions = {
      buttons: [{
        text: 'Salvar',
        handler: () => console.log('Clicado em salvar!')
      }, {
        text: 'Log',
        handler: () => {
          console.log('Clique em Log. Não dispensar.');
          return false;
        }
      }]
    }
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/home']);
    }
  }


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nome: ['', Validators.required],
      usuario: ['', Validators.required],
      nascimento: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    // obtém o URL de retorno dos parâmetros da rota ou o padrão é '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // para aqui se o formulário for inválido
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.register(this.f.nome.value, this.f.usuario.value, this.f.nascimento.value, this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log('Tentando redirecionar')
          console.log(data);
          let navigationExtras: NavigationExtras = {state: {
            data: data
          }}
          this.router.navigate(['/'], navigationExtras);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  anoMaximoMinimo(){
    let ano = new Date().getFullYear();
    return {minimo: (ano-18).toString(), maximo:(ano-80).toString()}
  }


}
