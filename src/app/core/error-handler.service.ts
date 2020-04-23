import { Injectable } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { Router } from '@angular/router';

import { NotAuthenticatedError } from '../seguranca/money-http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  sessaoExpirada = false;

  constructor(
    private toasty: ToastyService,
    private router: Router) { }

  handle(errorResponse: any) {
    let msg: string;

    if (!this.sessaoExpirada
        || errorResponse instanceof NotAuthenticatedError) {
      if (typeof errorResponse === 'string') {
        msg = errorResponse;
      }  else if (errorResponse instanceof NotAuthenticatedError){
        msg = 'Sua sesão expirou.';
        this.sessaoExpirada = true;
        this.router.navigate(['/login']);
      } else if (typeof Response
                        && errorResponse.status >= 400
                        && errorResponse.status <= 499 ) {
        let errors;
        msg = 'Ocorreu um erro ao processar a sua solicitação';
        if (errorResponse.status === 403) {
          msg = 'Você não tem permissão para executar essa ação.';
        }
        try {
          errors = errorResponse.error;
          msg = errors[0].mensagemUsuario;
        } catch (error) {}
        console.error('Ocorreu um erro', errorResponse);
      } else {
        msg = 'Erro ao processar serviço remoto. Tente novamente';
        console.log('Ocorreu um erro', errorResponse);
      }
    }
    this.toasty.error(msg);
  }
}
