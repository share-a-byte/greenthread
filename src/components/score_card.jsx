export default function ScoreCard({ score, title, color }) {
  return (
    <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className={`text-6xl font-bold text-${color}`}>{score}</div>
      <p className="text-gray-500 dark:text-gray-400">{title}</p>
    </div>
  );
}
