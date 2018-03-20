import { Component, OnInit } from '@angular/core';
declare var $;
import { ListaColaborador } from './lista-colaborador.model';
import { ColaboradorService } from '../../componentes/colaborador/colaborador.service';

@Component({
  selector: 'nm-lista-colaborador',
  templateUrl: './lista-colaborador.component.html'
})
export class ListaColaboradorComponent implements OnInit {

  colaboradores: string[]

  constructor(private colaboradorService: ColaboradorService) { }

  ngOnInit() {
    this.colaboradorService.colaboradores().subscribe(response => this.colaboradores = response);
  }

  ngAfterViewInit(){
    var that = this;
    $('#modal').on('hide.bs.modal', function () {
      that.colaboradorService.colaboradores().subscribe(response => that.colaboradores = response);
    })
  }

}
