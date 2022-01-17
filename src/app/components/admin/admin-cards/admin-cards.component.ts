import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../../models/product.model';

@Component({
  selector: 'app-admin-cards',
  templateUrl: './admin-cards.component.html',
  styleUrls: ['./admin-cards.component.css']
})
export class AdminCardsComponent {

  constructor() { }

  @Input() product!: IProduct;
  @Output() clickedUpdate = new EventEmitter();
  @Output() clickedDelete = new EventEmitter();

  updateClicked() {
    this.clickedUpdate.emit();
  }

  deleteClicked() {
    this.clickedDelete.emit();
  }
}
