import { Button } from "./basic_ui/button";
import Link from "next/link";
import Score from "./scores";
import { Input } from "./basic_ui/input";

export function Analyzer() {
  return (
    <>
      <header className="bg-slate-800 text-white py-3 px-4 md:px-8 flex items-center justify-between">
        <Link className="text-2xl font-medium" href="#">
          greenthread
        </Link>
        <div className="flex items-center space-x-4">
          <Button>Login</Button>
          <Button variant="secondary">Sign Up</Button>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 dark:bg-slate-950 p-4 md:p-8">
        <div className="max-w-3xl w-full">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-center md:text-4xl dark:text-white animate-fade-in">
              let's score it!
            </h1>
            <p className="text-gray-500 dark:text-gray-200 text-center animate-fade-in text-lg">
              any clothes you've had your eye on? give us the url or picture,
              and we'll give you a holistic rating!
            </p>
            <div className="flex items-center justify-center space-x-2 animate-fade-in">
              <Input
                className="flex-1 max-w-md"
                dark
                placeholder="Enter a URL"
                type="text"
              />
              <Button dark>generate score</Button>
            </div>
          </div>
          <Score />
        </div>
      </main>
    </>
  );
}
