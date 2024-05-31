"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./header";
import Loader from "./loading";

export function Analyzer() {
  const [loading, setLoading] = useState(false);
  const [url, setURL] = useState("");
  const router = useRouter();

  async function check_url() {
    setLoading(true);

    try {
      const response = await fetch(
        `http://127.0.0.1:5003/scrape?url=${encodeURIComponent(url)}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("API response", data);

      // Route to the results page with the received data
      router.push(
        `/analysis?brand=${data["brand"]}&type=${
          data["cloth_type"]
        }&materials=${data["materials"]}&rating=${
          data["sustainability_rating"]
        }&url=${encodeURIComponent(url)}`
      );
    } catch (error) {
      console.error("Error fetching score", error);
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 dark:bg-black p-4 md:p-8">
        {loading ? (
          <Loader />
        ) : (
          <div className="max-w-3xl w-full">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-center md:text-4xl dark:text-white">
                let's score it
              </h1>
              <p className="text-gray-500 dark:text-gray-200 text-center text-lg">
                looking at some cute clothes? just paste in the url to make sure
                its worth your money!
              </p>
              <div className="flex items-center justify-center space-x-2">
                <Input
                  onChange={(e) => setURL(e.target.value)}
                  className="flex-1 max-w-md"
                  dark
                  placeholder="Enter a URL"
                  type="text"
                />
                <button
                  onClick={check_url}
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    class="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
