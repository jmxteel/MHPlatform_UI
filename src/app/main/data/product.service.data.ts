import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsResponse } from '../main-content/installation-content/model/product';

@Injectable({
  providedIn: 'root'
})

export class DummyService {

  constructor(private http: HttpClient) { }

  getProducts(skip: number): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(`https://dummyjson.com/products?limit=50&skip=${skip}`);
  }
}