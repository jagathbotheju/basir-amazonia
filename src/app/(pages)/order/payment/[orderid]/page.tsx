"use client";

import useCart from "@/store/store";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Order } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  params: {
    orderid: string;
  };
}

const PaymentPage = ({ params }: Props) => {
  const router = useRouter();
  const [mount, setMount] = useState(false);
  const [updatedOrder, setUpdatedOrder] = useState<Order | null>(null);
  const { shippingAddress, paymentMethod, cart, resetCart } = useCart(
    (state) => state
  );

  const itemsPrice = mount
    ? cart.reduce((a, c) => a + c.price * c.quantity, 0)
    : 0;
  const tax: number = 10.5;
  const shipping = 15;
  const totalPrice = (itemsPrice + tax + shipping).toFixed(2);

  useEffect(() => {
    if (!mount) setMount(true);
  }, [mount]);

  const createOrder = (data: any, actions: any) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderId: string) => {
        return orderId;
      });
  };

  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then(async function (details: any) {
      try {
        axios
          .put(`/api/order/payment/${params.orderid}`, { details })
          .then(({ data }) => {
            setUpdatedOrder(data);
            toast.success("Order payed successfully");
            router.push("/");
            resetCart();
          })
          .catch((error) => {
            console.log(error);
            toast.error("Error in purchase");
          });
      } catch (error) {
        console.log(error);
        toast.error("Error in purchase");
      }
    });
  };

  const onError = (error: any) => {
    console.log(error);
    toast.error("Payment Error");
  };

  return (
    <div className="mt-10 px-10 w-full h-full">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold py-4 px-5">Payment</h1>

        {/* order summary */}
        <div className="p-5 shadow-lg flex flex-col h-fit max-w-xl">
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
              <p className="py-2 font-semibold text-xl">{totalPrice}</p>
            </div>
          </div>
          <p
            className={`text-xl font-semibold my-5 p-5 ${
              updatedOrder?.isPaid ? "bg-green-600" : "bg-red-200"
            }`}
          >
            {updatedOrder?.isPaid ? "Payment Successful" : "Payment Pending..."}
          </p>

          {/* paypal buttons */}
          <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
