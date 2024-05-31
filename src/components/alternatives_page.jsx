import Link from "next/link";
import Header from "./header";

export function AlternativesScreen() {
  const sustainableBrands = [
    {
      id: 1,
      name: "patagonia",
      description: "outdoor apparel made from recycled and organic materials",
      priceRange: "$50 - $300",
      link: "https://www.patagonia.com",
    },
    {
      id: 2,
      name: "everlane",
      description: "minimalist and ethically-produced clothing",
      priceRange: "$30 - $150",
      link: "https://www.everlane.com",
    },
    {
      id: 3,
      name: "reformation",
      description: "stylish and sustainable women's fashion",
      priceRange: "$80 - $300",
      link: "https://www.thereformation.com",
    },
    {
      id: 4,
      name: "outerknown",
      description: "surf-inspired apparel made from recycled materials",
      priceRange: "$100 - $400",
      link: "https://www.outerknown.com",
    },
    {
      id: 5,
      name: "eileen fisher",
      description: "timeless and eco-friendly women's clothing",
      priceRange: "$100 - $500",
      link: "https://www.eileenfisher.com",
    },
    {
      id: 6,
      name: "kotn",
      description: "affordable and organic cotton basics",
      priceRange: "$20 - $100",
      link: "https://www.kotn.com",
    },
    {
      id: 7,
      name: "amour vert",
      description: "sustainable and stylish women's fashion",
      priceRange: "$50 - $200",
      link: "https://www.amourvert.com",
    },
    {
      id: 8,
      name: "thought clothing",
      description: "eco-friendly and ethical apparel",
      priceRange: "$40 - $150",
      link: "https://www.wearethought.com",
    },
  ];

  return (
    <>
      <Header />
      <section className="w-full py-12">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="grid gap-6 md:gap-8">
            <div className="grid gap-1">
              <div className="flex items-center gap-2">
                <LeafIcon className="h-6 w-6 text-green-500" />
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  sustainable clothing brands
                </h2>
              </div>
              <p className="text-gray-500 dark:text-gray-400 max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                discover a range of eco-friendly and ethically-produced clothing
                options across different price points!
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sustainableBrands.map((brand) => (
                <div
                  key={brand.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-950"
                >
                  <div className="p-6 flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <ZapIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <Link
                        href={`${brand.link}`}
                        className="text-xl font-bold"
                        target="_blank"
                      >
                        {brand.name}
                      </Link>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                      {brand.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <TagIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <p className="text-gray-500 dark:text-gray-400 font-medium">
                        price range: {brand.priceRange}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
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

function TagIcon(props) {
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
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
    </svg>
  );
}

function ZapIcon(props) {
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
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  );
}
