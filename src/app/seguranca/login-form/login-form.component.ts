import { Login } from './../../core/model';
import { NgForm } from '@angular/forms';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  login: Login = new Login();
  constructor(
    private auth: AuthService,
    private router: Router,
    private erroHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
  }

  logar(form: NgForm){
    this.auth.login(this.login.usuario, this.login.senha)
      .then(() => {
        this.router.navigate(['/lancamentos']);
      })
      .catch(erro => {
        this.login.senha = '';
        this.erroHandler.handle(erro);
      });
  }
}
