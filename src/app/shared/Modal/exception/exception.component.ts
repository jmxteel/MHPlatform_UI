import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-exception',
  templateUrl: './exception.component.html',
  styleUrl: './exception.component.scss'
})
export class ExceptionComponent {
  title?: string;
  message?: string;
  confirm: () => void = () => {};
  decline: () => void = () => {};
  close: () => void = () => {};

  constructor(public bsModalRef: BsModalRef) {}
}
