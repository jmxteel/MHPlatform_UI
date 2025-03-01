import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { LoaderService } from '../../../shared/loader/service/loader.service';
import { debounceTime, Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { TableLazyLoadEvent } from 'primeng/table';
import { FileFlowService } from './data/installation-content.data.service';
import { FileFlow, FileFlowResponse } from './model/fileflow-response.model';
import { Pagination } from '../Model/pagination.model';

@Component({
  selector: 'app-installation-content',
  templateUrl: './installation-content.component.html',
  styleUrl: './installation-content.component.scss'
})
export class InstallationContentComponent implements OnInit {
  fileFlows: FileFlow[] = [];
  totalRecords: number = 0;
  loading: boolean = true;
  tableHeight: string = '0px';
  windowHeight: number = 0;
  pagination!: Pagination;
  filters = {filter: '',q: '', pageNumber: 1, pageSize: 20};

  constructor(
    private fileFlowService: FileFlowService,     
    private cdr: ChangeDetectorRef, 
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) { 
      this.windowHeight = window.innerHeight; // ✅ Only access window in browser
      this.cdr.detectChanges();
    } 
  }

  loadFileFlow($event: TableLazyLoadEvent){
    this.loading = true;
    this.fileFlowService.getFileFlows($event.first || 0).subscribe(
      (response: any) => {
        this.loading = false;
        this.pagination = JSON.parse(response.headers.get('X-Pagination')) as Pagination;
        this.fileFlows = response.body as FileFlow[];
        this.totalRecords = this.pagination.TotalItemCount;  
        this.cdr.detectChanges();

        if (isPlatformBrowser(this.platformId)) {
          this.tableHeight = (this.windowHeight - 170) + 'px'; // ✅ Safe to access window
        }        
      }
    )
  }

}
