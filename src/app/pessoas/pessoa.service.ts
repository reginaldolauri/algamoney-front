import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
