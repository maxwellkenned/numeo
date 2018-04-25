export class Carrinho {
  constructor(public id_servico: number,
              public ds_servico: string,
              public vl_servico: number,
              public quantidade: number = 1) {}

  public value(): number {
    return this.vl_servico * this.quantidade;
  }
}
