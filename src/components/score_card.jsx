import React, { useRef } from "react";

const ingredientsSustainability = {
  viscose:
    "derived from natural wood pulp, but involves chemical treatments that can harm the environment.",
  nylon:
    "synthetic fiber from petrochemicals, not sustainable. recycled nylon is a better option.",
  elastane:
    "synthetic fiber from petrochemicals, not sustainable. energy-intensive production.",
  polyester:
    "synthetic fiber from petroleum, not sustainable. recycled polyester is a better option.",
  cotton:
    "natural fiber, sustainable if organic. conventional cotton is resource-intensive.",
};

export default function ScoreCard({ score, title, color }) {
  const dialogRef = useRef(null);
  const newTitle = title.toLowerCase().trim();
  const content = ingredientsSustainability[newTitle];

  const handleOpenDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const handleCloseDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <>
      <div
        onClick={handleOpenDialog}
        className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg cursor-pointer"
      >
        <div className={`text-6xl font-bold ${color}`}>{score}%</div>
        <p className="text-gray-500 dark:text-gray-200">{newTitle}</p>
      </div>

      <dialog
        ref={dialogRef}
        className="rounded-lg p-6 shadow-lg bg-white dark:bg-gray-800 max-w-md w-full"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-bold ${color}`}>
            {newTitle} sustainability
          </h2>
          <button
            onClick={handleCloseDialog}
            className="text-xl font-bold text-gray-500 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-400"
          >
            &times;
          </button>
        </div>
        <p className="text-gray-700 dark:text-gray-300">{content}</p>
      </dialog>
    </>
  );
}
