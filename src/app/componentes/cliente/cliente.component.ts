import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { Router } from '@angular/router';

import { ClienteService } from './cliente.service';
import { NotificationService } from '../shared/messages/notification.service';
import { CepService } from '../shared/cep/cep.service';
import { Cep } from '../shared/cep/cep.model';

declare var $;

@Component({
  selector: 'nm-cliente',
  templateUrl: './cliente.component.html'
})
export class ClienteComponent implements OnInit {
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  clienteForm: FormGroup;
  jsonCep: Cep;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private clienteService: ClienteService,
              private cepService: CepService,
              private notification: NotificationService) { }

  ngOnInit() {
    this.clienteForm = this.formBuilder.group({
      // Pessoa
      nome_pessoa: this.formBuilder.control('', [Validators.required]),
      email: this.formBuilder.control('', Validators.pattern(this.emailPattern)),
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
    },{updateOn: 'blur'})
  }


  salvar(cliente: string){
    this.clienteService.salvar(cliente)
    .subscribe((response: string) => {
      if(response['status']){
        $('#modal').modal('hide');
        this.router.navigate(['/lista/cliente']);
        this.notification.notify('Cliente cadastrado com sucesso.', true);
      } else {
        this.notification.notify(response['data'].toString(), false)
      }
    })
  }

  ngAfterViewInit(){
    $('#cpf').inputmask("999.999.999-99",{ autoUnmask: true, rightAlign: false, clearMaskOnLostFocus: true})
    $('#cep').inputmask("99999-999",{ autoUnmask: true, rightAlign: false, clearMaskOnLostFocus: true})
  }

  getValueCPF(){
    var cpf = $('#cpf').inputmask('unmaskedvalue')
    this.clienteForm.get('cpf').setValue(cpf)
  }

  setValueCep(){
    var cep = $('#cep').inputmask('unmaskedvalue')
    this.clienteForm.get('cep').setValue(cep)
    this.buscarCep(cep);
  }

  buscarCep(cep: string){
    console.log(cep);
    if(cep.length === 8 ){
      cep = cep.replace(/[^0-9]/g,'');

      $('#endereco').val('...');
      $('#bairro').val('...');
      $('#cidade').val('...');
      $('#estado').val('...');
      $('#pais').val('...');


      this.cepService.getCEP(cep).subscribe({
        next: (response) => {
          this.jsonCep = response;
        },
        error: (error) => {
          $('#endereco').val('');
          $('#bairro').val('');
          $('#cidade').val('');
          $('#estado').val('');
          $('#pais').val('');
        },
        complete: () => {
          this.clienteForm.get('endereco').setValue(this.jsonCep.logradouro);
          this.clienteForm.get('bairro').setValue(this.jsonCep.bairro);
          this.clienteForm.get('cidade').setValue(this.jsonCep.localidade);
          this.clienteForm.get('estado').setValue(this.jsonCep.uf);
          this.clienteForm.get('pais').setValue("Brasil");
        }
      });
    }
  }

}
