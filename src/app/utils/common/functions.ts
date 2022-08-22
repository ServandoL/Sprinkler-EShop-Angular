import { ICartItem } from '../../models/cart.model';
import { IProduct } from '../../models/product.model';

export function addToCartFunction(
  product: IProduct,
  qty: number,
  validated: boolean
): ICartItem | string {
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
  return 'Oh Snap! You need to be logged in to update your cart.';
}
