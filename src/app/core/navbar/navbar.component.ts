import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { LogoutService } from './../../seguranca/logout.service';
import { AuthService } from '../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu = false;
  usuarioLogado = '';

  constructor(
    private authService: AuthService,
    private logoutService: LogoutService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private toasty: ToastyService
  ){}

  ngOnInit(): void {
    this.usuarioLogado = this.authService.jwtPayload?.nome;
  }

  get authenticationService(){
    return this.authService;
  }

  logout(){
    this.logoutService.logout()
    .then(() => {
      this.router.navigate(['/login']);
      this.toasty.success('Usuário realizou o logout da aplicação com sucesso.');
    })
    .catch(erro => {
      this.errorHandler.handle(erro);
    });
  }
}
