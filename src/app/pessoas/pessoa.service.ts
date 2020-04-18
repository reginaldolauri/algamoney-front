import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from '../core/model';

export class PessoasFilter {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(
    private http: HttpClient
  ) { }

  pesquisar(filtro: PessoasFilter): Promise<any> {
  let params = new HttpParams();
  const headers = new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
   });

  params = params.append('page', filtro.pagina.toString());
  params = params.append('size', filtro.itensPorPagina.toString());

  if (filtro.nome) {
    params = params.append('nome', filtro.nome);
  }

  return this.http.get(`${this.pessoasUrl}?`, { headers, params })
      .toPromise()
      .then((response: any) => {
        const resultado = {
          pessoas: response.content,
          total: response.totalElements
        };
        return resultado;
      });
  }

  listarTodas(): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
     });
    return this.http.get(this.pessoasUrl, { headers })
            .toPromise()
            .then((response: any) => {
              return response.content;
            });
  }

  excluir(codigo: number): Promise<void>{
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
     });
    return this.http.delete(`${this.pessoasUrl}/${codigo}`, { headers })
                .toPromise()
                .then(() => null);
  }

  ativarInativar(ativo: boolean, codigo: number): Promise<void> {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
      });
    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
    }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
      });
    return this.http.post(this.pessoasUrl, pessoa, { headers })
              .toPromise()
              .then((respose: Pessoa) => respose);
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
      const headers = new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
        });
      return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa, { headers })
               .toPromise()
               .then((respose: Pessoa) => respose);
  }

  bucarPorCodigo(codigo: number): Promise<Pessoa> {
      const headers = new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
        });
      return this.http.get(`${this.pessoasUrl}/${codigo}`, { headers })
               .toPromise()
               .then((respose: Pessoa) => respose);
  }
}
