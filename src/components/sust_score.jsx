"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function SustScore({ score, brand }) {
  let progressColor;
  if (score >= 71 && score <= 100) {
    progressColor = "bg-green-500";
  } else if (score >= 30 && score <= 70) {
    progressColor = "bg-yellow-500";
  } else {
    progressColor = "bg-red-500";
  }
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>sustainability score</CardTitle>
        <CardDescription className="mt-2">
          this score represents the overall sustainability of {brand}'s
          operations
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LeafIcon className="h-6 w-6 text-green-500" />
            <span className="font-medium">sustainability score</span>
          </div>
          <span className="font-bold text-2xl">{score}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className={`${progressColor} h-2.5 rounded-full`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
        <div className="grid grid-cols-3 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span>excellent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-yellow-500" />
            <span>average</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-500" />
            <span>poor</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LeafIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}
