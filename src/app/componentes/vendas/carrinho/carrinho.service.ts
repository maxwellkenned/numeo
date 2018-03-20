import {Injectable} from '@angular/core'

import {NotificationService} from '../../shared/messages/notification.service'

@Injectable()
export class CarrinhoService {
  items: string[] = []

  constructor(private notificationService: NotificationService){}

  clear(){
    this.items = []
  }

  addItem(item){
    let foundItem = this.items.find((mItem)=> mItem['id'] === item.id)
    if(foundItem){
      this.increaseQty(foundItem)
    }else{
      this.items.push(item)
    }
    this.notificationService.notify(`Você adicionou o item ${item.name}`, true)
  }

  increaseQty(item){
    item.quantity = item.quantity + 1
  }

  decreaseQty(item){
    item.quantity = item.quantity - 1
    if (item.quantity === 0){
      this.removeItem(item)
    }
  }

  removeItem(item){
    this.items.splice(this.items.indexOf(item), 1)
    this.notificationService.notify(`Você removeu o item ${item.menuItem.name}`, true)
  }

  total(): number{
    return this.items
      .map(item => item['value'])
      .reduce((prev, value)=> prev+value, 0)
  }
}
