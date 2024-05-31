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
  const url = searchParams.get("url");

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

  const getAlternatives = (url) => {
    switch (url) {
      case "https://www.primark.com/en-us/p/kem-t-shirt-black-991095666804":
        return "black shirt";
      case "https://oldnavy.gap.com/browse/product.do?pid=811395062&cid=1035712&pcid=1035712&vid=1&nav=hamnav%3AWomen%3AShop%20Women%27s%20Categories%3AT-shirts&cpos=12&cexp=2926&kcid=CategoryIDs%3D1035712&cvar=26331&ctype=Listing&cpid=res24053107552485800139832&ccam=34326#pdp-page-content":
        return "white shirt";
      case "https://www.uniqlo.com/us/en/products/E462883-000/00?colorDisplayCode=02&sizeDisplayCode=004":
        return "sweatpants";
      default:
        return "white shirt";
    }
  };

  const alternatives_choice = getAlternatives(url);

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
                {alternatives[alternatives_choice][0]}
                {alternatives[alternatives_choice][1]}
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

const alternatives = {
  "white shirt": [
    <CarouselItem>
      <EcoCard
        image="https://www.honest-basics.com/cdn/shop/files/HonestBasicsHB-19030basict-shirtwomenwhite1_600x.jpg?v=1695657418"
        heading="honest basics"
        description="this product is made up of 100% cotton, with 70% being recycled cotton!"
        link="https://www.honest-basics.com/products/t-shirt-white-womens?pr_prod_strat=e5_desc&pr_rec_id=51bf3a38f&pr_rec_pid=1430115614787&pr_ref_pid=1430121185347&pr_seq=uniform"
      />
    </CarouselItem>,
    <CarouselItem>
      <EcoCard
        image="https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw3b162464/images/hi-res/37696_BCW_AN3.jpg?sw=512&sh=512&sfrm=png&q=95&bgcolor=f5f5f5"
        heading="patagonia"
        description="with 100% cotton content, this piece will last you a long time, and won't leech microplastics"
        link="https://eu.patagonia.com/gb/en/product/womens-sunrise-rollers-organic-easy-cut-tee/37696.html?dwvar_37696_color=PFGD&cgid=womens"
      />
    </CarouselItem>,
  ],
  sweatpants: [
    <CarouselItem>
      <EcoCard
        image="https://us.organicbasics.com/cdn/shop/products/dg_organic_basics-women-organic_cotton-merch-sweatpants-grey_melange-studio-1.jpg?v=1707138452&width=600"
        heading="organic basics"
        description="this piece is made of 100% organic cotton, which uses no harmful pesticides"
        link="https://us.organicbasics.com/collections/mens-bottoms/products/organic-cotton-merch-sweatpants-grey-melange?variant=49046385033543"
      />
    </CarouselItem>,
  ],
  "black shirt": [
    <CarouselItem>
      <EcoCard
        image="https://www.honest-basics.com/cdn/shop/files/HB-19034HonestBasicsregularmen_st-shirtblack4_800x.jpg?v=1716540612"
        heading="organic basics"
        description="this piece is made completely of organic and recycled cotton"
        link="https://www.honest-basics.com/collections/t-shirts-men/products/mens-t-shirt-white?variant=12828838199363"
      />
    </CarouselItem>,
    <CarouselItem>
      <EcoCard
        image="https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwcee24a45/images/hi-res/45215_FEA_JNF1.jpg?sw=512&sh=512&sfrm=png&q=95&bgcolor=f5f5f5"
        heading="patagonia"
        description="this piece is made of all recycled materials, and is very durable"
        link="https://www.patagonia.com/product/mens-capilene-cool-daily-shirt/45215.html?dwvar_45215_color=FEA"
      />
    </CarouselItem>,
  ],
};
