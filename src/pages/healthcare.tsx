"use client";
import React, { useState, useLayoutEffect, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const healthcare = () => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    if (newValue.length <= 100) {
      setInputValue(newValue);
    }
  };

  const handleBoxClick = (text: string) => {
    setInputValue(text);
  };

  const callDBapi = async () => {
    try {
      setLoading(true);
      // let token = await getToken();
      let requestBody;

      requestBody = {
        prompt: inputValue,
      };

      const response = await axios.post(`/api/dbcreate`, requestBody, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + token,
        },
      });
      setLoading(false);
      console.log(response);
      return response;
    } catch (error) {
      setLoading(false);
      console.error("Error calling DB API:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await callDBapi();
      if (response && response.status === 200) {
        console.log(response);
        // Check if response exists before accessing status
        window.location.href = `/chatbot?inputValue=${encodeURIComponent(
          inputValue
        )}`;
      } else {
        toast.error("Failed to fetch data. Please try again later.");
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error("Failed to fetch data. Please try again later.");
    }
  };

  return (
    <div className=" overflow-y-hidden ">
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
      <div className="h-[92vh] bg-white  ">
        <div className="pl-24 container grid grid-cols-12 mx-auto ">
          <div className="flex flex-col mt-24 col-span-12 align-middle p-6 divide-y lg:col-span-6 lg:pl-10">
            <div className="pt-6 pb-4 space-y-2">
              <h1 className="text-3xl font-bold">
                Bot-Driven Health Diagnosis.
              </h1>
              <p>
                Utilize our bot to receive accurate health diagnoses based on
                vetted research papers.
              </p>
            </div>

            <div className="pt-6 pb-4 space-y-2">
              <h1 className="text-3xl font-bold">
                Summarized Concept Learning.
              </h1>
              <p>
                Engage with our bot to quickly grasp complex concepts distilled
                from authoritative research.
              </p>
            </div>
            <div className="pt-6 pb-4 space-y-2">
              <h1 className="text-3xl font-bold">
                Effortless Health Education.
              </h1>
              <p>
                Seamlessly access health education resources through our bot,
                powered by the latest research findings.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="overflow-hidden relative mt-[40px]">
                <textarea
                  id="message"
                  value={inputValue}
                  onChange={handleChange}
                  className="block p-2 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Type your topic of discussion here ..."
                  style={{ resize: "none" }}></textarea>

                {loading && (
                  <div className="absolute right-[15px] top-[10px] flex-column items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
                  </div>
                )}

                {!loading && (
                  <div className="absolute h-full right-[0px] top-[0px] flex-column items-center justify-center">
                    <button className="h-full bg-[#9c93ee] p-3">
                      Continue
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
          <div className="p-[120px] flex flex-col mt-3 col-span-12 align-middle  bg-no-repeat bg-cover lg:col-span-6 lg:h-auto">
            <img src="/healthcarepage.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default healthcare;
