import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CardContent, Card } from "@/components/ui/card";
import {
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
  Carousel,
} from "@/components/ui/carousel";
import EcoCard from "./eco_card";
import ScoreCard from "./score_card";

export function Analyzer() {
  return (
    <>
      <header className="bg-gray-800 text-white py-3 px-4 md:px-8 flex items-center justify-between">
        <Link className="text-2xl font-medium" href="#">
          greenthread
        </Link>
        <div className="flex items-center space-x-4">
          <Button>Login</Button>
          <Button variant="secondary">Sign Up</Button>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 dark:bg-black p-4 md:p-8">
        <div className="max-w-3xl w-full">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-center md:text-4xl dark:text-white">
              Sustainability Score Generator
            </h1>
            <p className="text-gray-500 dark:text-gray-200 text-center">
              Enter a URL to get a sustainability score and discover more
              eco-friendly alternatives.
            </p>
            <div className="flex items-center justify-center space-x-2">
              <Input
                className="flex-1 max-w-md"
                dark
                placeholder="Enter a URL"
                type="text"
              />
              <Button dark>Generate Score</Button>
            </div>
          </div>
          <div className="mt-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ScoreCard
                score="85"
                title="Energy Efficiency"
                color="green-500"
              />
              <ScoreCard score="92" title="Waste Reduction" color="blue-500" />
              <ScoreCard
                score="69"
                title="Ethical Sourcing"
                color="indigo-300"
              />
            </div>
            <Carousel className="w-full max-w-3xl">
              <CarouselContent>
                <CarouselItem>
                  <EcoCard
                    image="/placeholder.svg"
                    heading="Eco-Friendly Clothing"
                    description="Sustainable fashion brand using organic and recycled
                        materials."
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
