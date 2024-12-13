import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpInterceptorProviders } from './shared/http-interceptor/interceptor-providers';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoaderComponent } from './shared/loader/loader.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
     canActivate: [AuthGuard],
    // data: { claimType: 'canAccessCategories' }  
    data: { claimType: 'isAuthenticated' } 
  },  
  {
    path: '**',
    redirectTo: 'login'
  }  
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [BsModalService, HttpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
