"use client";
import React, { useState } from "react";

const Preferences = () => {
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("UTC (GMT+0)");
  const [theme, setTheme] = useState("light");

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle save logic here
    console.log({ language, timezone, theme });
  };

  return (
    <div className="bg-white overflow-x-hidden h-screen w-screen">
      <div className="bg-white p-4 lg:ml-90 md:ml-60 sm:ml-45 lg:w-[980px] md:w-[600px] sm:w-[480px] text-gray-500">
        <div className="flex items-center justify-between mb-10">
            {/* Title */}
            <h1 className="text-[30px] text-gray-800">Preferences</h1>
            <button className="text-[#1E3A8A]">
                <img src="/favicon.ico" alt="S3TUDY" className='w-[55px] h-[55px]' />
                <p className='-ml-[145px] -mt-[42px] hover:cursor-pointer text-[20px]'>← Back</p>
            </button>    
        </div>       

        <form onSubmit={handleSave} className="space-y-10">
          {/* Language Selection */}
          <div className="flex flex-col space-y-2">
            <label
              className="text-lg font-medium text-gray-700"
              htmlFor="language"
            >
              Language
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="English">English</option>
              <option value="Khmer">Khmer</option>
              {/* Add more languages as needed */}
            </select>
          </div>

          {/* Timezone Selection */}
          <div className="flex flex-col space-y-2">
            <label
              className="text-lg font-medium text-gray-700"
              htmlFor="timezone"
            >
              Time Zone
            </label>
            <div className="rounded-[10px] border-2 p-3 py-3 border-gray-300">
                <p>
                    UTC (GMT+7)
                </p>
            </div>
          </div>

          {/* Theme Selection */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700 mb-5">Theme</label>
            <div className="flex items-center  justify-evenly gap-5">

              <div className="flex items-center p-3 py-5 rounded-[10px] bg-gray-200 w-[400px] justify-center">
                <input
                  type="radio"
                  id="light"
                  name="theme"
                  value="light"
                  checked={theme === "light"}
                  onChange={() => setTheme("light")}
                  className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500 transition"
                />
                <label htmlFor="light" className="text-gray-600 ml-2">
                  Light
                </label>
              </div>

              <div className="flex items-center justify-center p-3 py-5 rounded-[10px] bg-gray-200 w-[400px] ">
                <input
                  type="radio"
                  id="dark"
                  name="theme"
                  value="dark"
                  checked={theme === "dark"}
                  onChange={() => setTheme("dark")}
                  className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500 transition"
                />
                <label htmlFor="dark" className="text-gray-600 ml-2">
                  Dark
                </label>
              </div>
              
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Preferences;
