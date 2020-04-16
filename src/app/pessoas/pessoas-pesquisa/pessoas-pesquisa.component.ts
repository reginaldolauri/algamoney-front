import { Pessoa } from './../../core/model';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastyService } from 'ng2-toasty';

import { LazyLoadEvent } from 'primeng/api/public_api';
import { ConfirmationService } from 'primeng/api';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoasFilter, PessoaService } from './../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit{

  totalRegistros = 0;
  filtro = new PessoasFilter();
  pessoas = [];
  @ViewChild('pessoasGrid') grid;

  constructor(
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService
  ){}

  ngOnInit(): void {}

  pesquisar(pagina = 0){
    this.filtro.pagina = pagina;
    this.pessoaService.pesquisar(this.filtro)
                .then((resultado) => {
                  this.pessoas = resultado.pessoas;
                  this.totalRegistros = resultado.total;
                })
                .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent){
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any){
    this.confirmation.confirm({
      message: `Tem certeza que deseja excluir ${pessoa.nome}?`,
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any){
    this.pessoaService.excluir(pessoa.codigo)
        .then(() => {
          this.pesquisar();
          this.grid.first = 0;
          this.toasty.success(`A pessoa ${pessoa.nome} de codigo ${pessoa.codigo} foi excluída com sucesso.`);
        })
        .catch(erro => this.errorHandler.handle(erro));
  }

  ativarInativar(pessoa: any){
    const novoStatus = !pessoa.ativo;
    this.pessoaService.ativarInativar(novoStatus, pessoa.codigo)
        .then(() => {
          this.pesquisar();
          this.toasty.success(`O status de ${pessoa.nome} foi alterado para ${novoStatus ? 'Ativo' : 'Inativo'}`);
        })
        .catch(erro => this.errorHandler.handle(erro));
  }
}
