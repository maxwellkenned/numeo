import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { API } from '../../app.api';

import { Pessoa } from './pessoa.model';

@Injectable()
export class PessoaService {
  constructor(private http: Http) {  }

  pessoas(): Observable<Pessoa[]> {
    return this.http.get(`${API}/pessoas`)
              .map(response => response.json());
  }

}
