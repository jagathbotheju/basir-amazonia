import data from "@/utils/data";
import Image from "next/image";
import ProductItem from "./components/ProductItem";
import { nanoid } from "nanoid";
import { getProducts } from "./actions/getProducts";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="mt-10 px-10">
      {!products ? (
        <div>Product not found</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {products.map((product: Product) => (
            <ProductItem product={product} key={nanoid()} />
          ))}
        </div>
      )}
    </main>
  );
}
