import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">Modal</h4>
      <button type="button" class="btn-close close pull-right" aria-label="Close" (click)="close()">
        <span aria-hidden="true" class="">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      {{ message }}
    </div> 
    <div class="modal-footer">
        <button type="button" class="btn btn-primary" (click)="confirm()">Yes</button>
        <button type="button" class="btn btn-secondary" (click)="decline()">No</button>
    </div>  
  `
})
export class ModalServiceComponent {
  title?: string;
  message?: string;
  confirm: () => void = () => {};
  decline: () => void = () => {};
  close: () => void = () => {};

  constructor(public bsModalRef: BsModalRef) {}
}