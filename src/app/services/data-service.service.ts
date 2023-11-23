import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../home/home.component';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  Product = new EventEmitter<any>();
  constructor() {}

  AddProduct(product: Product) {
    this.Product.emit(product);
  }
}
