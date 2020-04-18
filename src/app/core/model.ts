export class Pessoa {
  codigo: number;
  nome: string;
  ativo: boolean;
  endereco = new Endereco();
}

export class Categoria {
  codigo: number;
  nome: string;
}

export class Endereco {
  logradouro: string;
  numero: number;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}

export class Lancamento {
  codigo: number;
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  tipo = 'RECEITA';
  categoria = new Categoria();
  pessoa = new Pessoa();
}

export class Login {
  usuario: string;
   senha: string;
}
