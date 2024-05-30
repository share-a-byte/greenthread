import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../basic_ui/carousel";
import CustomCard from "./card";

export default function CustomCarousel() {
  return (
    <Carousel className="w-full max-w-3xl animate-fade-in">
      <CarouselContent>
        <CarouselItem>
          <CustomCard
            image="https://naadam.co/cdn/shop/files/WE02145-Original-Cashmere-Sweater-Oatmeal_2860_1440x.jpg?v=1715024986"
            brand_name="Nadaam"
          />
        </CarouselItem>
        <CarouselItem>
          <CustomCard
            image="https://naadam.co/cdn/shop/files/WE02145-Original-Cashmere-Sweater-Oatmeal_2860_1440x.jpg?v=1715024986"
            brand_name="Nadaam"
          />
        </CarouselItem>
        <CarouselItem>
          <CustomCard
            image="https://naadam.co/cdn/shop/files/WE02145-Original-Cashmere-Sweater-Oatmeal_2860_1440x.jpg?v=1715024986"
            brand_name="Nadaam"
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
