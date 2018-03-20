import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
declare var $;
import { EmpresaService } from '../empresa/empresa.service';
import { ColaboradorService } from '../colaborador/colaborador.service';
import { ClienteService } from '../cliente/cliente.service';
import { ServicoService } from '../servico/servico.service';
import { Carrinho } from './carrinho/carrinho.model';

@Component({
  selector: 'nm-vendas',
  templateUrl: './vendas.component.html'
})
export class VendasComponent implements OnInit, AfterViewInit {

  clientes: string[];
  empresas: string[];
  vendedores: string[];
  servicos: string[];
  itens: Carrinho[] = [];
  vendasForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private empresaService: EmpresaService,
              private colaboradorService: ColaboradorService,
              private servicoService: ServicoService,
              private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.clientes().subscribe(response => this.clientes = response);
    this.empresaService.empresas().subscribe(response => this.empresas = response);
    this.colaboradorService.colaboradores().subscribe(response => this.vendedores = response);
    this.servicoService.servicos().subscribe(response => this.servicos = response);
    this.vendasForm = this.formBuilder.group({
      id_vendedor: this.formBuilder.control(''),
      id_cliente: this.formBuilder.control(''),
      vl_venda: this.formBuilder.control(''),
      id_empresa: this.formBuilder.control(''),
      id_servico: this.formBuilder.control(''),
    });
  }

  ngAfterViewInit(){
    let that = this;
    $('#id_cliente').select2({placeholder: 'Selecione o cliente'});
    $('#id_vendedor').select2({placeholder: 'Selecione o vendedor'});
    $('#id_empresa').select2({placeholder: 'Selecione a empresa'});
    $('#id_servico').select2({placeholder: 'Selecione os Servicos', allowClear: true});

    $('#id_servico').on("select2:select", function(e){
      let item = $('#id_servico').val();
      that.addItem(item);
      $('#id_servico').val(null).trigger('change');
    })
  }

  items(){
    return this.itens;
  }

  total(): number{
    return this.itens
      .map(item => item.value())
      .reduce((prev, value)=> prev+value, 0)
  }

  addItem(item: Carrinho[]){
    let i = this.servicos.find((mItem)=> mItem["id_servico"] == item);
    let foundItem = this.itens.find((fItem)=> fItem.id_servico == i['id_servico'])
    if(foundItem){
      this.addQuantidade(foundItem);
    }else{
      this.itens.push(new Carrinho(i['id_servico'], i['ds_servico'], i['vl_servico']))
    }
  }

  addQuantidade(item: Carrinho){
    console.log(item);
    item.quantidade = item.quantidade + 1;
  }

}
