"use client";

import EcoCard from "@/components/eco_card";
import Header from "@/components/header";
import ScoreCard from "@/components/score_card";
import SustScore from "@/components/sust_score";
import {
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
  Carousel,
} from "@/components/ui/carousel";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const brand = searchParams.get("brand");
  const type = searchParams.get("type");
  const materials = JSON.stringify(searchParams.get("materials"));
  const rating = searchParams.get("rating");
  const colors = ["text-emerald-300", "text-indigo-300", "text-pink-300"];
  const materialArray = materials.split(",");

  const getGridColumnsClass = (length) => {
    switch (length) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-3";
      default:
        return "grid-cols-4";
    }
  };

  return (
    <>
      <Header />
      <main className="flex flex-col items-center  w-full min-h-screen bg-gray-100 dark:bg-black p-4 md:p-8">
        <SustScore score={rating} brand={brand} />
        <div className="mt-12 space-y-8">
          <div
            className={`grid ${getGridColumnsClass(
              materialArray.length
            )} gap-6`}
          >
            {materialArray.map((material, index) => {
              const [percent, material_name] = material
                .replace(/["%]/g, "")
                .split(":");
              return (
                <ScoreCard
                  score={`${percent}`}
                  title={`${material_name}`}
                  color={`${colors[index % colors.length]}`}
                />
              );
            })}
          </div>
          <div className="flex justify-center w-full">
            <Carousel className="w-full max-w-3xl">
              <CarouselContent>
                <CarouselItem>
                  <EcoCard
                    image="https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw3b162464/images/hi-res/37696_BCW_AN3.jpg?sw=512&sh=512&sfrm=png&q=95&bgcolor=f5f5f5"
                    heading="patagonia"
                    description="with 100% cotton content, this piece will last you a long time, and won't leech microplastics"
                    link="https://eu.patagonia.com/gb/en/product/womens-sunrise-rollers-organic-easy-cut-tee/37696.html?dwvar_37696_color=PFGD&cgid=womens"
                  />
                </CarouselItem>
                <CarouselItem>
                  <EcoCard
                    image="https://us.organicbasics.com/cdn/shop/products/dg_organic_basics-women-organic_cotton-merch-sweatpants-grey_melange-studio-1.jpg?v=1707138452&width=600"
                    heading="organic basics"
                    description="this piece is made of 100% organic cotton, which uses no harmful pesticides"
                    link="https://us.organicbasics.com/collections/mens-bottoms/products/organic-cotton-merch-sweatpants-grey-melange?variant=49046385033543"
                  />
                </CarouselItem>
                <CarouselItem>
                  <EcoCard
                    image="https://www.honest-basics.com/cdn/shop/files/HonestBasicsHB-19030basict-shirtwomenwhite1_600x.jpg?v=1695657418"
                    heading="honest basics"
                    description="this product is made up of 100% cotton, with 70% being recycled cotton!"
                    link="https://www.honest-basics.com/products/t-shirt-white-womens?pr_prod_strat=e5_desc&pr_rec_id=51bf3a38f&pr_rec_pid=1430115614787&pr_ref_pid=1430121185347&pr_seq=uniform"
                  />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </main>
    </>
  );
}
