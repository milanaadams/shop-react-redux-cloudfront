export type Cart = {
  id: string;
  items: CartItem[];
};

export type CartItem = {
  cart_id: string;
  product_id: string;
  count: number;
};
