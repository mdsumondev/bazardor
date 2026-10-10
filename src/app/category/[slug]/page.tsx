import { ProductType } from "@/app/Type/Type";
import { error } from "console";
import Image from "next/image";
import React, { Suspense } from "react";
import NavItem from "./../../Components/NavItem";
import CategoryProduct from "@/app/Components/Categories/CategoryProduct";

const categoriesProductsData = async (slug: string): Promise<ProductType[]> => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/bazardor/products?category=${slug}`,
    );
    if (res.ok) {
      const categoriesWiseProudcts = await res.json();
      return categoriesWiseProudcts;
    }
    throw new Error("data not found");
  } catch {
    console.log(error);
  }
};

const CategoryPage = async ({ params }: Promise<string | number>) => {
  const { slug } = await params;

  const categoreisproducts = await categoriesProductsData(slug);

  console.log("Categories wise proucts", categoreisproducts);

  return (
    <div className="bg-[#F0F5F0] py-10">
      <div className="container mx-auto px-5">
        <Suspense fallback="<h1> Loading .... </h1>">
          <div>
            <div className="flex items-center bg-white rounded-xl border my-5 border-gray-200 py-5 px-3">
              <p className="text-5xl">{categoreisproducts[0]?.categoryIcon}</p>
              <div>
                <h2 className="text-xl font-bold">
                  {categoreisproducts[0].categoryNameBn}
                </h2>
                <p>{categoreisproducts.length}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
              </div>
            </div>

            <div className="flex justify-end items-center  bg-white rounded-xl border my-6 border-gray-200 py-5 px-3">
              <label htmlFor="itemSort" className="text-base mr-2">
                সাজান
              </label>
              <select
                name="sort"
                id="itemSort"
                className="border border-b-black rounded-sm px-1 py-2"
              >
                <option value="">ডিফল্ট</option>
                <option value="low to high">দাম: কম থেকে বেশি</option>
                <option value="hight to low">দাম: বেশি থেকে কম</option>
              </select>
            </div>

            <p className="mb-3">
              মোট {categoreisproducts.length}টি পণ্য দেখানো হচ্ছে
            </p>

            <div className="grid lg:grid-cols-3  grid-cols-1 gap-5">
              {categoreisproducts.map((productList) => (
                <CategoryProduct
                  productList={productList}
                  key={productList.id}
                />
              ))}
            </div>
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default CategoryPage;
