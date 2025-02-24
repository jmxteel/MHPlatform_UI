import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { LoaderService } from '../../../shared/loader/service/loader.service';
import { debounceTime, Subject } from 'rxjs';
import { Product, ProductsResponse } from './model/product';
import { DummyService } from '../../data/product.service.data';
import { isPlatformBrowser } from '@angular/common';
import { TableLazyLoadEvent } from 'primeng/table';

@Component({
  selector: 'app-installation-content',
  templateUrl: './installation-content.component.html',
  styleUrl: './installation-content.component.scss'
})
export class InstallationContentComponent implements OnInit {
  products: Product[] = [];
  totalRecords: number = 0;
  loading: boolean = true;
  tableHeight: string = '0px';
  windowHeight: number = 0;

  constructor(private appService: DummyService, private cdr: ChangeDetectorRef, @Inject(PLATFORM_ID) private platformId: any ) { }

  ngOnInit(): void {
    this.testing();
    if (isPlatformBrowser(this.platformId)) { 
      this.windowHeight = window.innerHeight; // ✅ Only access window in browser
      this.cdr.detectChanges();
    } 
  }

  // event type will be LazyLoadEvent in primeng14
  loadProducts($event: TableLazyLoadEvent) {
    this.loading = true;
    this.appService.getProducts($event.first || 0).subscribe(
      (response: ProductsResponse) => {
        this.loading = false;
        this.products = response.products;
        this.totalRecords = response.total;
        this.cdr.detectChanges();      

        if (isPlatformBrowser(this.platformId)) {
          this.tableHeight = (this.windowHeight - 170) + 'px'; // ✅ Safe to access window
        }        
      }
    )
  }

  testing() {
    this.loading = true;
    this.appService.getProducts(0).subscribe(
      (response: ProductsResponse) => {
        this.loading = false;
        this.products = response.products;
        this.totalRecords = response.total;
        this.cdr.detectChanges();      

        if (isPlatformBrowser(this.platformId)) {
          this.tableHeight = (this.windowHeight - 170) + 'px'; // ✅ Safe to access window
        }        
      }
    )
  }

}
