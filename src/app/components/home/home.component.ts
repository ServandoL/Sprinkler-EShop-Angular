import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductAppService } from '../../services/state/services/product.service';
import { AppState } from '../../services/state/state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private productService: ProductAppService) {}

  ngOnInit(): void {
    this.productService.loadProductFilters(['category', 'brand']);
  }
}
