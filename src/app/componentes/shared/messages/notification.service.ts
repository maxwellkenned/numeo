import { EventEmitter } from '@angular/core'

export class NotificationService {
  dados = [];
  notifier = new EventEmitter<string[]>()

  notify(message: string, status: boolean){
    this.dados =[{'message': message, 'status': status}]
    this.notifier.emit(this.dados);
  }

}
