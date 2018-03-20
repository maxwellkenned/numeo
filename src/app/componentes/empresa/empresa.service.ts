import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { API } from '../../app.api';

import { EmpresaComponent } from './empresa.component';
import { Empresa } from './empresa.model';

@Injectable()
export class EmpresaService {
  constructor(private http: Http) {  }

  empresas(): Observable<string[]>{
    return this.http.get(`${API}/empresas`)
              .map(response => response.json());
  }

  salvar(empresa: string): Observable<string>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${API}/empresas`,
                          JSON.stringify(empresa),
                          new RequestOptions({headers: headers}))
                          .map(response => response.json())
  }

}
