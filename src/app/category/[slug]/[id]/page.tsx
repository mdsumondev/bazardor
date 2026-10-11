import React, { Suspense } from "react";
import Link from "next/link";
import { ProductType } from "@/app/Type/Type";

const loadSingleProduct = async (id: string): Promise<ProductType> => {
  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products/${id}`,
  );

  if (!res.ok) {
    throw new Error("Product data could not be loaded");
  }

  return res.json();
};

const getUnitName = (unit: string) => {
  const units: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };

  return units[unit] ?? unit;
};

async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const product = await loadSingleProduct(id);

  const {
    nameBn,
    image,
    today,
    yesterday,
    unit,
    change,
    markets,
    categoryNameBn,
    slug,
  } = product;

  const minPrice = Math.min(...markets.map((market) => market.min));

  const maxPrice = Math.max(...markets.map((market) => market.max));

  const minPriceMarket = markets.find((market) => market.min === minPrice);

  const maxPriceMarket = markets.find((market) => market.max === maxPrice);

  const marketData = markets.map((market) => ({
    ...market,
    avg: (market.min + market.max) / 2,
  }));

  const averagePrice =
    marketData.length > 0
      ? marketData.reduce((total, market) => total + market.avg, 0) /
        marketData.length
      : 0;

  const unitName = getUnitName(unit);

  return (
    <div className=" bg-[#E1E8E1] flex justify-center py-5 ">
      <div className="container mx-auto">
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-5">
          <Link href="/" className="hover:underline">
            হোম
          </Link>
          <span>&gt;</span>
          <Link href={slug} className="hover:underline">
            {categoryNameBn ?? "চাল"}
          </Link>
          <span>&gt;</span>
          <span className="text-gray-700 font-medium">{nameBn}</span>
        </nav>

        <div className="bg-[#f8fbf8] rounded-2xl p-6 sm:p-8 shadow-sm border mb-5 border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center gap-5">
            <div className=" bg-[#edf2ee] rounded-2xl flex items-center justify-center p-2 shrink-0">
              <span className="text-3xl">{image}</span>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                {nameBn}
              </h1>

              <p className="text-xs text-gray-500 font-medium">
                প্রতি {unitName}
              </p>

              <p className="text-xs text-gray-500 font-medium">
                {change.dir === "up" ? (
                  <>গতকালের তুলনায় আজ দাম বেড়েছে {today - yesterday} টাকা</>
                ) : change.dir === "down" ? (
                  <>গতকালের তুলনায় আজ দাম কমেছে {yesterday - today} টাকা</>
                ) : (
                  <>গতকালের তুলনায় দামের পরিবর্তন হয়নি</>
                )}
              </p>
            </div>
          </div>

          <div className=" text-center min-w-[140px]  flex sm:flex-col justify-between sm:justify-center items-center">
            <div className="text-left sm:text-center bg-white rounded-md mb-5">
              <span className="text-[11px] font-semibold text-gray-500 block">
                আজকের দাম
              </span>

              <span className="text-3xl font-black text-gray-900 block my-0.5">
                {today}
              </span>

              <span className="text-[11px] text-gray-500 block">
                টাকা / {unitName}
              </span>
            </div>

            <div className="flex items-center justify-center gap-1 text-xs font-bold text-red-500">
              {change.dir === "up" ? (
                <p className="text-red-500 flex items-center gap-0.5">
                  <span className="text-[10px]">▲</span> {change.pct}%
                </p>
              ) : change.dir === "down" ? (
                <p className="text-emerald-600 flex items-center gap-0.5">
                  <span className="text-[10px]">▼</span> {change.pct}%
                </p>
              ) : (
                <p className="text-gray-600">— {change.pct}%</p>
              )}
            </div>
          </div>
        </div>

        <div className="">
          <section className="bg-[#f8fbf8]  rounded-2xl p-6 sm:p-8 shadow-sm mb-5">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              দামের সারসংক্ষেপ
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Minimum Price */}
              <div className="bg-[#edf2ee]/50 border border-gray-100 rounded-xl p-4 space-y-1.5">
                <p className="text-xs text-gray-500 font-medium">
                  সর্বনিম্ন দাম
                </p>

                <div className="text-2xl font-bold text-emerald-600">
                  {minPrice}{" "}
                  <span className="text-xs font-normal text-gray-700">
                    টাকা
                  </span>
                </div>

                <p className="text-xs text-gray-500">
                  {minPriceMarket?.market ?? "তথ্য নেই"}
                </p>
              </div>

              <div className="bg-[#edf2ee]/50 border border-gray-100 rounded-xl p-4 space-y-1.5">
                <p className="text-xs text-gray-500 font-medium">
                  সর্বোচ্চ দাম
                </p>

                <div className="text-2xl font-bold text-red-500">
                  {maxPrice}{" "}
                  <span className="text-xs font-normal text-gray-700">
                    টাকা
                  </span>
                </div>

                <p className="text-xs text-gray-500">
                  {maxPriceMarket?.market ?? "তথ্য নেই"}
                </p>
              </div>

              {/* Average Price */}
              <div className="bg-[#edf2ee]/50 border border-gray-100 rounded-xl p-4 space-y-1.5">
                <p className="text-xs text-gray-500 font-medium">গড় দাম</p>

                <div className="text-2xl font-bold text-emerald-700">
                  {averagePrice.toFixed(0)}{" "}
                  <span className="text-xs font-normal text-gray-700">
                    টাকা
                  </span>
                </div>

                <p className="text-xs text-gray-500">
                  প্রতি {unitName}-এর হিসাব
                </p>
              </div>
            </div>
          </section>

          <section className="bg-[#f8fbf8]  rounded-2xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <div className="">
              <table className="text-left text-sm w-full border-collapse">
                <thead>
                  <tr className="bg-[#edf2ee]/60 text-gray-700 text-base border-b border-b-gray-600 font-bold">
                    <th className="py-3 px-4">বাজার</th>
                    <th className="py-3 px-4">বিভাগ</th>
                    <th className="py-3 px-4 text-center">সর্বনিম্ন</th>
                    <th className="py-3 px-4 text-center">সর্বোচ্চ</th>
                    <th className="py-3 px-4 text-right">গড়</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100/70 text-xs sm:text-sm text-gray-800">
                  {marketData.map((row) => (
                    <tr
                      key={`${row.market}-${row.division}`}
                      className="hover:bg-[#edf2ee]/40 transition-colors border-b border-b-gray-300"
                    >
                      <td className="py-3.5 px-4 font-semibold whitespace-nowrap text-gray-900">
                        {row.market}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap text-gray-600">
                        {row.division}
                      </td>

                      <td className="py-3.5 px-4 text-center whitespace-nowrap text-gray-800 font-medium">
                        {row.min} টাকা
                      </td>

                      <td className="py-3.5 px-4 text-center whitespace-nowrap text-gray-800 font-medium">
                        {row.max} টাকা
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap font-bold text-gray-900">
                        {Number.isInteger(row.avg)
                          ? row.avg
                          : row.avg.toFixed(2)}{" "}
                        টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
