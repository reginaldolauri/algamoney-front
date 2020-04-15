import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ];

  categorias = [];

  pessoas = [];

  constructor(
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private pessoaService: PessoaService
  ) { }

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  carregarCategorias(){
    return this.categoriaService.listaTodas()
              .then(categorias => {
                this.categorias = categorias.map(c => {
                  return { label: c.nome, value: c.codigo };
                });
              })
              .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas(){
    return this.pessoaService.listarTodas()
                .then(pessoas => {
                  this.pessoas = pessoas.map(p => {
                    return { label: p.nome, value: p.codigo};
                  });
                })
                .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: NgForm){
    console.log('salvando lançamento...');
  }
}
