import { Injectable, TemplateRef, ViewChild, viewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalServiceComponent } from './modal.service.component';
import { ExceptionComponent } from './exception/exception.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalRef?: BsModalRef;
  @ViewChild('test') test!: TemplateRef<any>;

  constructor(private bsModalService: BsModalService) {}

  show(template: TemplateRef<any>, config?: any) {
    this.modalRef = this.bsModalService.show(template, config);
    return this.modalRef;
  }

  hide() {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  showConfirm(title: string, message: string): Promise<boolean> {
    return new Promise((resolve) => {
      const config = {
        initialState: {
          title,
          message,
          confirm: () => {
            this.modalRef?.hide();
            resolve(true);
          },
          decline: () => {
            this.modalRef?.hide();
            resolve(false);
          }
        }
      };
      
      this.modalRef = this.bsModalService.show(ModalServiceComponent, config);
    });
  }

  showExceptionModal(title: string, message: string): Promise<void> {
    return new Promise((resolve) => {
      const config = {
        initialState: {
          title,
          message,
          close: () => {
            this.modalRef?.hide();
            resolve();
          }
        }
      };

      this.modalRef = this.bsModalService.show(ExceptionComponent, config);
    });
  }

  showCustomModal(template: TemplateRef<any>, title: string, message: string): Promise<void> {
    return new Promise((resolve) => {
        const config = {
          initialState: {
            title,
            message,
            close: () => {
              this.modalRef?.hide();
              resolve();
            }
          }
        };
  
        this.modalRef = this.bsModalService.show(template, config);
      });
  }
}