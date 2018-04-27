import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Carrinho } from '../carrinho/carrinho.model';
import {NotificationService} from '../../shared/messages/notification.service';
import { CarrinhoService } from '../carrinho/carrinho.service';

declare var $;

@Component({
  selector: 'nm-finalizar-venda',
  templateUrl: './finalizar-venda.component.html'
})
export class FinalizarVendaComponent implements OnInit {

  servicos: string[];
  vendasForm: FormGroup;

  constructor(private carrinhoService: CarrinhoService,
              private notificationService: NotificationService) { }

  ngOnInit() {}

  items() {
    return this.carrinhoService.items();
  }

  total(): number {
    return this.carrinhoService.total();
  }

  salvar(venda) {
    console.log('venda', venda);
    console.log('itens', this.carrinhoService.itens);
  }

  clear() {
    this.carrinhoService.clear();
  }

  removeItem(item: Carrinho) {
    this.carrinhoService.removeItem(item);
  }

  addQuantidade(item) {
    this.carrinhoService.addQuantidade(item);
  }

  attQuantidade(item, quantidade) {
      this.carrinhoService.attQuantidade(item, quantidade);
  }
  remQuantidade(item) {
    this.carrinhoService.remQuantidade(item);
  }

  attPreco(item, preco) {
    this.carrinhoService.attPreco(item, preco);
  }

}
