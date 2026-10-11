import React, { Suspense } from "react";
import { ProductType } from "../Type/Type";
import Marquee from "react-fast-marquee";

const loadAnnouncementData = async (): Promise<ProductType[]> => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      next: {
        revalidate: 60,
      },
    },
  );

  if (res.ok) {
    const data: ProductType[] = await res.json();
    return data.slice(0, 10);
  }

  throw new Error("Something going wrong");
};

const Announcement = async (): Promise<React.JSX.Element> => {
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
                    <span className="text-red-500">
                      <span>▲</span>
                      <span>{product.change.pct}%</span>
                    </span>
                  ) : product.change.dir === "flat" ? (
                    <span className="text-gray-500">
                      <span>—</span>
                      <span>{product.change.pct}%</span>
                    </span>
                  ) : (
                    <span className="text-green-800">
                      <span>▼</span>
                      <span>{product.change.pct}%</span>
                    </span>
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
