import { NgModule } from "@angular/core";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { SidenavComponent } from "./shared/sidenav/sidenav.component";
import { MainComponent } from "./main.component";
import { CommonModule } from "@angular/common";
import { MessagingModule } from "../shared/messaging/messaging.module";
import { RouterModule, Routes } from "@angular/router";
import { MainContentComponent } from './main-content/main-content.component';
import { InstallationContentComponent } from './main-content/installation-content/installation-content.component';
import { LoaderModule } from "../shared/loader/loader.module";
import { ProductionContentComponent } from './main-content/production-content/production-content.component';
import { ImportsPrimeNgModule } from "../shared/imports/primeng.module";

const routes: Routes = [
    {
        path: '',
        // canActivate: [DelayRoutingGuard],
        component: MainComponent,
        children: [
          { path: '', component: MainContentComponent },
        //   { path: 'reports', component: ReportsContentComponent },
        //   { path: 'access-rights', component: AccessRightsContentComponent },
          { path: 'installation', component: InstallationContentComponent },
          { path: 'production', component: ProductionContentComponent },
        ]
      },  
      { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    MainComponent,
    NavbarComponent,
    SidenavComponent,
    MainContentComponent,
    InstallationContentComponent,
    ProductionContentComponent
],
  imports: [
    CommonModule,
    MessagingModule,
    LoaderModule,
    ImportsPrimeNgModule,
    RouterModule.forChild(routes)
  ],
  exports: []
})

export class MainModule {}