import { Lancamento } from './../core/model';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { AuthHttp } from 'angular2-jwt';
import { URLSearchParams } from '@angular/http';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(
    private authHttp: AuthHttp
  ) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params.set('dataVencimentoDe',
                  moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      params.set('dataVencimentoAte',
                  moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }
    return this.authHttp.get(`${this.lancamentosUrl}?resumo`, { search:  params } )
      .toPromise()
      .then(response => {
        const lancamentos = response.json().content;
        const resultado = {
          lancamentos,
          total: response.json().totalElements
        };
        return resultado;
      });
  }

  excluir(codigo: number): Promise<void>{
    return this.authHttp.delete(`${this.lancamentosUrl}/${codigo}`)
    .toPromise()
    .then(() => null);
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    return this.authHttp.post(this.lancamentosUrl,
        JSON.stringify(lancamento))
        .toPromise()
        .then(response => response.json());
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    return this.authHttp.put(`${this.lancamentosUrl}/${lancamento.codigo}`,
      JSON.stringify(lancamento))
        .toPromise()
        .then(response => {
          const lancamentoAlterado = response.json() as Lancamento;
          this.converterStringParaDatas([lancamentoAlterado]);
          return lancamentoAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    return this.authHttp.get(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const lancamento = response.json() as Lancamento;
        this.converterStringParaDatas([lancamento]);
        return lancamento;
    });
  }

  private converterStringParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      if (lancamento
          && lancamento.dataPagamento) {
            lancamento.dataPagamento = moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate();
      }
      if (lancamento
          && lancamento.dataVencimento) {
            lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();
      }
    }
  }

}
