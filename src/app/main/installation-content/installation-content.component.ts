import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IDatasource, IGetRowsParams, IServerSideDatasource, IServerSideGetRowsParams, PaginationChangedEvent } from 'ag-grid-community';
import { LoaderService } from '../../shared/loader/service/loader.service';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-installation-content',
  templateUrl: './installation-content.component.html',
  styleUrl: './installation-content.component.scss'
})
export class InstallationContentComponent {
  private pageChangeSubject: Subject<any> = new Subject();
  responseData : any;
  responseToalDataCount! : number;
  columnDefs = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'email', headerName: 'Email' }
  ];
  defaultColDef = {
    sortable: true,
    filter: true,
    flex: 1
  };
  paginationPageSize = 20;
  paginationPageSizeSelector=[20, 50, 100];
  // rowModelType = 'serverSide';
  dataSource!: IDatasource;

    // Track the current page to avoid unnecessary API calls
    private currentPage: number = -1;
  /**
   *
   */
  constructor(private http: HttpClient
    , private loaderService: LoaderService) 
    {
      this.pageChangeSubject.pipe(debounceTime(1000)).subscribe((event) => {
        this.onPaginationChanged(event);
      });
    }

  ngOnInit(): void {
    this.dataSource = this.createServerSideDatasource();
  }
  
  createServerSideDatasource(): IDatasource {
    //this.loaderService.show()

    return {
      getRows: (params: IGetRowsParams) => {
        const startRow = params.startRow;
        const endRow = params.endRow;

        // Calculate the current page
        //const currentPage = Math.floor(startRow / this.paginationPageSize);

        // Prevent duplicate API calls
        // if (currentPage === this.currentPage) {
        //   console.log('Page already loaded, skipping API call');
        //   params.successCallback(this.responseData, this.responseToalDataCount); // No data change, no need to call API
        //   return;
        // }
        //this.currentPage = currentPage;

        // console.log('Requesting rows from', params.startRow, 'to', params.endRow);
        this.http
          // .get<any>(`https://localhost:5001/api/data?start=${startRow}&end=${endRow}`)
          .get<any>(`https://localhost:7028/api/client?start=${startRow}&end=${endRow}`)
          .subscribe({
            next: (response) => {
              //this.loaderService.hide();
              params.successCallback(response.rows, response.totalCount);
              this.responseData = response.rows
              this.responseToalDataCount = response.totalCount
            },
            error: (error) => {
              //this.loaderService.hide();
              //params.successCallback(mockData.rows, mockData.totalCount);
              // console.error('Error fetching data:', error);
              params.failCallback();
            },
          });
      },
    };
  }

  onPaginationChanged(event: any){
    const currentPage = event.api.paginationGetCurrentPage();
    const pageSize = event.api.paginationGetPageSize();
    //console.log('Pagination Changed:', currentPage, pageSize);
    
    this.dataSource.getRows({
      startRow: currentPage * pageSize,
      endRow: (currentPage + 1) * pageSize,
      // successCallback: (rows, totalCount) => {
      //   //event.api.setRowData(rows);
      //   //event.api.setRowCount(totalCount);
      // },
      // failCallback: () => {
      //   event.api.showNoRowsOverlay();
      // },      
    } as IGetRowsParams);

  }

}
