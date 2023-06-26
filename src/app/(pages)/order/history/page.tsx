"use client";
import { Order } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/order/history")
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error getting Order History");
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="mt-10 px-10 h-full">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Order History</h1>

        {loading ? (
          <>
            <div className="text-yellow-500 w-full h-full justify-center items-center flex">
              <PuffLoader size={40} />
            </div>
          </>
        ) : orders.length === 0 ? (
          <>
            <h1 className="mt-10 p-5 text-2xl font-bold">Orders Not Found!</h1>
          </>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">ID</th>
                    <th className="px-5 text-left">DATE</th>
                    <th className="px-5 text-left">TOTAL</th>
                    <th className="px-5 text-left">PAID</th>
                    <th className="px-5 text-left">DELIVERED</th>
                    <th className="px-5 text-left">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="p-5">{order.id}</td>
                      <td className="p-5">
                        {order.paidAt && order?.paidAt.toString()}
                      </td>
                      <td className="p-5">$ {order.totalPrice}</td>
                      <td className="p-5">
                        {order.isPaid ? "PAID" : "NOT PAID"}
                      </td>
                      <td className="p-5">
                        {order.isDelivered
                          ? "Order Delivered"
                          : "Not Delivered"}
                      </td>
                      <td className="p-5">
                        <Link href={`/order/${order.id}`}>Details</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
