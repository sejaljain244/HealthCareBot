import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";

import axios from "axios";

export default function Component() {
  const [chatLog, setChatLog] = useState<
    Array<{ chatPrompt?: string; botMessage?: string; id: string }>
  >([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [topic, setTopic] = useState("");

  useEffect(() => {
    // Parse the query string to get the inputValue
    const urlParams = new URLSearchParams(window.location.search);
    const inputValueFromURL = urlParams.get("inputValue");
    if (inputValueFromURL) {
      setTopic(inputValueFromURL);
    }
  }, []); // Run only once on component mount

  const formatResponse = (response: string) => {
    // Replace markdown-like syntax with HTML tags
    return response
      .replace(/\*{2}(.*?)\*{2}/g, "<strong>$1</strong>")
      .replace(/### (.*?)(?=\n|$)/g, "<h3>$1</h3>") // headings
      .replace(/(\d+)\. (.*?)(?=\n|$)/g, "<li>$2</li>") // numbered list items
      .replace(/### (.*?)(?=\n|$)/g, "<li>$1</li>"); // bullet points
  };

  const callResponseAPI = async () => {
    try {
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        {
          chatPrompt: inputValue,
          botMessage: undefined,
          id: Date.now().toString(),
        },
      ]);
      setInputValue("");
      setLoading(true);
      let requestBody;
      requestBody = {
        user_content: inputValue,
      };
      const response = await axios.post("/api/call1", requestBody);

      const formattedResponse = formatResponse(response.data.data.response);

      // Update the chatLog state with the new prompt and the API response
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        {
          chatPrompt: undefined,
          botMessage: formattedResponse || "No response from the API",
          id: Date.now().toString() + "r",
        },
      ]);

      setLoading(false); // Set loading to false after updating the chatLog
      console.log(formattedResponse);
      setThreadId(response.data.thread_id);
      return response;
    } catch (error) {
      setLoading(false); // Set loading to false in case of an error
      console.error("Error calling DB API:", error);
      throw error;
    }
  };

  const handleSend = async () => {
    if (inputValue) {
      await callResponseAPI();
    }
  };
  return (
    <div key="1" className="flex h-screen bg-white ">
      <aside className="w-80 bg-[#CFE5FD] border-r">
        <div className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl text-[#000] font-bold">ChatBot</h2>
          </div>
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-zinc-500 " />
            <Input
              className="pl-8"
              placeholder="Search messages..."
              type="search"
            />
          </div>
        </div>
      </aside>
      <section className="flex  flex-col w-full">
        <header className="border-b bg-[#CFE5FD]  p-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <div>Hi I'm your Personal Assistant</div>
          </h2>
        </header>
        <main className="flex-1 overflow-auto p-4">
          <div className="space-y-2">
            {chatLog.map((entry) => (
              <div
                key={entry.id}
                className={`border-radius flex rounded-3xl px-5 py-2 text-xl  ${
                  entry.chatPrompt ? "bg-zinc-100 w-max " : ""
                } items-end gap-2`}>
                <div
                  className={`rounded-lg ${
                    entry.chatPrompt ? "" : "text-black"
                  } p-2`}>
                  <p
                    className="text-base space-y-4"
                    dangerouslySetInnerHTML={{
                      __html: formatResponse(
                        entry.chatPrompt || entry.botMessage || ""
                      ),
                    }}></p>
                </div>
              </div>
            ))}
          </div>
        </main>
        <footer className="border-t  p-4">
          <div className="flex items-center gap-2">
            <Input
              className="flex-1"
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Spinner />
              </div>
            ) : (
              <Button variant={"ghost"} onClick={handleSend}>
                Send
              </Button>
            )}
          </div>
        </footer>
      </section>
    </div>
  );
}

function PencilIcon(props: React.SVGProps<SVGSVGElement>) {
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
      strokeLinejoin="round">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
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
      strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function SmileIcon(props: React.SVGProps<SVGSVGElement>) {
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
      strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  );
}
