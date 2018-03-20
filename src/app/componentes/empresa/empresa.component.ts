import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

declare var $;

import { Router } from '@angular/router';

import { Empresa } from './empresa.model';
import { EmpresaService } from './empresa.service';
import { Pessoa } from '../pessoa/pessoa.model';
import { PessoaService } from '../pessoa/pessoas.service';

import { NotificationService } from '../shared/messages/notification.service';

@Component({
  selector: 'nm-empresa',
  templateUrl: './empresa.component.html'
})

export class EmpresaComponent implements OnInit, AfterViewInit {
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  empresaForm: FormGroup;
  pessoas: Pessoa[]

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private empresaService: EmpresaService,
              private pessoaService: PessoaService,
              private notification: NotificationService) { }

  ngOnInit() {
    this.pessoaService.pessoas().subscribe(response => this.pessoas = response);
    this.empresaForm = this.formBuilder.group({
      id_pessoa: this.formBuilder.control('', [Validators.required]),
      cnpj: this.formBuilder.control('', Validators.minLength(14)),
      nome_fantasia: this.formBuilder.control('',),
      razao_social: this.formBuilder.control('', [Validators.required]),
      email_empresa: this.formBuilder.control('', [Validators.pattern(this.emailPattern)]),
    },{updateOn: 'blur'});
  }

  ngAfterViewInit(){
    $('#cnpj').inputmask("99.999.999/9999-99",{ autoUnmask: true, rightAlign: false, clearMaskOnLostFocus: true})
  }

  getValueCNPJ(){
    var cnpj = $('#cnpj').inputmask('unmaskedvalue')
    this.empresaForm.get('cnpj').setValue(cnpj)
  }


  salvar(empresa: string){
    console.log(empresa);
    this.empresaService.salvar(empresa)
    .subscribe((response: string) => {
      if(response['status']){
        $('#modal').modal('hide');
        this.router.navigate(['/lista/empresa']);
        this.notification.notify('Empresa cadastrada com sucesso.', true)
      } else {
        this.notification.notify(response['data'].toString(), false)
      }
    })
  }

}
