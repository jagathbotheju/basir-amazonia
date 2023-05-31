"use client";
import useCart from "@/store/store";
import data from "@/utils/data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Props {
  params: {
    slug: string;
  };
}

const ProductPage = ({ params }: Props) => {
  const router = useRouter();
  const addCartItem = useCart((state) => state.addCartItem);
  const cart = useCart((state) => state.cart);
  const product = data.products.find(
    (product: Product) => product.slug === params.slug
  ) as Product;

  const cartItem: CartItem = {
    ...product,
    quantity: 1,
  };

  const isItemExist = cart.find((item) => item.id === cartItem.id);
  const handleAddCartItem = () => {
    if (isItemExist) return toast.error("Item already exist in your Cart");
    addCartItem(cartItem);
    router.push("/");
  };

  return (
    <div className="mt-10 px-10 h-full">
      {!product ? (
        <>
          <h2 className="mt-10 mx-auto px-20 bg-red-200 text-center py-20 rounded-lg text-2xl font-bold">
            Product Data not Found!
          </h2>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 w-full min-h-full bg-gray-100">
          {/* image */}
          <div className="relative w-full h-full rounded-lg aspect-square">
            <Image
              src={product.image}
              alt={product.name}
              className="object-cover rounded shadow object-top"
              fill
            />
          </div>

          {/* details */}
          <div className="flex flex-col lg:flex-row w-full">
            <div className="p-5 flex flex-col text-gray-800 w-2/3">
              <h2 className="text-3xl font-bold">{product.name}</h2>
              <p className="text-lg">Category :{product.category}</p>
              <p className="text-lg">Brand :{product.brand}</p>
              <p className="text-lg">
                {product.rating} of {product.numReviews} reviews
              </p>
              <p className="text-lg">{product.description}</p>
            </div>

            {/* action */}
            <div className="m-5 rounded-lg border border-gray-200 shadow-md p-5 h-fit lg:w-full">
              <div className="justify-between flex mb-2">
                <div>Price</div>
                <div>${product.price}</div>
              </div>

              <div className="justify-between flex mb-2">
                <div>Status</div>
                <div>
                  {product.countInStock > 0 ? "In Stock" : "Unavailable"}
                </div>
              </div>

              {/* button add to cart */}
              <button
                onClick={handleAddCartItem}
                className="primary-button w-full disabled:bg-gray-300"
                disabled={Boolean(isItemExist)}
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

export default ProductPage;
