import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ICartItem } from '../../../../models/cart.model';
import { IUser } from '../../../../models/user.model';
import { getCart } from '../../../../services/state/cart/cart.selectors';
import { getUser } from '../../../../services/state/users/users.selectors';
import { CartService } from '../../../../services/state/cart/cart.service';
import { SALES_TAX, STATES } from '../../../../utils/common/constants';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Order } from '../../../../models/checkout.model';
import {
  getErrorSelector,
  getLoadingSelector,
  getResponseSelector,
  getSuccessSelector,
} from '../../../../services/state/checkout/checkout.reducers';
import { CheckoutAppService } from '../../../../services/state/services/checkout.service';
import { AppState } from '../../../../services/state/state';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  tax = SALES_TAX;
  subtotal!: number;
  length!: number;
  success!: boolean | undefined;
  cart$!: Observable<ICartItem[]>;
  cart: ICartItem[] = [];
  error!: string;
  message!: string;
  user!: IUser;
  states = STATES;
  isLoading$!: Observable<boolean>;
  response$!: Observable<string>;
  error$!: Observable<string | undefined>;
  success$!: Observable<boolean | undefined>;
  user$!: Observable<IUser>;

  constructor(
    private store: Store<AppState>,
    public cartService: CartService,
    private checkoutService: CheckoutAppService
  ) {
    this.cart$ = this.store.select(getCart);
    this.isLoading$ = this.store.select(getLoadingSelector);
    this.response$ = this.store.select(getResponseSelector);
    this.error$ = this.store.select(getErrorSelector);
    this.success$ = this.store.select(getSuccessSelector);
    this.user$ = this.store.select(getUser);
  }

  checkOutForm = new FormGroup({
    address: new FormControl('', [Validators.required]),
    address2: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('Choose...', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
    cardNumber: new FormControl('', [Validators.required]),
    month: new FormControl('Month', Validators.required),
    year: new FormControl('', Validators.required),
    cvv: new FormControl('', Validators.required),
  });

  get address() {
    return this.checkOutForm.get('address');
  }
  get address2() {
    return this.checkOutForm.get('address2');
  }
  get city() {
    return this.checkOutForm.get('city');
  }
  get state() {
    return this.checkOutForm.get('state');
  }
  get zipCode() {
    return this.checkOutForm.get('zipCode');
  }
  get cardNumber() {
    return this.checkOutForm.get('cardNumber');
  }
  get month() {
    return this.checkOutForm.get('month');
  }
  get year() {
    return this.checkOutForm.get('year');
  }
  get cvv() {
    return this.checkOutForm.get('cvv');
  }

  ngOnInit(): void {
    this.checkoutService.resetCheckoutMessage();
    this.checkoutService.resetSuccess();
    this.subscriptions.push(
      this.cart$.subscribe((state) => {
        this.length = state.length;
      })
    );
    this.subscriptions.push(
      this.cart$.subscribe((state) => {
        this.subtotal = 0;
        state.forEach((product) => {
          this.subtotal += product.price * product.quantity;
        });
      })
    );
    this.subscriptions.push(
      this.cart$.subscribe((cart) => {
        let products: ICartItem[] = cart.map((product) => {
          const { __typename, ...fields } = product;
          return fields;
        });
        if (products.length) {
          this.cart = [...products];
        }
      })
    );
    this.subscriptions.push(
      this.user$.subscribe((user) => {
        this.user = user;
      })
    );
  }

  onSubmit(formValues: FormGroup) {
    const order: Order = {
      userId: this.user._id,
      order: [...this.cart],
      shipping: {
        address: formValues.controls['address'].value,
        address2: formValues.controls['address2'].value,
        city: formValues.controls['city'].value,
        state: formValues.controls['state'].value,
        zipCode: formValues.controls['zipCode'].value,
      },
      payment: {
        cardNumber: formValues.controls['cardNumber'].value,
        month: formValues.controls['cardNumber'].value,
        year: formValues.controls['year'].value,
        cvv: formValues.controls['cvv'].value,
      },
      email: this.user.email,
      total: +(this.subtotal + this.subtotal * this.tax).toFixed(2),
    };
    this.checkoutService.checkout(order);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
