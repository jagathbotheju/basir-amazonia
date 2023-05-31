type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  description: string;
};

type CartItem = Product & {
  quantity: number;
};

type State = {
  product?: Product | null;
  cart: CartItem[];
  totalPrice: number;
  error: String | null;
};

type Actions = {
  resetCart: () => void;
  resetError: () => void;
  addCartItem: (cartItem: CartItem) => void;
  removeCartItem: (cartItem: CartItem) => void;
  addQuantity: (cartItem: CartItem) => void;
  removeQuantity: (cartItem: CartItem) => void;
};
