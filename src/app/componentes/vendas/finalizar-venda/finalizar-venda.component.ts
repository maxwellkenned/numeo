import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Carrinho } from '../carrinho/carrinho.model';
import {NotificationService} from '../../shared/messages/notification.service';
@Component({
  selector: 'nm-finalizar-venda',
  templateUrl: './finalizar-venda.component.html'
})
export class FinalizarVendaComponent implements OnInit {

  servicos: string[];
  itens: Carrinho[] = [];
  vendasForm: FormGroup;

  finalizarForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.finalizarForm = this.formBuilder.group({
      id_pagamento: this.formBuilder.control(''),
      vl_pago: this.formBuilder.control('')
    });
  }

  items() {
    return this.itens;
  }

  total(): number {
    return this.itens
      .map(item => item.value())
      .reduce((prev, value) => prev + value, 0);
  }

  addItem(item: number) {
    const i = this.servicos.find((mItem) => mItem['id_servico'] === item);
    const foundItem = this.itens.find((fItem) => fItem.id_servico === i['id_servico']);
    if (foundItem) {
      this.addQuantidade(foundItem);
    }else {
      this.itens.push(new Carrinho(i['id_servico'], i['ds_servico'], i['vl_servico']));
    }
    this.notificationService.notify(`Você adicionou o serviço: ${i['ds_servico']}`, true);
  }

  addQuantidade(item: Carrinho) {
    console.log(item);
    item.quantidade = item.quantidade + 1;
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
