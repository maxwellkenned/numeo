import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { API } from '../../app.api';
import {ErrorHandler} from '../../app.error-handler';

import { Colaborador } from './colaborador.model';
import { Pessoa } from '../pessoa/pessoa.model';
import { ListaColaborador } from '../../lista/lista-colaborador/lista-colaborador.model';

@Injectable()
export class ColaboradorService {
  constructor(private http: Http) { }

  salvar(colab: string): Observable<string>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${API}/colaborador`,
                          JSON.stringify(colab),
                          new RequestOptions({headers: headers}))
                          .map(response => response.json())
  }

  colaboradores(): Observable<string[]> {
    return this.http.get(`${API}/colaborador`)
      .map(response => response.json())
      .catch(ErrorHandler.handleError);
  }


}
