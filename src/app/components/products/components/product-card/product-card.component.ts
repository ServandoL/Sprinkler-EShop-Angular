import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from '../../../../models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  constructor() { }

  @Input() product!: IProduct;
  @Output() quantityUpdated = new EventEmitter();
  @Output() submitClicked = new EventEmitter();

  updateQuantity(value: number) {
    this.quantityUpdated.emit(value);
  }

  submit() {
    this.submitClicked.emit();
  }

}
