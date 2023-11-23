import { Component, Input, Output } from '@angular/core';
import { Product, SelectedProduct } from '../home/home.component';
import { DataServiceService } from '../services/data-service.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() ProductIn: any;
  // @Output() ProductOut: any;

  constructor(private dataService: DataServiceService) {}

  AddProduct(product: Product) {
    this.dataService.AddProduct(product);
  }
}
