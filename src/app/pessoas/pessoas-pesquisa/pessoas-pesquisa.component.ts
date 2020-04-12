import { LazyLoadEvent } from 'primeng/api/public_api';
import { PessoasFilter, PessoaService } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit{

  totalRegistros = 0;
  filtro = new PessoasFilter();
  pessoas = [];

  constructor(
    private pessoaService: PessoaService
  ){}

  ngOnInit(): void {}

  pesquisar(pagina = 0){
    this.filtro.pagina = pagina;
    this.pessoaService.pesquisar(this.filtro)
                .then((resultado) => {
                  this.pessoas = resultado.pessoas;
                  this.totalRegistros = resultado.total;
                });
  }

  aoMudarPagina(event: LazyLoadEvent){
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }
}
