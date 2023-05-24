import { Card } from "@tremor/react";
import Image from "next/image";

interface Props {
  product: Product;
}

const ProductItem = ({ product }: Props) => {
  return (
    <div className="mb-5 block rounded-lg border border-gray-200 shadow-md w-full md:max-w-xs">
      <div className="relative w-full md:max-w-xs h-[200px] rounded-lg">
        <Image
          src={product.image}
          alt={product.name}
          className="object-cover rounded shadow object-top"
          fill
        />
      </div>

      <div className="flex items-center justify-center p-5 flex-col">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p>{product.brand}</p>
        <p>${product.price}</p>
        <button type="button" className="primary-button">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
