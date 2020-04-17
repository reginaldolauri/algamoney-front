import { Lancamento } from './../core/model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as moment from 'moment';

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

  lancamentosUrl='http://localhost:8080/lancamentos';

  constructor(
    private http: HttpClient
  ) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    let params = new HttpParams();
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    });

    params = params.append('page', filtro.pagina.toString());
    params = params.append('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params = params.append('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.append('dataVencimentoDe',
                            moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      params = params.append('dataVencimentoAte',
                            moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }
    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers,  params } )
      .toPromise()
      .then((response: any) => {
        const lancamentos = response.content;

        const resultado = {
          lancamentos,
          total: response.totalElements
        };
        return resultado;
      });
  }

  excluir(codigo: number): Promise<void>{
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    });
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, { headers })
    .toPromise()
    .then(() => null);
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    });
    return this.http.post(this.lancamentosUrl, JSON.stringify(lancamento), { headers })
               .toPromise()
               .then((response: Lancamento) => response);
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    });
    return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}`, JSON.stringify(lancamento), { headers })
               .toPromise()
               .then((lancamentoAlterado: Lancamento) => {
                this.converterStringParaDatas([lancamentoAlterado]);
                return lancamentoAlterado;
               });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    });
    return this.http.get(`${this.lancamentosUrl}/${codigo}`, { headers })
               .toPromise()
               .then((lancamento: Lancamento) => {
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
