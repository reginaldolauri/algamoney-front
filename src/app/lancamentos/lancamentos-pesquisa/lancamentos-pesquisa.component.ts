import { AuthService } from './../../seguranca/auth.service';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api/public_api';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  @ViewChild('tabela') grid;

  constructor(
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private confimation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private tile: Title,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.tile.setTitle('Pesquisa de lançamentos');
  }

  get auth(){
    return this.authService;
  }
  pesquisar(pagina = 0){
    this.filtro.pagina = pagina;
    this.lancamentoService.pesquisar(this.filtro)
      .then((resultado) => {
        this.lancamentos = resultado.lancamentos;
        this.totalRegistros = resultado.total;
      })
      .catch(erro => this.errorHandler.handle(erro));

  }

  aoMudarPagina(event: LazyLoadEvent){
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any){
    this.confimation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any){
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        this.pesquisar();
        this.grid.first = 0;
        this.toasty.success('Lançamento excluído com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
