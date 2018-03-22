import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { Router } from '@angular/router';

import { Colaborador } from './colaborador.model';
import { ColaboradorService } from './colaborador.service';
import { EmpresaService } from '../empresa/empresa.service';

import { NotificationService } from '../shared/messages/notification.service';

declare var $;

@Component({
  selector: 'nm-colaborador',
  templateUrl: './colaborador.component.html'
})
export class ColaboradorComponent implements OnInit {
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  colaboradorForm: FormGroup;
  empresas = [];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private colaboradorService: ColaboradorService,
              private empresaService: EmpresaService,
              private notification: NotificationService){
                this.empresaService.empresas().subscribe(response => this.empresas = response);
              }

  ngOnInit() {
    this.colaboradorForm = this.formBuilder.group({
      // Colaborador
      id_empresa: this.formBuilder.control('', [Validators.required]),
      id_funcao: this.formBuilder.control('', ),
      id_conjuge: this.formBuilder.control('', ),
      dt_admissao: this.formBuilder.control('', ),
      salario: this.formBuilder.control('', ),
      clt: this.formBuilder.control('', ),
      clt_serie: this.formBuilder.control('', ),
      clt_pis: this.formBuilder.control('', ),
      inf_escolaridade: this.formBuilder.control('', ),
      frequencia_pagamento: this.formBuilder.control('', ),

      // Pessoa
      nome_pessoa: this.formBuilder.control('', [Validators.required]),
      email: this.formBuilder.control('', Validators.pattern(this.emailPattern)),
      senha: this.formBuilder.control('', ),
      confirm_senha: this.formBuilder.control('', ),
      telefone: this.formBuilder.control('',),
      celular: this.formBuilder.control('',),
      pessoa_contato: this.formBuilder.control(''),
      cep: this.formBuilder.control('',),
      endereco: this.formBuilder.control('',),
      endereco_numero: this.formBuilder.control('',),
      complemento: this.formBuilder.control('',),
      bairro: this.formBuilder.control('',),
      cidade: this.formBuilder.control('',),
      estado: this.formBuilder.control('',),
      pais: this.formBuilder.control('',),
      sexo: this.formBuilder.control('',),
      cpf: this.formBuilder.control('',),
      rg: this.formBuilder.control('',),
      rg_emissor: this.formBuilder.control('',),
      rg_uf: this.formBuilder.control('',),
      dt_nascimento: this.formBuilder.control('',),
      nome_pai: this.formBuilder.control('',),
      nome_mae: this.formBuilder.control('',),
      titulo: this.formBuilder.control('',),
      titulo_zona: this.formBuilder.control('',),
      titulo_secao: this.formBuilder.control('',)
    },{validator: ColaboradorComponent.passEqualsTo, updateOn: 'blur'})
  }

  static passEqualsTo(group: AbstractControl): {[key:string]: boolean}{
    const senha = group.get('senha');
    const confirmSenha = group.get('confirm_senha');
    if(!senha || !confirmSenha){
      return undefined
    }
    if(senha.value !== confirmSenha.value){
      return {passNotMatch:true}
    }
    return undefined
  }


  salvar(colaborador: string){
    this.colaboradorService.salvar(colaborador)
    .subscribe((response: string) => {
      if(response['status']){
        $('#modal').modal('hide');
        this.router.navigate(['/lista/colaborador']);
        this.notification.notify('Colaborador cadastrado com sucesso.', true);
      } else {
        this.notification.notify(response['data'].toString(), false)
      }
    })
  }

}
