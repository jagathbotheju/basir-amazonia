import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState: State = {
  product: null,
  cart: [],
  totalPrice: 0,
  error: null,
};

const useCart = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...initialState,

      //actions
      resetCart: () => {
        set(initialState);
      },

      resetError: () => {
        set({ error: null });
      },

      addQuantity: (cartItem: CartItem) => {
        const filterCart = get().cart.filter((item) => item.id !== cartItem.id);
        const newCart = [
          ...filterCart,
          {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          },
        ];
        let price = 0;
        newCart.map((item) => {
          price += item.price * item.quantity;
        });
        set({
          cart: newCart,
          totalPrice: price,
        });
      },

      removeQuantity: (cartItem: CartItem) => {
        const filterCart = get().cart.filter((item) => item.id !== cartItem.id);
        if (cartItem.quantity > 1) {
          const newCart = [
            ...filterCart,
            {
              ...cartItem,
              quantity: cartItem.quantity - 1,
            },
          ];
          let price = 0;
          newCart.map((item) => {
            price += item.price * item.quantity;
          });
          set({
            cart: newCart,
            totalPrice: price,
          });
        }
      },

      removeCartItem: (cartItem: CartItem) => {
        const newCart = get().cart.filter((item) => item.id !== cartItem.id);
        let price = 0;
        newCart.map((item) => {
          price += item.price * item.quantity;
        });
        set({
          cart: newCart,
          totalPrice: price,
        });
      },

      addCartItem: (cartItem: CartItem) => {
        const newCart = [...get().cart, cartItem];
        let price = 0;
        newCart.map((item) => {
          price += item.price * item.quantity;
        });
        set({
          cart: newCart,
          totalPrice: price,
        });
      },
    }),
    { name: "cart" }
  )
);

export default useCart;
