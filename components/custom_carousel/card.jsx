import { Card, CardContent } from "../basic_ui/card";
import Link from "next/link";

export default function CustomCard({ image, brand_name }) {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg animate-slide-in-left">
      <CardContent className="flex flex-col items-center justify-center p-6 gap-4">
        <img
          alt="Alternative 1"
          className="rounded-full"
          height={140}
          src={image}
          style={{
            aspectRatio: "100/100",
            objectFit: "cover",
          }}
          width={140}
        />
        <div className="text-center space-y-2">
          <h3 className="font-bold text-lg dark:text-white">{brand_name}</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Sustainable fashion brand using organic and recycled materials.
          </p>
          <h1></h1>
          <Link
            className="text-green-500 hover:underline dark:text-green-400"
            href="#"
          >
            Visit Website
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
