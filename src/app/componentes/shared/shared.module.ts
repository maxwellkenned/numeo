import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import { InputComponent } from './input/input.component'
import { RadioComponent } from './radio/radio.component'
import { RatingComponent } from './rating/rating.component'


import { SnackbarComponent } from './messages/snackbar/snackbar.component';

import { NotificationService } from './messages/notification.service';
import { AccodionBoxComponent } from './accodion-box/accodion-box.component';

import { CnpjPipe } from './pipesMask/cnpj.pipe';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent, AccodionBoxComponent, CnpjPipe],
  exports: [InputComponent, RadioComponent,
            RatingComponent, CommonModule,
            FormsModule, ReactiveFormsModule,
            SnackbarComponent, AccodionBoxComponent,
            CnpjPipe],
  providers: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [NotificationService]
    }
  }
}
