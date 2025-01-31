import React from "react";
import { useThemeStore } from "../store/useThemeStore"; // Import your store
import { THEMES } from "../constants"; // Assuming your themes are stored here

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore(); // Access current theme and setter function

  const handleThemeChange = (event) => {
    const selectedTheme = event.target.value;
    setTheme(selectedTheme); // Change the theme
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-10 sm:py-12 lg:py-16">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-4 text-center">Settings</h1>

      {/* Theme Selection Dropdown */}
      <div className="mb-8 w-full sm:w-72 md:w-96">
        <label className="text-lg sm:text-xl">Select Theme: </label>
        <select
          className="w-full p-2 mt-2 border rounded-lg text-gray-700"
          value={theme}
          onChange={handleThemeChange}
        >
          {THEMES.map((themeOption) => (
            <option key={themeOption} value={themeOption}>
              {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Chat Theme Preview Section */}
      <div className="w-full max-w-4xl h-[500px] sm:h-[400px] lg:h-[500px] bg-base-200 rounded-lg shadow-xl overflow-hidden transition-all duration-500 ease-in-out">
        {/* Chat Container */}
        <div className="flex flex-col h-full bg-base-100">
          <div className="flex-grow p-4 overflow-y-scroll">
            {/* Sample Chat Messages */}
            <div className="flex items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
              <div className="flex flex-col">
                <div className="text-sm font-semibold text-gray-300">John Doe</div>
                <div className={`bg-primary text-white p-2 rounded-lg max-w-[80%]`}>
                  Hey, how's it going? 😃
                </div>
              </div>
            </div>

            <div className="flex items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
              <div className="flex flex-col">
                <div className="text-sm font-semibold text-gray-300">You</div>
                <div className={`bg-secondary text-white p-2 rounded-lg max-w-[80%]`}>
                  I’m doing great, thanks for asking! 🙌
                </div>
              </div>
            </div>

            {/* More messages */}
            <div className="flex items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
              <div className="flex flex-col">
                <div className="text-sm font-semibold text-gray-300">Jane Doe</div>
                <div className={`bg-primary text-white p-2 rounded-lg max-w-[80%]`}>
                  Awesome! Let's catch up soon. 😊
                </div>
              </div>
            </div>
          </div>

          {/* Chat Input Box */}
          <div className="border-t p-3">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-2 rounded-lg border text-gray-700 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 text-center w-full px-4 sm:px-8 md:px-16">
        <p className="text-lg sm:text-xl text-gray-500">
          Choose a theme and see how your chat experience changes! Each theme brings a new vibe to your app.
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;
