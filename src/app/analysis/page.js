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

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 dark:bg-black p-4 md:p-8">
        <SustScore score={rating} brand={brand} />
        <div className="mt-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {materials.split(",").map((material, index) => {
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
                    image="/placeholder.svg"
                    heading="Eco-Friendly Clothing"
                    description="Sustainable fashion brand using organic and recycled materials."
                  />
                </CarouselItem>
                <CarouselItem>
                  <EcoCard
                    image="/placeholder.svg"
                    heading="Sustainable Electronics"
                    description="Energy-efficient and ethically-sourced electronics."
                  />
                </CarouselItem>
                <CarouselItem>
                  <EcoCard
                    image="/placeholder.svg"
                    heading="Eco-Friendly Household"
                    description="Sustainable home goods and cleaning products."
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
