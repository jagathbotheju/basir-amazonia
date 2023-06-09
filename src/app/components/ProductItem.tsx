"use client";
import useCart from "@/store/store";
import { Card } from "@tremor/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  product: Product;
}

const ProductItem = ({ product }: Props) => {
  const router = useRouter();
  const { cart, addCartItem } = useCart((state) => state);
  const [mounted, setMounted] = useState(false);

  const cartItem: CartItem = {
    ...product,
    quantity: 1,
  };

  const isItemExist = mounted
    ? cart.find((item) => item.id === cartItem.id)
    : false;
  const handleAddCartItem = () => {
    console.log("adding...");
    if (isItemExist) return toast.error("Item already exist in your Cart");
    addCartItem(cartItem);
  };

  useEffect(() => {
    if (!mounted) setMounted(true);
  }, [mounted]);

  return (
    <div className="mb-5 block rounded-lg border border-gray-200 shadow-md w-full md:max-w-xs">
      <div
        className="relative w-full md:max-w-xs h-[200px] rounded-lg cursor-pointer"
        onClick={() => router.push(`/product/${product.id}`)}
      >
        <Image
          src={product.image}
          alt={product.name}
          className="object-cover rounded shadow object-top"
          fill
          placeholder="blur"
          blurDataURL={product.image}
          priority={true}
        />
      </div>

      <div className="flex items-center justify-center p-5 flex-col">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p>{product.brand}</p>
        <p>${product.price}</p>
        <button
          onClick={handleAddCartItem}
          type="button"
          className="primary-button disabled:bg-gray-300"
          disabled={Boolean(isItemExist)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
