import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { EmpresaService } from '../empresa/empresa.service';
import { ColaboradorService } from '../colaborador/colaborador.service';
import { ClienteService } from '../cliente/cliente.service';
import { ServicoService } from '../servico/servico.service';
import { Carrinho } from './carrinho/carrinho.model';
import {NotificationService} from '../shared/messages/notification.service';
import { CarrinhoService } from './carrinho/carrinho.service';

declare var $;
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'nm-vendas',
  templateUrl: './vendas.component.html'
})
export class VendasComponent implements OnInit, AfterViewInit {

  clientes: string[];
  // empresas: string[];
  vendedores: string[];
  servicos: string[];
  vendasForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private empresaService: EmpresaService,
              private colaboradorService: ColaboradorService,
              private servicoService: ServicoService,
              private clienteService: ClienteService,
              private carrinhoService: CarrinhoService,
              private notificationService: NotificationService) {
                this.clienteService.clientes().subscribe(response => this.clientes = response);
                // this.empresaService.empresas().subscribe(response => this.empresas = response);
                this.colaboradorService.colaboradores().subscribe(response => this.vendedores = response);
                this.servicoService.servicos().subscribe(response => this.servicos = response);
               }
  ngOnInit() {
    this.vendasForm = this.formBuilder.group({
      id_vendedor: this.formBuilder.control(''),
      id_cliente: this.formBuilder.control(''),
      vl_venda: this.formBuilder.control(''),
      id_empresa: this.formBuilder.control(''),
      id_servico: this.formBuilder.control(''),
    });
  }

  ngAfterViewInit() {
    const that = this;
    $('#id_cliente').select2({placeholder: 'Selecione o cliente'});
    $('#id_vendedor').select2({placeholder: 'Selecione o vendedor'});
    // $('#id_empresa').select2({placeholder: 'Selecione a empresa'});
    $('#id_servico').select2({placeholder: 'Selecione os Servicos', allowClear: true});

    $('#id_servico').on('select2:select', function(e) {
      const item = Number($('#id_servico').val());
      that.addItem(item);
      $('#id_servico').val(null).trigger('change');
    });

    $('#modal_cliente').on('hide.bs.modal', function () {
      that.clienteService.clientes().subscribe(response => that.clientes = response);
    });
    $('#modal_colaborador').on('hide.bs.modal', function () {
      that.colaboradorService.colaboradores().subscribe(response => that.vendedores = response);
    });
    $('#modal_servico').on('hide.bs.modal', function () {
      that.servicoService.servicos().subscribe(response => that.servicos = response);
    });
  }

  items() {
    return this.carrinhoService.items();
  }

  total(): number {
    return this.carrinhoService.total();
  }

  addItem(item: number) {
    const i = this.servicos.find((mItem) => mItem['id_servico'] === item);
    const foundItem = this.carrinhoService.itens.find((fItem) => fItem.id_servico === i['id_servico']);
    if (foundItem) {
      this.carrinhoService.addQuantidade(foundItem);
    }else {
      this.carrinhoService.itens.push(new Carrinho(i['id_servico'], i['ds_servico'], i['vl_servico']));
    }
    this.notificationService.notify(`Você adicionou o serviço: ${i['ds_servico']}`, true);
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

}
