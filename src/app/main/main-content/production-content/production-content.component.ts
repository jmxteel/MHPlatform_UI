import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableLazyLoadEvent } from 'primeng/table';
import { Pagination } from '../Model/pagination.model';
import { FileFlow } from './model/file-flow.model';
import { isPlatformBrowser } from '@angular/common';
import { ProductionContentDataService } from './data/production-content.data.service';

@Component({
  selector: 'app-production-content',
  templateUrl: './production-content.component.html',
  styleUrl: './production-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductionContentComponent implements OnInit {
  fileFlows: FileFlow[] = [];
  totalRecords: number = 0;
  loading: boolean = true;
  tableHeight: string = '0px';
  windowHeight: number = 0;
  pagination!: Pagination;
  filters = {filter: '',q: '', pageNumber: 1, pageSize: 20};

  constructor(
    private service: ProductionContentDataService,     
    private cdr: ChangeDetectorRef, 
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

  ngOnInit(): void {
    this.loading = true;
    if (isPlatformBrowser(this.platformId)) { 
      this.windowHeight = window.innerHeight; // ✅ Only access window in browser
      this.cdr.detectChanges();
    } 
  }

  loadFileFlow($event: TableLazyLoadEvent){
    this.loading = true;
    this.service.getFileFlows($event.first || 0).subscribe(
      (response: any) => {
        this.loading = false;
        this.pagination = JSON.parse(response.headers.get('X-Pagination')) as Pagination;
        this.fileFlows = response.body as FileFlow[];
        this.totalRecords = this.pagination.TotalItemCount;  

        setTimeout(() => {
          this.cdr.detectChanges(); // ✅ Forces UI update
        }, 500);

        if (isPlatformBrowser(this.platformId)) {
          this.tableHeight = (this.windowHeight - 224) + 'px'; // ✅ Safe to access window
        }        
      }
    )
  }
}
