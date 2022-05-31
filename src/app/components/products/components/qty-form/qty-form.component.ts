/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-qty-form',
  templateUrl: './qty-form.component.html',
  styleUrls: ['./qty-form.component.css'],
})
export class QtyFormComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() stock!: number;
  @Input() title!: string | undefined;
  @Input() inputQuantity!: number;
  @Output() quantity = new EventEmitter<number>();
  @Output() submitted = new EventEmitter();

  qty = 1;

  minusOne() {
    if (this.inputQuantity) {
      this.inputQuantity -= 1;
      this.quantity.emit(this.inputQuantity);
    } else {
      this.qty -= 1;
      this.quantity.emit(this.qty);
    }
  }

  plusOne() {
    if (this.inputQuantity) {
      this.inputQuantity += 1;
      this.quantity.emit(this.inputQuantity);
    } else {
      this.qty += 1;
      this.quantity.emit(this.qty);
    }
  }

  submitClicked() {
    if (this.inputQuantity) {
      this.submitted.emit(this.inputQuantity);
    } else {
      this.submitted.emit(this.qty);
    }
  }
}
