"use client";

import { Order, OrderItem, ShippingAddress } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

interface Props {
  params: {
    id: number;
  };
}

interface OrderHistory {
  id: number;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date | null;
  isDelivered: boolean;
  deliveredAt: Date | null;
  shippingId: number;
  userId: number;
  orderItems: OrderItem[];
  shippingAddress?: ShippingAddress;
}

const OrderDetails = ({ params }: Props) => {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<OrderHistory | null>(null);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
    if (params) {
      axios
        .get(`/api/order/${params.id}`)
        .then((res) => {
          const order: OrderHistory = res.data;

          if (order) {
            setOrder(order);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [params]);

  return (
    <div className="mt-10 px-10 h-full">
      <div className="flex flex-col">
        <h1 className="mb-4 text-2xl font-bold">Order Details : {order?.id}</h1>
        {loading ? (
          <>
            <div className="text-yellow-500 h-full w-full justify-center items-center flex">
              <PuffLoader size={40} />
            </div>
          </>
        ) : !order ? (
          <>
            <h1 className="p-10 mt-10 border-r-pink-300 font-bold text-2xl neon-orange rounded-md text-primary">
              Order Not Found
            </h1>
          </>
        ) : (
          <>
            <div className="grid md:grid-cols-4 md:gap-5">
              {/* left */}
              <div className="overflow-x-auto md:col-span-3">
                {/* shipping address */}
                <div className="drop-shadow-xl mt-5 w-full p-5 text-gray-700 bg-gray-50 rounded-md mb-5">
                  <h3 className="text-xl font-semibold ">Shipping Address</h3>
                  {mount && order.shippingAddress ? (
                    <p>{`${order.shippingAddress.fullName}, ${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`}</p>
                  ) : (
                    <p>Address Not Set</p>
                  )}
                </div>

                {/* shipping address */}
                <div className="drop-shadow-xl mt-5 w-full p-5 text-gray-700 bg-gray-50 rounded-md mb-5">
                  <h3 className="text-xl font-semibold ">Payment Method</h3>
                  {mount && order.paymentMethod ? (
                    <p>{`${order.paymentMethod}`}</p>
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
                        order.orderItems.map((item) => (
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
                              <p className="select-none pr-8">
                                {item.quantity}
                              </p>
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
                    <p>${order.itemsPrice.toFixed(2)}</p>
                    <p>${order.taxPrice.toFixed(2)}</p>
                    <p>${order.shippingPrice.toFixed(2)}</p>
                    <p className="py-2 font-semibold text-xl">
                      $
                      {(
                        order.itemsPrice +
                        order.taxPrice +
                        order.shippingPrice
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
