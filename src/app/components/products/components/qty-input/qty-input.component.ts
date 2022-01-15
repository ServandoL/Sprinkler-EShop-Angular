import { Component, EventEmitter, Input, Output } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-qty-input',
  templateUrl: './qty-input.component.html',
  styleUrls: ['./qty-input.component.css']
})
export class QtyInputComponent {

  constructor() { }

  @Output() quantity = new EventEmitter<number>();
  qty = 1;

  minusOne(value: number) {
    this.qty -= 1;
    this.quantity.emit(value);
  }

  plusOne(value: number) {
    this.qty += 1;
    this.quantity.emit(value);
  }


}
