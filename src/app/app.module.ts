import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules, ExtraOptions } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { HomeComponent } from './layouts/home/home.component';

import { SharedModule } from './componentes/shared/shared.module';
import { PessoaService } from './componentes/pessoa/pessoas.service';
import { EmpresaService } from './componentes/empresa/empresa.service';
import { ClienteService } from './componentes/cliente/cliente.service';
import { ServicoService } from './componentes/servico/servico.service';
import { ColaboradorService } from './componentes/colaborador/colaborador.service';
import { VendasComponent } from './componentes/vendas/vendas.component';
import { FinalizarVendaComponent } from './componentes/vendas/finalizar-venda/finalizar-venda.component';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    VendasComponent,
    FinalizarVendaComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    RouterModule.forRoot(ROUTES, {onSameUrlNavigation: 'reload', preloadingStrategy: PreloadAllModules})
  ],
  providers: [
    PessoaService, EmpresaService, ColaboradorService, ClienteService, ServicoService, {provide: LOCALE_ID, useValue: 'pt-Br'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
