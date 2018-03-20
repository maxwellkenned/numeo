import { Component, OnInit } from '@angular/core';
declare var $;
import { ServicoService } from '../../componentes/servico/servico.service';

@Component({
  selector: 'nm-lista-servico',
  templateUrl: './lista-servico.component.html'
})
export class ListaServicoComponent implements OnInit {

  servicos = [];

  constructor(private servicoService: ServicoService) { }

  ngOnInit() {
    this.servicoService.servicos().subscribe(response => this.servicos = response);
  }

  ngAfterViewInit(){
    var that = this;
    $('#modal').on('hide.bs.modal', function () {
      that.servicoService.servicos().subscribe(response => that.servicos = response);
    })
  }

}
