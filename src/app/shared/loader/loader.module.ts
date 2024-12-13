import { NgModule } from "@angular/core";
import { LoaderComponent } from "./loader.component";
import { LoaderService } from "./service/loader.service";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        LoaderComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        LoaderComponent
    ],
    providers: [
        LoaderService
    ],
})

export class LoaderModule {

}