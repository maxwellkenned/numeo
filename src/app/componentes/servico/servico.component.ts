import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
declare var $;
import { Router } from '@angular/router';

import { EmpresaService } from '../empresa/empresa.service';
import { ServicoService } from './servico.service';
import { NotificationService } from '../shared/messages/notification.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'nm-servico',
  templateUrl: './servico.component.html'
})
export class ServicoComponent implements OnInit {

  empresas = [];
  servicoForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private servicoService: ServicoService,
              private empresaService: EmpresaService,
              private notification: NotificationService,
              private router: Router) { }

  ngOnInit() {
    this.empresaService.empresas().subscribe(response => this.empresas = response);
    this.servicoForm = this.formBuilder.group({
      ds_servico: this.formBuilder.control('', [Validators.required]),
      vl_servico: this.formBuilder.control(''),
      id_empresa: this.formBuilder.control('', [Validators.required])
    });
  }


  salvar(servico: string) {
    console.log('Servico', servico);
    this.servicoService.salvar(servico)
      .subscribe((response: string) => {
        if (response['status']) {
          $('#modal_servico').modal('hide');
          this.router.navigate([this.router.url]);
          this.notification.notify('Serviço cadastrado com sucesso.', true);
        } else {
          this.notification.notify(response['data'].toString(), false);
        }
      });
  }

}
