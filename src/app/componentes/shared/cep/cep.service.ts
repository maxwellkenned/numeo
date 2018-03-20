import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Cep } from './cep.model';

const API_CEP = "https://viacep.com.br/ws/";

@Injectable()
export class CepService {
  constructor(private http: Http) {  }


  getCEP(cep: string): Observable<Cep>{
    return this.http.get(`${API_CEP + cep}/json`)
              .map(response => response.json());
  }
}
