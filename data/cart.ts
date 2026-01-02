export interface CartItem {
  productId: number;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
}

// Simple in-memory cart (for MVP - could use localStorage for persistence)
let cart: Cart = {
  items: [],
};

export function getCart(): Cart {
  return cart;
}

export function addToCart(productId: number, quantity: number = 1): void {
  const existingItem = cart.items.find((item) => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }
}

export function removeFromCart(productId: number): void {
  cart.items = cart.items.filter((item) => item.productId !== productId);
}

export function updateCartItem(productId: number, quantity: number): void {
  const item = cart.items.find((item) => item.productId === productId);
  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = quantity;
    }
  }
}

export function clearCart(): void {
  cart.items = [];
}

export function getCartItemCount(): number {
  return cart.items.reduce((total, item) => total + item.quantity, 0);
}

