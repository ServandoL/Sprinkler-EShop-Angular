import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { IProduct } from '../../../models/product.model';
import { getProductsQuery } from './product.queries';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private httpClient: HttpClient, private apollo: Apollo) {}

  // getProducts(): Observable<IProduct[]> {
  //   this.apollo
  //     .watchQuery({
  //       query: getProductsQuery,
  //     })
  //     .valueChanges.pipe(map((result) => result.data.products));
  // }
}
