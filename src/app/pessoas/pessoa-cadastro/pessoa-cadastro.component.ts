import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { PessoaService } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Pessoa } from 'src/app/core/model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa: Pessoa = new Pessoa();
  constructor(
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Novo cadastro de pessoa');
    this.carregarPessoa(this.route.snapshot.params['codigo']);
  }

  get editando(){
    return Boolean(this.pessoa.codigo);
  }

  salvar(form: NgForm){
    if (this.editando) {
      this.atualizar(form);
    } else {
      this.adicionar(form);
    }

  }

  adicionar(form: NgForm){
    this.pessoa.ativo = true;
    this.pessoaService.adicionar(this.pessoa)
        .then((pessoaAdicionada) => {
          this.toasty.success('Pessoa incluída com sucesso.');
          this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
        })
        .catch(erro => this.errorHandler.handle(erro));
  }

  atualizar(form: NgForm){
    this.pessoaService.atualizar(this.pessoa)
        .then((pessoaAdicionada) => {
          this.toasty.success('Pessoa atualizada com sucesso.');
          this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
          this.atualizarTituloEdicao();
        })
        .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoa(codigo: number){
    if (codigo) {
      this.atualizarTituloEdicao();
      this.pessoaService.bucarPorCodigo(codigo)
          .then((pessoa) => {
            this.pessoa = pessoa;
            this.atualizarTituloEdicao();
          })
          .catch(erro => this.errorHandler.handle(erro));
    }
  }

  novo(form: NgForm){
    form.reset()
    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);
    this.router.navigate(['pessoas/novo'])
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de pessoa ${this.pessoa.nome}`);
  }
}
