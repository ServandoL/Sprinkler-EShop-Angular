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
  @Output() quantity = new EventEmitter<number>();
  @Output() submitted = new EventEmitter();

  qty = 1;

  minusOne() {
    this.qty -= 1;
    this.quantity.emit(this.qty);
  }

  plusOne() {
    this.qty += 1;
    this.quantity.emit(this.qty);
  }

  submitClicked() {
    this.submitted.emit(this.qty);
  }
}
