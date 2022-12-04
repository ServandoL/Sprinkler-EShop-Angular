import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IProduct, UpdateProductRequest } from '../../../models/product.model';
import { IUser } from '../../../models/user.model';
import {
  getError,
  getProductLoading,
  getUpdateResponse,
} from '../../../services/state/product/product.selectors';
import { ProductAppService } from '../../../services/state/services/product.service';
import { AppState } from '../../../services/state/state';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css'],
})
export class UpdateItemComponent implements OnInit {
  @Input() product!: IProduct;
  @Input() user!: IUser | null;
  updateItemForm!: FormGroup;
  isLoading$!: Observable<boolean>;
  updateSuccess$!: Observable<boolean | null>;
  subscriptions!: Subscription[];
  error$!: Observable<string>;

  constructor(private store: Store<AppState>, private productService: ProductAppService) {
    this.isLoading$ = this.store.select(getProductLoading);
    this.updateSuccess$ = this.store.select(getUpdateResponse);
    this.error$ = this.store.select(getError);
  }

  ngOnInit(): void {
    this.updateItemForm = new FormGroup({
      productName: new FormControl(this.product?.productName),
      price: new FormControl(this.product?.price.toString(), [
        Validators.pattern(
          /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/
        ),
      ]),
      stock: new FormControl(this.product?.stock.toString()),
      imageUrl: new FormControl(this.product?.imageUrl),
    });
  }

  get productName() {
    return this.updateItemForm.get('productName');
  }

  get price() {
    return this.updateItemForm.get('price');
  }

  get stock() {
    return this.updateItemForm.get('stock');
  }

  get imageUrl() {
    return this.updateItemForm.get('imageUrl');
  }

  onUpdate() {
    const request: UpdateProductRequest = {
      productId: this.product._id,
      productName: this.productName?.value || this.product.productName,
      modifiedDate: new Date().toISOString(),
      modifiedBy: this.user ? this.user.email : '',
      price: +this.price?.value || +this.product.price,
      stock: +this.stock?.value || +this.product.stock,
      imageUrl: this.imageUrl?.value || this.product.imageUrl,
    };
    this.productService.updateProduct(request);
  }

  onClose() {
    this.productService.resetUpdateResponse();
  }
}
