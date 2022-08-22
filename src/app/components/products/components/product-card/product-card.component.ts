import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../../../../models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  constructor() {}

  @Input() product!: IProduct;
  @Input() title!: string;
  @Input() message!: {
    message: string;
    id: string;
  };
  @Output() quantityUpdated = new EventEmitter();
  @Output() submitClicked = new EventEmitter();
  @Output() reviewClicked = new EventEmitter<boolean>();

  onReviewClicked($event: boolean) {
    this.reviewClicked.emit($event);
  }

  updateQuantity(value: number) {
    this.quantityUpdated.emit(value);
  }

  submit(qty: number) {
    this.submitClicked.emit(qty);
  }
}
