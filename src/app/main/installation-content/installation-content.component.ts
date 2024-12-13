import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IDatasource, IGetRowsParams, IServerSideDatasource, IServerSideGetRowsParams } from 'ag-grid-community';
import { LoaderService } from '../../shared/loader/service/loader.service';

@Component({
  selector: 'app-installation-content',
  templateUrl: './installation-content.component.html',
  styleUrl: './installation-content.component.scss'
})
export class InstallationContentComponent {
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

  /**
   *
   */
  constructor(private http: HttpClient
    , private loaderService: LoaderService

  ) {}

  ngOnInit(): void {
    this.dataSource = this.createServerSideDatasource();
  }
  
  createServerSideDatasource(): IDatasource {
    this.loaderService.show()
    const mockData = {
      rows: [
        { id: 1, name: 'Name 1', email: 'email1@example.com' },
        { id: 2, name: 'Name 2', email: 'email2@example.com' },
        { id: 3, name: 'Name 3', email: 'email3@example.com' },
        { id: 4, name: 'Name 4', email: 'email4@example.com' },
        { id: 5, name: 'Name 5', email: 'email5@example.com' },
        { id: 6, name: 'Name 6', email: 'email6@example.com' },
        { id: 7, name: 'Name 7', email: 'email7@example.com' },
        { id: 8, name: 'Name 8', email: 'email8@example.com' },
        { id: 9, name: 'Name 9', email: 'email9@example.com' },
        { id: 10, name: 'Name 10', email: 'email10@example.com' },
        { id: 11, name: 'Name 11', email: 'email11@example.com' },
        { id: 12, name: 'Name 12', email: 'email12@example.com' },
        { id: 13, name: 'Name 13', email: 'email13@example.com' },
        { id: 14, name: 'Name 14', email: 'email14@example.com' },
        { id: 15, name: 'Name 15', email: 'email15@example.com' },
        { id: 16, name: 'Name 16', email: 'email16@example.com' },
        { id: 17, name: 'Name 17', email: 'email17@example.com' },
        { id: 18, name: 'Name 18', email: 'email18@example.com' },
        { id: 19, name: 'Name 19', email: 'email19@example.com' },
        { id: 20, name: 'Name 20', email: 'email20@example.com' },        
      ],
      totalCount: 30,
    };

    return {
      getRows: (params: IGetRowsParams) => {
        const startRow = params.startRow;
        const endRow = params.endRow;

        // console.log('Requesting rows from', params.startRow, 'to', params.endRow);
        this.http
          .get<any>(`https://localhost:5001/api/data?start=${startRow}&end=${endRow}`)
          .subscribe({
            next: (response) => {
              this.loaderService.hide();
              params.successCallback(response.rows, response.totalCount);
            },
            error: (error) => {
              this.loaderService.hide();
              params.successCallback(mockData.rows, mockData.totalCount);
              // console.error('Error fetching data:', error);
              // params.failCallback();
            },
          });
      },
    };
  }

  onPaginationChanged(event: any){
    // const mockData2 = {
    //   rows: [
    //     { id: 21, name: 'Name 11', email: 'email11@example.com' },
    //     { id: 22, name: 'Name 12', email: 'email12@example.com' },
    //     { id: 23, name: 'Name 13', email: 'email13@example.com' },
    //     { id: 24, name: 'Name 14', email: 'email14@example.com' },
    //     { id: 25, name: 'Name 15', email: 'email15@example.com' },
    //     { id: 26, name: 'Name 16', email: 'email16@example.com' },
    //     { id: 27, name: 'Name 17', email: 'email17@example.com' },
    //     { id: 28, name: 'Name 18', email: 'email18@example.com' },
    //     { id: 29, name: 'Name 19', email: 'email19@example.com' },
    //     { id: 30, name: 'Name 20', email: 'email20@example.com' },        
    //   ],
    //   totalCount: 30,
    // };

    console.log('sadf');
    const currentPage = event.api.paginationGetCurrentPage();
    const pageSize = event.api.paginationGetPageSize();
    //console.log('Pagination Changed:', currentPage, pageSize);

    // You can add custom logic here
    // For example, you might want to fetch new data based on the current page:
    // this.datasource.getRows({
    //   startRow: currentPage * pageSize,
    //   endRow: (currentPage + 1) * pageSize,
    //   successCallback: (rows, totalCount) => {
    //     event.api.setRowData(rows);
    //   },
    //   failCallback: () => {
    //     event.api.showNoRowsOverlay();
    //   },
    // });

    this.dataSource.getRows({
      startRow: currentPage * pageSize,
      endRow: (currentPage + 1) * pageSize,
      successCallback: (rows, totalCount) => {
        event.api.setRowData(rows);
        event.api.setRowCount(totalCount);
      },
      failCallback: () => {
        event.api.showNoRowsOverlay();
      },      
    } as IGetRowsParams);
  }
}
