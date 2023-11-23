import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../services/data-service.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  modalPopup: any;
  constructor(
    private dataService: DataServiceService,
    private dialog: MatDialog,
    private http: HttpClient
  ) {
    this.http.get('./assets/data.json').subscribe((res: any) => {
      this.Products = res.product;
    });
  }

  ngOnInit(): void {
    this.dataService.Product.subscribe((result: Product) => {
      this.IsProductAdded = true;
      if (result !== null) {
        this.index = this.SelectedProducts.findIndex(
          (x) => x.name == result.name
        );

        if (this.index != -1) {
          this.SelectedProducts[this.index].quantity =
            this.SelectedProducts[this.index].quantity + 1;

          this.SelectedProducts[this.index].total =
            this.SelectedProducts[this.index].quantity *
            this.SelectedProducts[this.index].price;
        } else {
          this.SelectedProducts.push({
            name: result.name,
            price: result.price,
            quantity: 1,
            total: result.price * 1,
          });
        }
      }
      this.CalculateSubtotal();
      this.CalculateTotalItems();
      this.CalculateVatTax();
      this.CalculateDiscount();
    });
  }

  index: number = 0;
  SubTotal: number = 0;
  ItemTotal: number = 0;
  VatTax: number = 0;
  VatAmount: number = 0;
  Discount: number = 0;
  DiscountAmount: number = 0;
  FinalTotal: number = 0;
  IsProductAdded: boolean = false;
  SelectedProducts: SelectedProduct[] = [];
  Products: Product[] = [];

  ClearAll() {
    console.log('VatTax:', this.VatTax);
    this.SubTotal = 0;
    this.ItemTotal = 0;
    this.VatTax = 0;
    this.VatAmount = 0;
    this.Discount = 0;
    this.DiscountAmount = 0;
    this.FinalTotal = 0;
    this.SelectedProducts = [];
    this.IsProductAdded = false;
    console.log('SelectedProducts:', this.SelectedProducts);
    console.log('IsProductAdded:', this.IsProductAdded);
  }

  SubstractProductQuantity(product: SelectedProduct) {
    this.index = this.SelectedProducts.findIndex((x) => x.name == product.name);

    if (this.index >= 0) {
      if (this.SelectedProducts[this.index].quantity > 1) {
        this.SelectedProducts[this.index].quantity =
          this.SelectedProducts[this.index].quantity - 1;

        this.SelectedProducts[this.index].total =
          this.SelectedProducts[this.index].quantity *
          this.SelectedProducts[this.index].price;

        this.CalculateSubtotal();
        this.CalculateTotalItems();
        this.CalculateVatTax();
        this.CalculateDiscount();
      } else {
        this.SelectedProducts.splice(this.index, 1);
        this.CalculateSubtotal();
        this.CalculateTotalItems();
        this.CalculateVatTax();
        this.CalculateDiscount();

        if (this.SelectedProducts.length == 0) {
          this.IsProductAdded = false;
        }
      }
    }
  }

  RemoveProduct(product: SelectedProduct) {
    this.index = this.SelectedProducts.findIndex((x) => x.name == product.name);
    if (this.index >= 0) {
      this.SelectedProducts.splice(this.index, 1);
      this.CalculateSubtotal();
      this.CalculateTotalItems();
      this.CalculateVatTax();
      this.CalculateDiscount();

      if (this.SelectedProducts.length == 0) {
        this.IsProductAdded = false;
      }
    }
  }

  AddProduct(product: SelectedProduct) {
    this.index = this.SelectedProducts.findIndex((x) => x.name == product.name);
    if (this.index >= 0) {
      this.SelectedProducts[this.index].quantity =
        this.SelectedProducts[this.index].quantity + 1;

      this.SelectedProducts[this.index].total =
        this.SelectedProducts[this.index].quantity *
        this.SelectedProducts[this.index].price;

      this.CalculateSubtotal();
      this.CalculateTotalItems();
      this.CalculateVatTax();
      this.CalculateDiscount();
    }
  }

  CalculateSubtotal() {
    var total = 0;
    this.SelectedProducts.forEach((element) => {
      total = total + element.total;
    });
    this.SubTotal = total;
  }

  CalculateTotalItems() {
    var totalItems = 0;
    this.SelectedProducts.forEach((element) => {
      totalItems = totalItems + element.quantity;
    });
    this.ItemTotal = totalItems;
  }

  CalculateVatTax() {
    this.VatAmount = this.SubTotal * (this.VatTax / 100);
    this.CalculateFinalTotal();
  }

  CalculateDiscount() {
    this.DiscountAmount = this.SubTotal * (this.Discount / 100);
    this.CalculateFinalTotal();
  }

  CalculateFinalTotal() {
    this.FinalTotal = this.SubTotal + this.VatAmount - this.DiscountAmount;
  }

  // OpenDialog() {
  //   this.dialog.open(ReceiptComponent);
  // }
}

export interface Product {
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface SelectedProduct {
  name: string;
  price: number;
  quantity: number;
  total: number;
}
