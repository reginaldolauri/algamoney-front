import { Title } from '@angular/platform-browser';
import { ToastyService } from 'ng2-toasty';
import { LancamentoService } from './../lancamento.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Lancamento } from 'src/app/core/model';
import { ActivatedRoute, Router } from '@angular/router';

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
  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Novo Lançamento');
    this.carregarLancamento(this.route.snapshot.params['codigo']);
    this.carregarCategorias();
    this.carregarPessoas();
  }

  get editando(){
    return Boolean(this.lancamento.codigo);
  }

  salvar(form: NgForm){
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(form: NgForm){
    this.lancamentoService.adicionar(this.lancamento)
        .then((lancamentoAdicionado) => {
          this.toasty.success('Lançamento adicionado com sucesso!');
          this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
        })
        .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarLancamento(form: NgForm) {
    this.lancamentoService.atualizar(this.lancamento)
        .then(lancamento => {
          this.toasty.success('Lançamento atualizado com sucesso!');
          this.lancamento = lancamento;
          this.atualizarTituloEdicao();
        })
        .catch(erro => this.errorHandler.handle(erro));
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

  carregarLancamento(codigo: number){
    if (codigo) {
      this.lancamentoService.buscarPorCodigo(codigo)
          .then(lancamento => {
            this.lancamento = lancamento;
            this.atualizarTituloEdicao();
          })
          .catch(erro => this.errorHandler.handle(erro));
    }
  }

  novo(form: NgForm){
    form.reset();
    setTimeout(function(){
      this.lancamento = new Lancamento();
    }.bind(this), 1);
    this.router.navigate(['lancamentos/novo']);
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
  }
}
