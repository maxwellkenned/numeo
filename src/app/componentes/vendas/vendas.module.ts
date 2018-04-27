import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../componentes/shared/shared.module';
import { CadastroModule } from '../../cadastro/cadastro.module';
import { CepService } from '../shared/cep/cep.service';
import { VendasComponent } from './vendas.component';
import { FinalizarVendaComponent } from './finalizar-venda/finalizar-venda.component';
import { CarrinhoService } from './carrinho/carrinho.service';

@NgModule({
  imports: [CommonModule, SharedModule, CadastroModule],
  declarations: [VendasComponent, FinalizarVendaComponent],
  providers: [CepService, CarrinhoService],
  exports: [VendasComponent, FinalizarVendaComponent]
})
export class VendasModule {}
