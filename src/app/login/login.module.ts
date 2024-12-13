import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login.component";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SecurityService } from "../shared/security/security.service";
import { MessagingModule } from "../shared/messaging/messaging.module";
import { ModalService } from "../shared/Modal/modal.service";
import { LoaderService } from "../shared/loader/service/loader.service";
import { LoaderModule } from "../shared/loader/loader.module";

const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: '**', redirectTo: ''}
  ]

  @NgModule({
    declarations: [
      LoginComponent
    ],
    imports: [
      CommonModule,
      MessagingModule,
      ReactiveFormsModule,
      HttpClientModule,
      LoaderModule,
      RouterModule.forChild(routes)
    ],
    providers: [
      SecurityService,
      ModalService
      // ... other services provided in this module
    ] 
    })

  export class LoginModule { }