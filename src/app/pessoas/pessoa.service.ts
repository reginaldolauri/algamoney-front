import { Injectable } from '@angular/core';
import { Pessoa } from '../core/model';
import { AuthHttp } from 'angular2-jwt';
import { URLSearchParams } from '@angular/http';

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
    private authHttp: AuthHttp
  ) { }

  pesquisar(filtro: PessoasFilter): Promise<any> {
  const params = new URLSearchParams();

  params.set('page', filtro.pagina.toString());
  params.set('size', filtro.itensPorPagina.toString());

  if (filtro.nome) {
    params.set('nome', filtro.nome);
  }

  return this.authHttp.get(`${this.pessoasUrl}?`, { search: params })
      .toPromise()
      .then(response => {
        const pessoas = response.json().content;
        const resultado = {
          pessoas,
          total: response.json().totalElements
        };
        return resultado;
      });
  }

  listarTodas(): Promise<any> {
    return this.authHttp.get(this.pessoasUrl)
            .toPromise()
            .then((response: any) => {
              return response.json().content;
            });
  }

  excluir(codigo: number): Promise<void>{
    return this.authHttp.delete(`${this.pessoasUrl}/${codigo}`)
                .toPromise()
                .then(() => null);
  }

  ativarInativar(ativo: boolean, codigo: number): Promise<void> {
    return this.authHttp.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo)
      .toPromise()
      .then(() => null);
    }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    return this.authHttp.post(this.pessoasUrl, pessoa)
      .toPromise()
      .then(respose => {
        const pessoaAdicionada = respose.json() as Pessoa;
        return pessoaAdicionada;
    });
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return this.authHttp.put(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa)
              .toPromise()
              .then(response => {
                const pessoaAtualizada = response.json() as Pessoa;
                return pessoaAtualizada;
              });
  }

  bucarPorCodigo(codigo: number): Promise<Pessoa> {
    return this.authHttp.get(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(respose => {
      const pessoa = respose.json() as Pessoa;
      return pessoa;
    });
  }
}
