import { useState, useEffect } from "react";

type Season = "summer" | "autumn" | "spring" | "winter" | "off";

const seasonColors: { [key in Season]: string[] } = {
  summer: ["#f0e68c", "#f1f68b", "#f3f7a1"],
  autumn: ["#f4a300", "#c75c00", "#d26c00"],
  spring: ["#98fb98", "#77cc77", "#9fda8b"],
  winter: ["#add8e6", "#6f9fd8", "#5a92c2"],
  off: [],
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
    switch (season) {
      case "summer":
        document.body.style.backgroundColor = "#f0e68c"; // Light yellow for summer
        break;
      case "autumn":
        document.body.style.backgroundColor = "#f4a300"; // Autumn orange
        break;
      case "spring":
        document.body.style.backgroundColor = "#98fb98"; // Light green for spring
        break;
      case "winter":
        document.body.style.backgroundColor = "#0524ff"; // Light blue for winter
        break;
      default:
        break;
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
    if (selectedSeason == "off") {
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
              {seasonColors[selectedSeason].map((color, index) => (
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
            selectedSeason === "summer" ? "bg-yellow-300" : "bg-gray-200"
          }`}
        >
          Summer
        </button>
        <button
          onClick={() => handleSeasonClick("autumn")}
          className={`py-2 px-4 rounded-md transition-all ${
            selectedSeason === "autumn" ? "bg-orange-500" : "bg-gray-200"
          }`}
        >
          Autumn
        </button>
        <button
          onClick={() => handleSeasonClick("spring")}
          className={`py-2 px-4 rounded-md transition-all ${
            selectedSeason === "spring" ? "bg-green-300" : "bg-gray-200"
          }`}
        >
          Spring
        </button>
        <button
          onClick={() => handleSeasonClick("winter")}
          className={`py-2 px-4 rounded-md transition-all ${
            selectedSeason === "winter" ? "bg-blue-300" : "bg-gray-200"
          }`}
        >
          Winter
        </button>
        <button
          onClick={() => handleSeasonClick("off")}
          className={`py-2 px-4 rounded-md transition-all ${
            selectedSeason === "off" ? "bg-gray-400" : "bg-gray-200"
          }`}
        >
          Off
        </button>
      </div>
    </div>
  );
};

export default ColorSeasonSelector;
