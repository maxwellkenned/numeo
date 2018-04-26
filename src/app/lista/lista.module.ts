import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../componentes/shared/shared.module';

import { ListaColaboradorComponent } from './lista-colaborador/lista-colaborador.component';
import { ColaboradorService } from '../componentes/colaborador/colaborador.service';

import { ListaClienteComponent } from './lista-cliente/lista-cliente.component';
import { ClienteService } from '../componentes/cliente/cliente.service';

import { ListaEmpresaComponent } from './lista-empresa/lista-empresa.component';
import { EmpresaService } from '../componentes/empresa/empresa.service';

import { ListaServicoComponent } from './lista-servico/lista-servico.component';
import { ServicoService } from '../componentes/servico/servico.service';

import { CadastroModule } from '../cadastro/cadastro.module';

import { CepService } from '../componentes/shared/cep/cep.service';

const ListaROUTES = [
  {path: 'colaborador', component: ListaColaboradorComponent},
  {path: 'empresa', component: ListaEmpresaComponent},
  {path: 'servico', component: ListaServicoComponent},
  {path: 'cliente', component: ListaClienteComponent},
];

@NgModule({
  imports: [RouterModule.forChild(ListaROUTES), CommonModule, SharedModule, CadastroModule],
  declarations: [ListaColaboradorComponent, ListaEmpresaComponent, ListaServicoComponent, ListaClienteComponent],
  providers: [ColaboradorService, EmpresaService, ServicoService, ClienteService, CepService]
})
export class ListaModule { }
