import React from "react";
import { ProductType } from "@/app/Type/Type";
import Link from "next/link";

const CategoryProduct = ({ productList }: { productList: ProductType }) => {
  return (
    <Link href={`/category/${productList.slug}/${productList.id}`}>
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex gap-2 mb-2">
          <p className="text-4xl">{productList.image}</p>
          <div>
            <h2 className="text-lg font-bold">{productList.nameBn}</h2>
            <p className="text-xs">{productList.unit}</p>
          </div>
        </div>
        <div className="flex  items-center justify-between">
          <div>
            <p>আজকের দাম</p>
            <p>
              <span className="text-lg font-bold"> {productList.today} </span>{" "}
              টাকা
            </p>
          </div>
          <div>
            {productList.change.dir === "up" ? (
              <p className="text-red-500">
                <span>▲</span>
                <span>{productList.change.pct}%</span>
              </p>
            ) : productList.change.dir === "flat" ? (
              <p className="text-gray-500">
                <span>—</span>
                <span>{productList.change.pct}%</span>
              </p>
            ) : (
              <p className="text-green-800">
                <span>▼</span>
                <span>{productList.change.pct}%</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryProduct;
