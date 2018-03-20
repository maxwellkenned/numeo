import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules, ExtraOptions } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    VendasComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    RouterModule.forRoot(ROUTES, {onSameUrlNavigation:"reload", preloadingStrategy: PreloadAllModules})
  ],
  providers: [PessoaService, EmpresaService, ColaboradorService, ClienteService, ServicoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
