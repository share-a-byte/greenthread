import { CardContent, Card } from "@/components/ui/card";
import Link from "next/link";

export default function EcoCard({ image, heading, description, link }) {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg">
      <CardContent className="flex flex-col items-center justify-center p-6 gap-4">
        <img
          alt="Alternative 3"
          className="rounded-full"
          height={100}
          src={image}
          style={{
            aspectRatio: "100/100",
            objectFit: "cover",
          }}
          width={100}
        />
        <div className="text-center space-y-2">
          <h3 className="font-bold text-lg dark:text-white">{heading}</h3>
          <p className="pb-2 text-gray-500 dark:text-gray-200">{description}</p>
          <Link
            className="text-green-500 hover:underline dark:text-green-400"
            href={link}
            target="_blank"
          >
            Visit Website
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
