import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { setTheme } from 'ngx-bootstrap/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MHPlatform_UI';

  modalRef?: BsModalRef;
  constructor(private modalService: BsModalService) {
    setTheme('bs4');
  }
 
  openModal(template: TemplateRef<any>) {
    console.log('openModal ' + template);
    this.modalRef = this.modalService.show(template);
  }
}
