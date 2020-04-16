import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { PessoaService } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Pessoa } from 'src/app/core/model';

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
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
  }

  adicionar(form: NgForm){
    this.pessoa.ativo = true;
    this.pessoaService.adicionar(this.pessoa)
        .then(() => {
          this.toasty.success('Pessoa incluída com sucesso.');
          form.reset();
          this.pessoa = new Pessoa();
        })
        .catch(erro => this.errorHandler.handle(erro));
  }

}
