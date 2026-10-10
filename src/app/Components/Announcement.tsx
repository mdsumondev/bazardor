import { error } from "console";
import React, { Suspense } from "react";
import { ProductType } from "../Type/Type";
import Marquee from "react-fast-marquee";

const loadAnnouncementData = async (): Promise<ProductType[]> => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/products",
    );

    if (res.ok) {
      const data = await res.json();
      return data.slice(0, 10);
    }

    throw new Error("Something going wrong");
  } catch {
    console.log(error);
  }
};

const Announcement = async () => {
  const products = await loadAnnouncementData();
  return (
    <div className="border border-t-gray-300 border-b-gray-300 py-2 ">
      <Suspense>
        <Marquee>
          {products.map((product) => {
            return (
              <div key={product.id} className="flex items-center gap-1 mx-5">
                <p className="text-base">{product.image}</p>
                <p className="text-base">{product.nameBn} </p>
                <p className="text-base">
                  {product.today} টাকা/
                  {product.unit === "kg"
                    ? "কেজি"
                    : product.unit === "litre"
                      ? "লিটার"
                      : product.unit === "dozen"
                        ? "ডজন"
                        : product.unit === "piece"
                          ? "পিস"
                          : product.unit}
                </p>
                <p>
                  {product.change.dir === "up" ? (
                    <p className="text-red-500">
                      <span>▲</span>
                      <span>{product.change.pct}%</span>
                    </p>
                  ) : product.change.dir === "flat" ? (
                    <p className="text-black">
                      <span className="text-lg font-medium pr-1">-</span>
                      <span>{product.change.pct}%</span>
                    </p>
                  ) : (
                    <p className="text-green-800">
                      <span>▼</span>
                      <span>{product.change.pct}%</span>
                    </p>
                  )}
                </p>
              </div>
            );
          })}
        </Marquee>
      </Suspense>
    </div>
  );
};

export default Announcement;
