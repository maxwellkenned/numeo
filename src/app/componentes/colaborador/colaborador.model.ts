import { Pessoa } from '../pessoa/pessoa.model';

export class Colaborador{
  constructor(public pessoa: Pessoa,
              public id_colaborador: number,
              public id_empresa: number,
              public id_funcao: number,
              public id_conjuge: string,
              public dt_admissao: string,
              public salario: number,
              public clt: string,
              public clt_serie: string,
              public clt_pis: string,
              public escolaridade: string,
              public frequencia_pagamento: string
              ){}

}
