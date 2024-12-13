import { NgModule } from "@angular/core";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { SidenavComponent } from "./shared/sidenav/sidenav.component";
import { MainComponent } from "./main.component";
import { CommonModule } from "@angular/common";
import { MessagingModule } from "../shared/messaging/messaging.module";
import { RouterModule, Routes } from "@angular/router";
import { MainContentComponent } from './main-content/main-content.component';
import { InstallationContentComponent } from './installation-content/installation-content.component';
import { AgGridModule } from "ag-grid-angular";
import { LoaderModule } from "../shared/loader/loader.module";

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
        //   { path: 'production', component: ProductionContentComponent },
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
    InstallationContentComponent
],
  imports: [
    CommonModule,
    MessagingModule,
    AgGridModule,
    LoaderModule,
    RouterModule.forChild(routes)
  ],
  exports: []
})

export class MainModule {}