import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ClickEvent } from '../../../../../../projects/star-rating/src/public-api';
import { AppState } from '../../../../models/AppState';
import { IProduct, ReviewRequest } from '../../../../models/product.model';
import { IUser } from '../../../../models/user.model';
import { AuthService } from '../../../../services/auth/auth-service.service';
import {
  getError,
  getProductDescription,
  getUpdateResponse,
} from '../../../../services/state/product/product.selectors';
import { ProductAppService } from '../../../../services/state/services/product.service';
import { getUser } from '../../../../services/state/users/users.selectors';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  reviewProduct$: Observable<IProduct>;
  success$: Observable<boolean>;
  error$: Observable<any>;
  user$: Observable<IUser>;
  user!: IUser;
  product!: IProduct;
  validated!: boolean;
  subscriptions: Subscription[] = [];
  reviewRequest: ReviewRequest = {
    productId: '',
    name: '',
    review: '',
    headLine: '',
    rate: 0,
    createdDate: '',
  };

  constructor(
    private store: Store<AppState>,
    private productService: ProductAppService,
    public authService: AuthService
  ) {
    this.reviewProduct$ = this.store.select(getProductDescription);
    this.success$ = this.store.select(getUpdateResponse);
    this.error$ = this.store.select(getError);
    this.user$ = this.store.select(getUser);
  }

  reviewForm = new FormGroup({
    headLine: new FormControl(''),
    review: new FormControl(''),
  });

  get headLine() {
    return this.reviewForm.get('headLine');
  }

  get review() {
    return this.reviewForm.get('review');
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.getToken$().subscribe((token) => {
        this.validated = token;
      }),
      this.reviewProduct$.subscribe((product) => (this.product = product)),
      this.user$.subscribe((user) => (this.user = user))
    );
  }

  onRatingClicked(rating: ClickEvent) {
    this.reviewRequest.rate = rating.rating;
  }

  submit() {
    this.reviewRequest = {
      ...this.reviewRequest,
      productId: this.product._id,
      name: `${this.user.fname} ${this.user.lname}`,
      createdDate: new Date().toISOString(),
      headLine: this.headLine?.value,
      review: this.review?.value,
    };
    this.productService.submitReview(this.reviewRequest);
  }
}
