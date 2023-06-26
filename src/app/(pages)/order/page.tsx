"use client";
import CheckoutWizard from "@/app/components/CheckoutWizard";
import useCart from "@/store/store";
import { Order, OrderItem, User } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AiFillDelete,
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
} from "react-icons/ai";
import { toast } from "react-toastify";
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { PuffLoader } from "react-spinners";

const OrderPage = () => {
  const { shippingAddress, paymentMethod, cart, resetCart } = useCart(
    (state) => state
  );

  const [mount, setMount] = useState(false);
  const session = useSession();
  const router = useRouter();
  const itemsPrice = mount
    ? cart.reduce((a, c) => a + c.price * c.quantity, 0)
    : 0;
  const tax: number = 10.5;
  const shipping = 15;
  const totalPrice = itemsPrice + tax + shipping;
  const user = session?.data?.user as AuthUser;

  const submitHandler = () => {
    const payment = {
      paymentMethod,
      itemsPrice,
      shippingPrice: shipping,
      taxPrice: tax,
      totalPrice,
    };

    const productIds = mount && cart.map((item) => item.id);

    axios
      .post("/api/order/", {
        payment,
        shippingAddress,
        userId: user.id,
        productIds,
        cart: cart.map((item: any) => {
          const { orderId, ...newItem } = item;
          return newItem;
        }),
      })
      .then((res) => {
        const order: Order = res.data;
        router.push(`/order/payment/${order.id}`);
        //resetCart();
      })
      .catch(() => {
        toast.error("Error placing order");
      });
  };

  useEffect(() => {
    if (!mount) setMount(true);
  }, [mount]);

  //console.log(cart);

  // const orders = cart.map((item: any) => {
  //   const { orderId, ...newItem } = item;
  //   return newItem;
  // });
  // console.log(orders);

  return (
    <div className="mt-10 px-10 w-full h-full">
      <CheckoutWizard activeStep={2} />
      <div className="grid md:grid-cols-4 md:gap-5">
        {/* left */}
        <div className="overflow-x-auto md:col-span-3">
          <h1 className="text-2xl font-bold py-4 px-5">Place Order</h1>

          {/* shipping address */}
          <div className="drop-shadow-xl mt-5 w-full p-5 text-gray-700 bg-gray-50 rounded-md mb-5">
            <h3 className="text-xl font-semibold ">Shipping Address</h3>
            {mount && shippingAddress ? (
              <p>{`${shippingAddress.fullName}, ${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}`}</p>
            ) : (
              <p>Address Not Set</p>
            )}
          </div>

          {/* shipping address */}
          <div className="drop-shadow-xl mt-5 w-full p-5 text-gray-700 bg-gray-50 rounded-md mb-5">
            <h3 className="text-xl font-semibold ">Payment Method</h3>
            {mount && paymentMethod ? (
              <p>{`${paymentMethod}`}</p>
            ) : (
              <p>Payment method Not Set</p>
            )}
          </div>

          {/* order items */}
          <div>
            <h1 className="text-2xl font-bold py-4">Order Items</h1>
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="px-5 text-right">Quantity</th>
                  <th className="px-5 text-right">Price</th>
                  <th className="px-5 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {mount &&
                  cart.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td>
                        <Link
                          href={`/product/${item.id}`}
                          className="flex items-center gap-4"
                        >
                          <div className="relative w-[50px] h-[50px] rounded">
                            <Image
                              alt={item.name}
                              src={item.image}
                              fill
                              className="object-cover object-top shadow"
                            />
                          </div>
                          <p className="font-semibold">{item.name}</p>
                        </Link>
                      </td>
                      <td className="p-5 text-center flex items-center justify-end">
                        <p className="select-none pr-8">{item.quantity}</p>
                      </td>
                      <td className="p-5 text-right select-none">{`$${item.price}`}</td>
                      <td className="p-5 text-right flex justify-end">
                        <p>${item.price * item.quantity}</p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* right */}
        <div className="p-5 shadow-lg flex flex-col h-fit">
          <p className="font-semibold text-xl">Order Summary</p>
          <div className="flex justify-between">
            <div>
              <p>Items Price</p>
              <p>Tax</p>
              <p>Shipping</p>
              <p className="py-2 font-semibold text-xl">Total</p>
            </div>

            <div className="text-end">
              <p>${itemsPrice.toFixed(2)}</p>
              <p>${tax.toFixed(2)}</p>
              <p>${shipping.toFixed(2)}</p>
              <p className="py-2 font-semibold text-xl">
                ${(itemsPrice + tax + shipping).toFixed(2)}
              </p>
            </div>
          </div>

          {/* order button */}
          <button
            onClick={submitHandler}
            className="primary-button w-full mt-5 text-semibold"
          >
            Payment
          </button>
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          //disabled={!selectedPaymentMethod}
          onClick={() => router.push("/payment")}
          type="button"
          className="primary-button disabled:default-button"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
