import Image from "next/image";
import Hero from "./Components/Home/Hero";
import { promises } from "dns";
import { ProductType } from "./Type/Type";
import { error } from "console";
import { Suspense } from "react";
import CategoryProduct from "./Components/Categories/CategoryProduct";

const allProductsData = async (): promises<ProductType[]> => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/products",
    );
    if (res.ok) {
      const productData = await res.json();
      return productData;
    }
    throw new Error("Something going wrong");
  } catch {
    console.log(error);
  }
};

export default async function Home() {
  const allProducts = await allProductsData();

  const todayPriceIncrease = allProducts.filter(
    (product) => product.change.dir === "up",
  );

  const todayPriceDecrase = allProducts.filter(
    (product) => product.change.dir === "down",
  );

  console.log(todayPriceDecrase);

  return (
    <div className="bg-[#E1E8E1] px-5 pt-5 pb-5">
      <section>
        <Hero />
      </section>

      <section className="container mx-auto my-10">
        <h2 className="text-2xl font-bold my-5">
          {" "}
          <span className="text-red-700">▲</span> আজ দাম বেড়েছে
        </h2>
        <div className="grid lg:grid-cols-3  grid-cols-1 gap-5">
          <Suspense fallback="<h1> Loading... </h1>">
            {todayPriceIncrease.slice(0, 6).map((productList) => (
              <CategoryProduct key={productList.id} productList={productList} />
            ))}
          </Suspense>
        </div>
      </section>
      <section className="container mx-auto my-10">
        <h2 className="text-2xl font-bold my-5">
          <span className="text-green-800">▼</span> আজ দাম কমেছে
        </h2>
        <div className="grid lg:grid-cols-3  grid-cols-1 gap-5">
          <Suspense fallback="<h1> Loading... </h1>">
            {todayPriceDecrase.slice(0, 6).map((productList) => (
              <CategoryProduct key={productList.id} productList={productList} />
            ))}
          </Suspense>
        </div>
      </section>

      <section className="container mx-auto my-10">
        <h2 className="text-2xl font-bold my-1">সব পণ্য</h2>
        <p className="text-base mb-5">
          মোট {allProducts.length}টি পণ্য দেখানো হচ্ছে
        </p>
        <div className="grid lg:grid-cols-3  grid-cols-1 gap-5">
          <Suspense fallback="<h1> Loading... </h1>">
            {allProducts.map((productList) => (
              <CategoryProduct key={productList.id} productList={productList} />
            ))}
          </Suspense>
        </div>
      </section>
    </div>
  );
}
