import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ICartItem } from '../../models/cart.model';
import { IProduct } from '../../models/product.model';

export function addToCartFunction(product: IProduct, qty: number, validated: boolean) {
  const cartItem: ICartItem = {
    _id: product._id,
    userId: sessionStorage.getItem('SessionUser') || sessionStorage.getItem('SessionAdmin'),
    productName: product.productName,
    stock: product.stock,
    quantity: qty,
    price: product.price,
    brand: product.brand,
    category: product.category,
    imageUrl: product.imageUrl,
  };
  if (validated) {
    return cartItem;
  }
  return undefined;
}
