"use client";

import useCart from "@/store/store";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PuffLoader } from "react-spinners";

interface Props {
  params: {
    id: number;
  };
}

const NameDetails = ({ params }: Props) => {
  const router = useRouter();
  const { cart, addCartItem } = useCart((state) => state);
  const [cartItem, setCartItem] = useState<CartItem | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (params) {
      axios
        .get(`/api/product/${params.id}`)
        .then((res) => {
          const product: Product = res.data;
          if (product) {
            const cItem: CartItem = {
              ...product,
              quantity: 1,
            };
            setCartItem(cItem);
          }
        })
        .catch((error) => {
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [params]);

  const isItemExist = cart.find((item) => item.id === cartItem?.id);
  const handleAddCartItem = () => {
    if (cartItem) {
      if (isItemExist) return toast.error("Item already exist in your Cart");
      addCartItem(cartItem);
      router.push("/");
    }
  };

  return (
    <div className="mt-10 px-10 h-full">
      {!cartItem ? (
        <div className="mt-10 px-10 h-full flex items-center justify-center">
          <PuffLoader />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 w-full min-h-full bg-gray-100">
          {/* image */}
          <div className="relative w-full h-full rounded-lg aspect-square">
            <Image
              src={cartItem.image}
              alt={cartItem.name}
              className="object-cover rounded shadow object-top"
              fill
            />
          </div>

          {/* details */}
          <div className="flex flex-col lg:flex-row w-full">
            <div className="p-5 flex flex-col text-gray-800 w-2/3">
              <h2 className="text-3xl font-bold">{cartItem.name}</h2>
              <p className="text-lg">Category :{cartItem.category}</p>
              <p className="text-lg">Brand :{cartItem.brand}</p>
              <p className="text-lg">
                {cartItem.rating} of {cartItem.numReviews} reviews
              </p>
              <p className="text-lg">{cartItem.description}</p>
            </div>

            {/* action */}
            <div className="m-5 rounded-lg border border-gray-200 shadow-md p-5 h-fit lg:w-full">
              <div className="justify-between flex mb-2">
                <div>Price</div>
                <div>${cartItem.price}</div>
              </div>

              <div className="justify-between flex mb-2">
                <div>Status</div>
                <div>
                  {cartItem.countInStock > 0 ? "In Stock" : "Unavailable"}
                </div>
              </div>

              {/* button add to cart */}
              <button
                onClick={handleAddCartItem}
                className="primary-button w-full disabled:bg-gray-300"
                //disabled={Boolean(cart.find((item) => item.id === cartItem.id))}
                disabled={isItemExist ? true : false}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NameDetails;
