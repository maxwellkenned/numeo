import { Component, OnInit } from '@angular/core';

import { CarrinhoService } from './carrinho.service';

@Component({
  selector: 'nm-carrinho',
  templateUrl: './carrinho.component.html'
})
export class CarrinhoComponent implements OnInit {

  constructor(private carrinhoService: CarrinhoComponent) { }

  ngOnInit() {
  }

  items() {
    return this.carrinhoService.items;
  }

  clear(){
    this.carrinhoService.clear()
  }

  removeItem(item: any){
    this.carrinhoService.removeItem(item)
  }

  addItem(item: any){
    this.carrinhoService.addItem(item)
  }

  total(): number {
    return this.carrinhoService.total()
  }

}
