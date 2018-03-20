import { Component, OnInit } from '@angular/core';
declare var $;

import { ClienteService } from '../../componentes/cliente/cliente.service';

@Component({
  selector: 'nm-lista-cliente',
  templateUrl: './lista-cliente.component.html'
})
export class ListaClienteComponent implements OnInit {

  clientes: string[]

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.clientes().subscribe(response => this.clientes = response);
  }

  ngAfterViewInit(){
    var that = this;
    $('#modal').on('hide.bs.modal', function () {
      that.clienteService.clientes().subscribe(response => that.clientes = response);
    })
  }

}
