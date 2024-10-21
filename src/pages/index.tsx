import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function App() {
  return (
    <div className="bg-white w-screen overflow-x-hidden">
      <header className="px-36 h-[8vh] bg-[#9c93ee]">
        <div className="container flex justify-between align-middle mx-auto">
          <a
            rel="noopener noreferrer"
            href="/"
            aria-label="Back to homepage"
            className="flex items-center p-2">
            <h1 className="font-bold text-3xl">ChatBot</h1>
          </a>
          <ul className="items-stretch hidden space-x-3 md:flex">
            <li className="flex">
              <a
                rel="noopener noreferrer"
                href="/"
                className="flex items-center px-4 font-medium text-lg ">
                Home
              </a>
            </li>
            <li className="flex">
              <a
                rel="noopener noreferrer"
                href="/healthcare"
                className="flex items-center px-4 font-medium text-lg  ">
                Product
              </a>
            </li>
            <li className="flex">
              <a
                rel="noopener noreferrer"
                href="#"
                className="flex items-center px-4 font-medium text-lg  ">
                About us
              </a>
            </li>
          </ul>
          <button className="flex justify-end p-4 md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </header>
      <header className="h-[90vh] flex flex-col lg:flex-row items-center justify-between  max-w-7xl mx-auto">
        <div className=" px-6 py-24 lg:w-1/2 flex flex-col justify-around">
          <div>
            <h1 className="text-6xl text-black font-bold leading-tight">
              Get better with Chat
            </h1>
            <h1
              className="text-6xl w-max-content bg-gradient-to-r from-sky-300 to-slate-50 text-black font-bold leading-tight rounded-lg flex align-middle"
              style={{
                background:
                  "linear-gradient(90deg, #9c93ee 0%, rgba(255,255,255,1) 47%)",
              }}>
              Responses
            </h1>
          </div>
          <p className="text-gray-600 mt-10">
            Presenting a ChatBot, an that makes use od OpenAi api's and a lambda
            function to trigger chats and repsonds to user queries.
          </p>
          <div className="space-y-4 space-x-4">
            <Button
              onClick={() => {
                window.location.href = "/chatbot";
              }}
              variant="destructive">
              Get started
            </Button>
            <Button variant="outline">How it works?</Button>
          </div>
        </div>
        <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center">
          <img
            alt="Healthcare CRM Illustration"
            className=""
            src="/image.png"
            width="600"
          />
        </div>
      </header>
    </div>
  );
}
