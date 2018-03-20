import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var $;
import { EmpresaService } from '../../componentes/empresa/empresa.service';

@Component({
  selector: 'nm-lista-empresa',
  templateUrl: './lista-empresa.component.html'
})
export class ListaEmpresaComponent implements OnInit, AfterViewInit {

  empresas = [];

  constructor(private empresaService: EmpresaService) { }

  ngOnInit() {
    this.empresaService.empresas().subscribe(response => this.empresas = response);
  }

  ngAfterViewInit(){
    var that = this;
    $('#modal').on('hide.bs.modal', function () {
      that.empresaService.empresas().subscribe(response => that.empresas = response);
    })
  }

}
