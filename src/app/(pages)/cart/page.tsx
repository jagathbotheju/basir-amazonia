"use client";

import useCart from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import { AiFillDelete } from "react-icons/ai";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";

const CartPage = () => {
  const { cart, removeCartItem, removeQuantity, addQuantity, totalPrice } =
    useCart((state) => state);
  const router = useRouter();

  return _.isEmpty(cart) ? (
    <>
      <div className="mt-10 px-10 w-full">
        <div className="bg-red-100 rounded-lg p-20 flex flex-col gap-4">
          <h1 className="text-2xl font-semibold text-center">Empty Cart</h1>
          <div className="flex justify-end">
            <button onClick={() => router.push("/")} className="primary-button">
              Go Shopping
            </button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="mt-10 px-10 h-full w-full">
        <h1 className="text-2xl font-bold py-4">Shopping Cart</h1>
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="px-5 text-right">Quantity</th>
                  <th className="px-5 text-right">Price</th>
                  <th className="px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td>
                      <Link
                        href={`/product/${item.slug}`}
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
                    <td className="p-5 text-right flex items-center justify-end gap-2">
                      <AiOutlineMinusSquare
                        className="text-xl cursor-pointer"
                        onClick={() => removeQuantity(item)}
                      />
                      <p className="select-none">{item.quantity}</p>
                      <AiOutlinePlusSquare
                        className="text-xl cursor-pointer"
                        onClick={() => addQuantity(item)}
                      />
                    </td>
                    <td className="p-5 text-right select-none">{`$${item.price}`}</td>
                    <td className="p-5 text-right flex justify-end">
                      <AiFillDelete
                        className="text-lg text-rose-500 cursor-pointer"
                        onClick={() => removeCartItem(item)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* summary */}
          <div className="w-full p-5 shadow-lg">
            <h3 className="text-xl font-semibold text-center">
              Sub Total ({cart.reduce((a, c) => a + c.quantity, 0)}) : ${" "}
              {cart.reduce((a, c) => a + c.price * c.quantity, 0)}
            </h3>
            <button
              onClick={() => router.push("/shipping")}
              className="primary-button mt-5 w-full"
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
