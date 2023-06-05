"use client";
import useCart from "@/store/store";
//import useCart from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";
import AuthButton from "./AuthButton";
import { useEffect, useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const cart = useCart((state) => state.cart);
  const [storeInit, setStoreInit] = useState(false);

  useEffect(() => {
    setStoreInit(true);
  }, [cart]);

  return (
    <div className="w-full flex justify-between py-5 px-10 shadow-xl items-center">
      <div className="cursor-pointer" onClick={() => router.push("/")}>
        <h1 className="text-2xl font-bold">amazona</h1>
      </div>

      <div className="flex font-semibold gap-4 items-center">
        <Link href="/cart" className="flex relative">
          <FaShoppingCart className="text-2xl" />
          {storeInit && cart.length > 0 && (
            <div className="bg-red-500 text-white h-2 w-2 rounded-full absolute -top-2 -right-2 p-2 flex items-center justify-center text-xs">
              {cart.length}
            </div>
          )}
        </Link>
        <AuthButton />
      </div>
    </div>
  );
};

export default Navbar;
