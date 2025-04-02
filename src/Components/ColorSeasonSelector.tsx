import { useState, useEffect } from "react";

type Season = "summer" | "autumn" | "spring" | "winter" | "off";

// Updated seasonColors to include background color, colors, and button styles
const seasonColors: {
  [key in Season]: {
    backgroundColor: string;
    colors: string[];
    button: { active: string; inactive: string };
  };
} = {
  summer: {
    backgroundColor: "#f0e68c", // Light yellow for summer
    colors: ["#f1f68b", "#f3f7a1"], // Additional colors for summer
    button: { active: "bg-yellow-300", inactive: "bg-gray-200" }, // Button colors
  },
  autumn: {
    backgroundColor: "#f4a300", // Autumn orange
    colors: ["#c75c00", "#d26c00"], // Additional colors for autumn
    button: { active: "bg-orange-500", inactive: "bg-gray-200" }, // Button colors
  },
  spring: {
    backgroundColor: "#98fb98", // Light green for spring
    colors: ["#77cc77", "#9fda8b"], // Additional colors for spring
    button: { active: "bg-green-300", inactive: "bg-gray-200" }, // Button colors
  },
  winter: {
    backgroundColor: "#0524ff", // Light blue for winter
    colors: ["#6f9fd8", "#5a92c2"], // Additional colors for winter
    button: { active: "bg-blue-300", inactive: "bg-gray-200" }, // Button colors
  },
  off: {
    backgroundColor: "",
    colors: [],
    button: { active: "bg-gray-400", inactive: "bg-gray-200" }, // Button colors
  },
};

const ColorSeasonSelector = () => {
  const [selectedSeason, setSelectedSeason] = useState<Season>("off");
  const [showColors, setShowColors] = useState(false);

  const handleSeasonClick = (season: Season) => {
    season = season === selectedSeason ? "off" : season;
    setSelectedSeason(season);
    chrome.storage.sync.set({ season: season }, () => {
      console.log(`Selected color season: ${season}`);
    });
    updateColorSeason(season);
    setShowColors(false);
  };

  const updateColorSeason = (season: Season) => {
    const seasonData = seasonColors[season];
    if (seasonData.backgroundColor) {
      document.body.style.backgroundColor = seasonData.backgroundColor; // Set the background color
    }
  };

  useEffect(() => {
    chrome.storage.sync.get("season", (data) => {
      if (data.season) {
        setSelectedSeason(data.season as Season);
        updateColorSeason(data.season as Season);
      }
    });
  }, []);

  useEffect(() => {
    if (selectedSeason === "off") {
      document.body.style.backgroundColor = "";
    }
  }, [selectedSeason]);

  const handleToggleColors = () => {
    setShowColors(!showColors);
  };

  return (
    <div className="p-6 min-w-[24rem]">
      {selectedSeason !== "off" && (
        <div className="text-right pb-4">
          <button
            onClick={handleToggleColors}
            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all mb-4"
          >
            {showColors ? "Hide Colors" : "Show Colors"}
          </button>
          {showColors && (
            <div className="grid grid-cols-3 gap-4">
              {seasonColors[selectedSeason].colors.map((color, index) => (
                <div
                  key={index}
                  className="w-full h-16 rounded-md flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: color }}
                >
                  {color}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => handleSeasonClick("summer")}
          className={`py-2 px-4 rounded-md transition-all ${
            selectedSeason === "summer"
              ? seasonColors.summer.button.active
              : seasonColors.summer.button.inactive
          }`}
        >
          Summer
        </button>
        <button
          onClick={() => handleSeasonClick("autumn")}
          className={`py-2 px-4 rounded-md transition-all ${
            selectedSeason === "autumn"
              ? seasonColors.autumn.button.active
              : seasonColors.autumn.button.inactive
          }`}
        >
          Autumn
        </button>
        <button
          onClick={() => handleSeasonClick("spring")}
          className={`py-2 px-4 rounded-md transition-all ${
            selectedSeason === "spring"
              ? seasonColors.spring.button.active
              : seasonColors.spring.button.inactive
          }`}
        >
          Spring
        </button>
        <button
          onClick={() => handleSeasonClick("winter")}
          className={`py-2 px-4 rounded-md transition-all ${
            selectedSeason === "winter"
              ? seasonColors.winter.button.active
              : seasonColors.winter.button.inactive
          }`}
        >
          Winter
        </button>
        <button
          onClick={() => handleSeasonClick("off")}
          className={`py-2 px-4 rounded-md transition-all ${
            selectedSeason === "off"
              ? seasonColors.off.button.active
              : seasonColors.off.button.inactive
          }`}
        >
          Off
        </button>
      </div>
    </div>
  );
};

export default ColorSeasonSelector;
