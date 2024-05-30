import CustomCarousel from "./custom_carousel/carousel";

export default function Score() {
  return (
    <div className="mt-12 space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg animate-scale-up">
          <div className="text-6xl font-bold text-green-500">85</div>
          <p className="text-gray-500 dark:text-gray-400">Energy Efficiency</p>
        </div>
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg animate-scale-up">
          <div className="text-6xl font-bold text-blue-500">92</div>
          <p className="text-gray-500 dark:text-gray-400">Waste Reduction</p>
        </div>
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg animate-scale-up">
          <div className="text-6xl font-bold text-indigo-400">78</div>
          <p className="text-gray-500 dark:text-gray-400">Ethical Sourcing</p>
        </div>
      </div>
      <CustomCarousel />
    </div>
  );
}
