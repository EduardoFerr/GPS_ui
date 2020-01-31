import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: String;
  data: any;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    // redireciona para casa se já estiver logado
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/home']);
    }
    this.route.queryParams.subscribe(params => {
      let getNav = this.router.getCurrentNavigation();
      if (getNav.extras.state) {
        this.data = getNav.extras.state.data;
      }
    });
    
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [this.data, Validators.required],
      password: ['', Validators.required]
    });
    // obtém o URL de retorno dos parâmetros da rota ou o padrão é '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';  
    console.log('login page')
  }

  // getter de conveniência para fácil acesso aos campos do formulário
  get f() { return this.loginForm.controls; }

  ionViewWillEnter(){
    console.log('willEnter');
    if(this.data){
      this.loginForm.controls.email.setValue(this.data.email);
      this.loginForm.controls.password.setValue(this.data.password);
    }
    //console.log(this.loginForm.controls.email);
  }
  ionViewDidEnter(){
    console.log('didEnter');
  }
  onSubmit() {
    this.submitted = true;

    // para aqui se o formulário for inválido
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log('Tentando redirecionar')
          this.router.navigate([this.returnUrl]);
          console.log(data);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}
