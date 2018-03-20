import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { API } from '../../app.api';

import { ServicoComponent } from './servico.component';

@Injectable()
export class ServicoService {
  constructor(private http: Http) {  }

  salvar(servico: string): Observable<string>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${API}/servicos`,
                    JSON.stringify(servico),
                    new RequestOptions({headers: headers}))
                    .map(response => response.json())
  }

  servicos(): Observable<string[]>{
    return this.http.get(`${API}/servicos`)
              .map(response => response.json());
  }

}
