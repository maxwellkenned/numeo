import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { API } from '../../../app.api';

import { Carrinho } from './carrinho.model';

@Injectable()
export class CarrinhoService {

  itens: Carrinho[] = [];

  constructor(private http: Http) {  }

  items() {
    return this.itens;
  }


  total(): number {
    return this.itens
      .map(item => item.value())
      .reduce((prev, value) => prev + value, 0);
  }


  addQuantidade(item: Carrinho) {
    item.quantidade = Number(item.quantidade) + 1;
  }

  attQuantidade(item, quantidade) {
    if (Number(quantidade.value) > 0) {
      item.quantidade = Number(quantidade.value);
    } else {
      quantidade.value = item.quantidade;
    }
  }

  remQuantidade(item: Carrinho) {
    const zero = Number(item.quantidade) - 1;
    if (!(zero === 0)) {
      item.quantidade = item.quantidade - 1;
    }
  }

  attPreco(item, preco) {
    if ( Number(preco.value) > 0) {
      item.vl_servico = preco.value;
      const numberFormat = new Intl.NumberFormat('pt-BR', {minimumFractionDigits: 2}).format(item.vl_servico);
      preco.value = `R$ ${numberFormat}`;
    } else {
      const numberFormat = new Intl.NumberFormat('pt-BR', {minimumFractionDigits: 2}).format(item.vl_servico);
      preco.value = `R$ ${numberFormat}`;
    }
  }

  salvar(venda) {
    console.log('venda', venda);
    console.log('itens', this.itens);
  }

  clear() {
    this.itens = [];
  }

  removeItem(item: Carrinho) {
    this.itens.splice(this.itens.indexOf(item), 1);
  }


}
