import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../componentes/shared/shared.module';

import { ColaboradorComponent } from '../componentes/colaborador/colaborador.component';
import { EmpresaComponent } from '../componentes/empresa/empresa.component';
import { ServicoComponent } from '../componentes/servico/servico.component';
import { ClienteComponent } from '../componentes/cliente/cliente.component';

@NgModule({
  imports: [SharedModule],
  declarations: [ColaboradorComponent, EmpresaComponent, ServicoComponent, ClienteComponent],
  providers: [],
  exports: [ColaboradorComponent, EmpresaComponent, ServicoComponent, ClienteComponent]
})
export class CadastroModule { }
