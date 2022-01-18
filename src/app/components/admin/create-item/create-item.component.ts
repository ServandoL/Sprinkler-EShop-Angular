import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduct } from '../../../models/product.model';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css'],
})
export class CreateItemComponent {

  constructor() {}

  newProduct!: IProduct;

  createItemForm = new FormGroup({
    productName: new FormControl('', [Validators.required]),
    productPrice: new FormControl('', [Validators.required]),
    productCategory: new FormControl('', [Validators.required]),
    productBrand: new FormControl('', [Validators.required]),
    productStock: new FormControl(0, [Validators.required]),
    productImage: new FormControl(''),
  });

  get productName() {
    return this.createItemForm.get('productName');
  }
  get productPrice() {
    return this.createItemForm.get('productPrice');
  }
  get productCategory() {
    return this.createItemForm.get('productCategory');
  }
  get productBrand() {
    return this.createItemForm.get('productBrand');
  }
  get productStock() {
    return this.createItemForm.get('productStock');
  }
  get productImage() {
    return this.createItemForm.get('productImage');
  }

  onSubmit() {
    alert('submitted');
  }
}
