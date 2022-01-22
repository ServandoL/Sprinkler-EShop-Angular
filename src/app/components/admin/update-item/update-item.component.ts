import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduct } from '../../../models/product.model';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css'],
})
export class UpdateItemComponent implements OnInit {
  constructor() {}

  @Input() product!: IProduct;

  updateItemForm = new FormGroup({
    productName: new FormControl(this.product?.productName),
    productPrice: new FormControl(this.product?.price, [
      Validators.pattern(
        /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/
      ),
    ]),
    productStock: new FormControl(this.product?.stock),
    productImage: new FormControl(this.product?.imageUrl),
  });

  ngOnInit(): void {}

  onSubmit() {
    alert('product updated');
    console.log(this.product);
  }
}
