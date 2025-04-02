import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";
import ColorSeasonSelector from "./Components/ColorSeasonSelector";

const Popup = () => {
  const [isThredUpPage, setIsThredUpPage] = useState(false);

  // Use chrome.tabs API to check the active tab's URL
  useEffect(() => {
    // Query the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      const hostname = new URL(currentTab.url).hostname; // Extract hostname from URL

      // Check if the hostname is "www.thredup.com"
      if (hostname === "www.thredup.com") {
        setIsThredUpPage(true);
        console.log("User is on ThredUp.");
      } else {
        setIsThredUpPage(false);
        console.log("User is not on ThredUp.");
      }
    });
  }, []); // Empty dependency array to run once when component mounts

  console.log(`isThredUpPage: ${isThredUpPage}`); // Log the state

  return (
    <div className="p-6 min-w-[24rem]">
      {isThredUpPage ? (
        <ColorSeasonSelector />
      ) : (
        <p>This extension is only available on ThredUp.</p>
      )}
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
