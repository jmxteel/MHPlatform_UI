import { Component } from '@angular/core';
import { LoaderService } from './service/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {

  constructor(public loaderService: LoaderService) { }
}
