type Product = {
  id: number;
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
  shippingAddress: Address | null;
  paymentMethod: string;
};

type Address = {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

type Actions = {
  resetCart: () => void;
  resetError: () => void;
  addCartItem: (cartItem: CartItem) => void;
  removeCartItem: (cartItem: CartItem) => void;
  addQuantity: (cartItem: CartItem) => void;
  removeQuantity: (cartItem: CartItem) => void;
  addShippingAddress: (address) => void;
  addPaymentMethod: (payment) => void;
};

type AuthUser = {
  accessToken: string;
  createdAt: string;
  email: string;
  emailVerified: boolean;
  exp: string;
  iat: string;
  id: number;
  image: string;
  jti: string;
  name: string;
  picture: string;
  role: string;
  sub: string;
  updatedAt: string;
};
