import { Injectable } from '@angular/core';
import { ToastyService } from 'ng2-toasty';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toasty: ToastyService) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if (typeof Response
                      && errorResponse.status >= 400
                      && errorResponse.status <= 499 ) {
      let errors;
      msg = 'Ocorreu um erro ao processar a sua solicitação';

      try {
        errors = errorResponse.error;
        msg = errors[0].mensagemUsuario;
      } catch (error) {}
      console.error('Ocorreu um erro', errorResponse);
    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente';
      console.log('Ocorreu um erro', errorResponse);
    }
    this.toasty.error(msg);
  }
}
