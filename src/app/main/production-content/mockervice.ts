import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MockService {
  private totalRecords = 2000; // Assume we have 500 records in total
  private data: any[] = [];

  constructor() {
    // Generate mock data
    for (let i = 1; i <= this.totalRecords; i++) {
      this.data.push({
        id: i,
        name: `Name ${i}`,
        value: `Value ${i}`,
      });
    }
  }

  getData(
    offset: number,
    limit: number,
    sortModel: any[] = []
  ): Observable<any[]> {
    // Apply pagination
    let pageData = this.data.slice(offset, offset + limit);

    // Apply sorting if sort model is provided
    if (sortModel && sortModel.length > 0) {
      const sortField = sortModel[0].colId;
      const sortOrder = sortModel[0].sort;

      pageData = pageData.sort((a, b) => {
        if (a[sortField] < b[sortField]) {
          return sortOrder === 'asc' ? -1 : 1;
        } else if (a[sortField] > b[sortField]) {
          return sortOrder === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      });
    }

    return of(pageData).pipe(delay(500)); // Simulate network delay
  }

  getColumnDefs(): Observable<any[]> {
    return of([
      { headerName: 'ID', field: 'id', sortable: true },
      { headerName: 'Name', field: 'name', sortable: true },
      {
        headerName: 'Value',
        field: 'value',
        sortable: true,
      },
    ]); // Simulate network delay
  }
}
