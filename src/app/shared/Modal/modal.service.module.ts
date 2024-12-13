import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalServiceComponent } from './modal.service.component';


@NgModule({
  declarations: [
    ModalServiceComponent
  ],
  imports: [
    ModalModule.forRoot()
  ]
})
export class ModalServiceModule { }