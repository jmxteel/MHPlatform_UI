import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GridOptions, IGetRowsParams, PaginationChangedEvent } from 'ag-grid-community';
import { MockService } from './mockervice';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-production-content',
  templateUrl: './production-content.component.html',
  styleUrl: './production-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductionContentComponent implements OnInit{
  paginationPageSize = 20;
  paginationPageSizeSelector = [20, 50, 100, 250, 500];
  gridOptions!: GridOptions;
  rowData: any[] = [];
  columnDefs: any[] = [];
  private gridApi: any;
  private currentPageSize = this.paginationPageSize;
  public counter = 0;
  public callParams: any[] = [];
  private isNewPageSize = false;

  defaultColDef = {
    sortable: true,
    filter: true,
    flex: 1
  };  


constructor(private mockService: MockService, private cdr: ChangeDetectorRef, private http: HttpClient) 
{
  this.gridOptions = {
    pagination: true,
    rowModelType: 'infinite',
    cacheBlockSize: this.paginationPageSize,
    paginationPageSize: this.paginationPageSize,
    serverSideEnableClientSideSort: true,
    paginationPageSizeSelector: this.paginationPageSizeSelector,
    datasource: this.createDataSource(),
    onPaginationChanged: (event: any) => this.onPaginationChanged(event),
  };
}

  ngOnInit(): void {
    this.loadColumnDefs();   
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  onPaginationChanged(event: PaginationChangedEvent) {
    if (this.gridApi) {
      console.log(event);
      this.isNewPageSize = event.newPageSize ?? false;
      this.currentPageSize = this.gridApi.paginationGetPageSize();
      this.gridApi.updateGridOptions({
        paginationPageSize: this.currentPageSize,
        cacheBlockSize: this.currentPageSize,
      });
    }  
  }
  
  loadColumnDefs() {
    this.mockService.getColumnDefs().subscribe((cols: any) => {
      //this.columnDefs = cols;

      this.columnDefs = [
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Name' },
        { field: 'email', headerName: 'Email' }
      ];  
    });   
  }

  createDataSource() {
    return {
      getRows: (params: IGetRowsParams) => {
        const startRow = params.startRow;
        const endRow = params.endRow;
        const sortModel = params.sortModel;
        this.callParams.push(params);
        if (this.isNewPageSize) {
          console.log('fail Callback');
          params.failCallback();
        } else {
          // this.mockService
          //   .getData(startRow, endRow - startRow, sortModel)
           this.http.get<any>(`https://localhost:7028/api/client?start=${startRow}&end=${endRow}&sortField=${sortModel[0]?.colId}&sortOrder=${sortModel[0]?.sort}`)
            .subscribe((data: any) => {
              this.counter += 1;
              this.cdr.detectChanges();
              console.log('Data is ', data.rows);
              const lastRow =
                data.rows.length < endRow - startRow ? startRow + data.rows.length : -1;
              params.successCallback(data.rows, lastRow);
            });
        }
      },
    };
  }  
}

